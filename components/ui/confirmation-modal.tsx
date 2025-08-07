'use client'

import { X, AlertTriangle, CheckCircle, Info, XCircle } from 'lucide-react'

interface ConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm?: () => void
  title: string
  message: string
  type?: 'info' | 'success' | 'warning' | 'error' | 'confirm'
  confirmText?: string
  cancelText?: string
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  type = 'info',
  confirmText = 'OK',
  cancelText = 'Cancel'
}: ConfirmationModalProps) {
  if (!isOpen) return null

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-6 h-6 text-green-400" />
      case 'warning':
        return <AlertTriangle className="w-6 h-6 text-yellow-400" />
      case 'error':
        return <XCircle className="w-6 h-6 text-red-400" />
      case 'confirm':
        return <AlertTriangle className="w-6 h-6 text-orange-400" />
      default:
        return <Info className="w-6 h-6 text-blue-400" />
    }
  }

  const getGlowClass = () => {
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

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-md cursor-default"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md">
        <div className={`card ${getGlowClass()}`}>
          {/* Header */}
          <div className="flex justify-between items-start p-6 pb-4">
            <div className="flex items-center space-x-3">
              {getIcon()}
              <h2 className="text-xl font-bold text-white">{title}</h2>
            </div>
            <button
              onClick={onClose}
              className="text-white/60 hover:text-white transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="px-6 pb-6">
            <p className="text-white/80 mb-6 leading-relaxed">{message}</p>

            {/* Actions */}
            <div className="flex space-x-3 justify-end">
              {type === 'confirm' && (
                <button
                  onClick={onClose}
                  className="btn btn-secondary"
                >
                  {cancelText}
                </button>
              )}
              <button
                onClick={() => {
                  if (onConfirm) {
                    onConfirm()
                  }
                  onClose()
                }}
                className={`btn ${type === 'error' ? 'btn-danger' : 'btn-primary'}`}
              >
                {confirmText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
