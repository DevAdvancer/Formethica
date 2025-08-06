'use client'

import { useAuthModal } from '@/lib/auth-modal-context'
import AuthModal from './auth-modal'
import { useEffect, useState } from 'react'

export default function AuthModalWrapper() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  try {
    const { isOpen, view, closeModal } = useAuthModal()
    return <AuthModal isOpen={isOpen} onClose={closeModal} initialView={view} />
  } catch (error) {
    console.error('Auth modal error:', error)
    return null
  }
}
