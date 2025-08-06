'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface AuthModalContextType {
  isOpen: boolean
  view: 'sign_in' | 'sign_up'
  openModal: (view?: 'sign_in' | 'sign_up') => void
  closeModal: () => void
}

const AuthModalContext = createContext<AuthModalContextType | undefined>(undefined)

export function AuthModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [view, setView] = useState<'sign_in' | 'sign_up'>('sign_in')

  const openModal = (modalView: 'sign_in' | 'sign_up' = 'sign_in') => {
    setView(modalView)
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  return (
    <AuthModalContext.Provider value={{ isOpen, view, openModal, closeModal }}>
      {children}
    </AuthModalContext.Provider>
  )
}

export function useAuthModal() {
  const context = useContext(AuthModalContext)
  if (context === undefined) {
    throw new Error('useAuthModal must be used within an AuthModalProvider')
  }
  return context
}
