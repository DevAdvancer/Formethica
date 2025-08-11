'use client'

import { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function ShortUrlRedirect() {
  const params = useParams()
  const router = useRouter()

  useEffect(() => {
    if (params.shortCode) {
      handleRedirect(params.shortCode as string)
    }
  }, [params.shortCode])

  const handleRedirect = async (shortCode: string) => {
    try {
      // Get the short URL record with form information
      const { data: shortUrl, error } = await supabase
        .from('short_urls')
        .select(`
          *,
          forms!inner(
            id,
            title,
            is_active
          )
        `)
        .eq('short_code', shortCode)
        .single()

      if (error || !shortUrl) {
        router.push('/404')
        return
      }

      // Always increment click count (for analytics)
      await supabase
        .from('short_urls')
        .update({ clicks: (shortUrl.clicks || 0) + 1 })
        .eq('id', shortUrl.id)

      // Redirect to the original URL (form will handle inactive state)
      router.push(shortUrl.original_url)
    } catch (error) {
      console.error('Error handling redirect:', error)
      router.push('/404')
    }
  }

  return (
    <div className="page-content">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="card text-center glow-blue">
        <div className="spinner h-12 w-12 mx-auto mb-6"></div>
        <p className="text-white/80 text-lg">Redirecting to form...</p>
      </div>
      </div>
    </div>
  )
}
