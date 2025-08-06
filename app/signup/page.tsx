'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function SignupRedirect() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to homepage with a hash to trigger signup modal
    router.replace('/?auth=signup')
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="spinner h-12 w-12 mx-auto mb-4"></div>
        <p className="text-white/60">Redirecting...</p>
      </div>
    </div>
  )
}
