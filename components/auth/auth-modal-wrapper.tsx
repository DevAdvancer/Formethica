'use client'

import { useAuthModal } from '@/lib/auth-modal-context'
import { useAuth } from '@/lib/auth-context'
import AuthModal from './auth-modal'
import { useEffect, useState } from 'react'

export default function AuthModalWrapper() {
  const [mounted, setMounted] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  try {
    const { isOpen, view, closeModal } = useAuthModal()

    // Auto-close modal when user signs in - moved outside try-catch
    return <AuthModalContent isOpen={isOpen} view={view} closeModal={closeModal} user={user} />
  } catch (error) {
    console.error('Auth modal error:', error)
    return null
  }
}

function AuthModalContent({
  isOpen,
  view,
  closeModal,
  user
}: {
  isOpen: boolean
  view: 'sign_in' | 'sign_up'
  closeModal: () => void
  user: any
}) {
  const [previousUser, setPreviousUser] = useState(user)

  // Auto-close modal when user signs in
  useEffect(() => {
    // Check if user just signed in (was null/undefined, now has a value)
    if (!previousUser && user && isOpen) {
      // Add a small delay to ensure the auth state is fully updated
      setTimeout(() => {
        closeModal()
      }, 100)
    }
    setPreviousUser(user)
  }, [user, isOpen, closeModal, previousUser])

  return <AuthModal isOpen={isOpen} onClose={closeModal} initialView={view} />
}
