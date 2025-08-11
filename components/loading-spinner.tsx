'use client'

import { memo } from 'react'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  text?: string
}

const LoadingSpinner = memo(function LoadingSpinner({
  size = 'md',
  className = '',
  text
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  }

  return (
    <div className={`text-center ${className}`}>
      <div className={`spinner ${sizeClasses[size]} mx-auto mb-4`}></div>
      {text && <p className="text-white/60">{text}</p>}
    </div>
  )
})

export default LoadingSpinner
