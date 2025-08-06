'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface ConfirmationOptions {
  title: string
  message: string
  type?: 'info' | 'success' | 'warning' | 'error' | 'confirm'
  confirmText?: string
  cancelText?: string
  onConfirm?: () => void
}

interface ConfirmationContextType {
  showConfirmation: (options: ConfirmationOptions) => void
  showSuccess: (title: string, message: string) => void
  showError: (title: string, message: string) => void
  showWarning: (title: string, message: string) => void
  showInfo: (title: string, message: string) => void
  confirm: (title: string, message: string, onConfirm: () => void) => void
}

const ConfirmationContext = createContext<ConfirmationContextType | undefined>(undefined)

export function ConfirmationProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [options, setOptions] = useState<ConfirmationOptions>({
    title: '',
    message: '',
    type: 'info'
  })

  const showConfirmation = (opts: ConfirmationOptions) => {
    setOptions(opts)
    setIsOpen(true)
  }

  const showSuccess = (title: string, message: string) => {
    showConfirmation({ title, message, type: 'success' })
  }

  const showError = (title: string, message: string) => {
    showConfirmation({ title, message, type: 'error' })
  }

  const showWarning = (title: string, message: string) => {
    showConfirmation({ title, message, type: 'warning' })
  }

  const showInfo = (title: string, message: string) => {
    showConfirmation({ title, message, type: 'info' })
  }

  const confirm = (title: string, message: string, onConfirm: () => void) => {
    showConfirmation({
      title,
      message,
      type: 'confirm',
      confirmText: 'Confirm',
      cancelText: 'Cancel',
      onConfirm
    })
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  const handleConfirm = () => {
    if (options.onConfirm) {
      options.onConfirm()
    }
    handleClose()
  }

  return (
    <ConfirmationContext.Provider value={{
      showConfirmation,
      showSuccess,
      showError,
      showWarning,
      showInfo,
      confirm
    }}>
      {children}
      {/* Confirmation Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={handleClose}
          />

          {/* Modal */}
          <div className="relative w-full max-w-md">
            <div className={`card ${getGlowClass(options.type)}`}>
              {/* Header */}
              <div className="flex justify-between items-start p-6 pb-4">
                <div className="flex items-center space-x-3">
                  {getIcon(options.type)}
                  <h2 className="text-xl font-bold text-white">{options.title}</h2>
                </div>
                <button
                  onClick={handleClose}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Content */}
              <div className="px-6 pb-6">
                <p className="text-white/80 mb-6 leading-relaxed">{options.message}</p>

                {/* Actions */}
                <div className="flex space-x-3 justify-end">
                  {options.type === 'confirm' && (
                    <button
                      onClick={handleClose}
                      className="btn btn-secondary"
                    >
                      {options.cancelText || 'Cancel'}
                    </button>
                  )}
                  <button
                    onClick={handleConfirm}
                    className={`btn ${options.type === 'error' ? 'btn-danger' : 'btn-primary'}`}
                  >
                    {options.confirmText || 'OK'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </ConfirmationContext.Provider>
  )
}

function getIcon(type?: string) {
  switch (type) {
    case 'success':
      return (
        <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    case 'warning':
      return (
        <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      )
    case 'error':
      return (
        <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    case 'confirm':
      return (
        <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      )
    default:
      return (
        <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
  }
}

function getGlowClass(type?: string) {
  switch (type) {
    case 'success':
      return 'glow-emerald'
    case 'warning':
      return 'glow-amber'
    case 'error':
      return 'glow-red'
    case 'confirm':
      return 'glow-orange'
    default:
      return 'glow-emerald'
  }
}

export function useConfirmation() {
  const context = useContext(ConfirmationContext)
  if (context === undefined) {
    throw new Error('useConfirmation must be used within a ConfirmationProvider')
  }
  return context
}
