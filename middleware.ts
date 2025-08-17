import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

// Cache for static paths to avoid unnecessary processing
const staticPaths = new Set([
  '/favicon.ico',
  '/robots.txt',
  '/sitemap.xml',
  '/manifest.json'
])

// Cache for public API routes that don't need auth
const publicApiRoutes = new Set([
  '/api/health',
  '/api/status'
])

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip middleware for static files and public routes
  if (staticPaths.has(pathname) || pathname.startsWith('/_next/') || pathname.startsWith('/public/')) {
    return NextResponse.next()
  }

  // Skip auth check for public API routes
  if (publicApiRoutes.has(pathname)) {
    return NextResponse.next()
  }

  // Early return for non-auth related requests
  if (pathname.startsWith('/api/') && !pathname.includes('/auth/')) {
    // Only process auth for API routes that need it
    const authHeader = request.headers.get('authorization')
    if (!authHeader && !request.cookies.has('sb-access-token')) {
      return NextResponse.next()
    }
  }

  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // Only create Supabase client when needed
  let supabase: any = null
  let needsAuth = false

  // Determine if we need authentication
  if (pathname.startsWith('/dashboard') ||
      pathname.startsWith('/create') ||
      pathname.startsWith('/edit') ||
      pathname.startsWith('/api/auth/') ||
      pathname.startsWith('/api/protected/')) {
    needsAuth = true
  }

  if (needsAuth) {
    supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value
          },
          set(name: string, value: string, options: any) {
            request.cookies.set({
              name,
              value,
              ...options,
            })
            response = NextResponse.next({
              request: {
                headers: request.headers,
              },
            })
            response.cookies.set({
              name,
              value,
              ...options,
            })
          },
          remove(name: string, options: any) {
            request.cookies.set({
              name,
              value: '',
              ...options,
            })
            response = NextResponse.next({
              request: {
                headers: request.headers,
              },
            })
            response.cookies.set({
              name,
              value: '',
              ...options,
            })
          },
        },
      }
    )

    try {
      // Only get session when we actually need it
      const { data: { session }, error } = await supabase.auth.getSession()

      if (error) {
        console.error('Auth error:', error)
        return response
      }

      // Optimized session refresh logic
      if (session?.expires_at) {
        const expiresAt = session.expires_at * 1000
        const timeUntilExpiry = expiresAt - Date.now()
        const fifteenMinutes = 15 * 60 * 1000 // Reduced from 30 to 15 minutes

        // Only refresh if really close to expiry to reduce unnecessary calls
        if (timeUntilExpiry < fifteenMinutes && timeUntilExpiry > 0) {
          await supabase.auth.refreshSession()
        }
      }
    } catch (error) {
      console.error('Middleware auth error:', error)
      // Continue without blocking the request
    }
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Simplified matcher that excludes static assets
     * This avoids complex regex that can cause parsing issues
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|ico|webp|woff|woff2|ttf|eot|css|js|map)$).*)',
  ],
}
