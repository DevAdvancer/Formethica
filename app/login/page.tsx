'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginRedirect() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to unified auth page
    router.replace('/auth?type=signin')
  }, [router])

  return (
    <div className="page-content flex items-center justify-center">
      <div className="text-center">
        <div className="spinner h-12 w-12 mx-auto mb-4"></div>
        <p className="text-white/60">Redirecting...</p>
      </div>
    </div>
  )
}
