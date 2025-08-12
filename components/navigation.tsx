'use client'

import { memo, useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import Image from 'next/image'
import UserDropdown from './user-dropdown'

const Navigation = memo(function Navigation() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50
      setScrolled(isScrolled)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSignIn = useCallback(() => {
    router.push('/auth?type=signin')
  }, [router])

  const handleSignUp = useCallback(() => {
    router.push('/auth?type=signup')
  }, [router])

  return (
    <nav
      className={`nav-glass ${scrolled ? 'scrolled' : ''}`}
      style={{
        position: 'fixed',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9999,
        width: 'calc(100% - 40px)',
        maxWidth: '1200px'
      }}
    >
      <div className="px-6">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-2 hover:scale-105 transition-transform cursor-pointer">
              <Image
                src="/formethica-logo.svg"
                alt="Formethica logo"
                width={32}
                height={32}
                priority
                className="h-8 w-8"
              />
              <h1 className="text-xl font-bold text-white/90">
                Formethica
              </h1>
            </a>
          </div>

          <div className="flex items-center space-x-4">
            {loading ? (
              <div className="spinner h-6 w-6"></div>
            ) : user ? (
              <>
                <a
                  href="/dashboard"
                  className="text-white/80 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-white/10 cursor-pointer"
                >
                  Dashboard
                </a>
                <UserDropdown />
              </>
            ) : (
              <>
                <button
                  onClick={handleSignIn}
                  className="text-white/80 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-white/10 cursor-pointer"
                >
                  Sign In
                </button>
                <button
                  onClick={handleSignUp}
                  className="btn btn-primary"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
})

export default Navigation
