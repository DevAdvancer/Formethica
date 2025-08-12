'use client'

import { lazy, Suspense, useState, memo } from 'react'
import { ChatBubbleIcon } from '@radix-ui/react-icons'

// Lazy load the actual chatbot component
const AIChatbotContent = lazy(() => import('./ai-chatbot'))

const AIChatbotLazy = memo(function AIChatbotLazy() {
  const [isLoaded, setIsLoaded] = useState(false)

  const handleToggle = () => {
    setIsLoaded(true)
  }

  if (!isLoaded) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={handleToggle}
          className="btn btn-primary rounded-full p-4 glow-emerald shadow-lg hover:scale-110 transition-transform"
          aria-label="Open AI Assistant"
        >
          <ChatBubbleIcon className="w-6 h-6" />
        </button>
      </div>
    )
  }

  return (
    <Suspense fallback={
      <div className="fixed bottom-6 right-6 z-50">
        <div className="btn btn-primary rounded-full p-4 glow-emerald shadow-lg">
          <div className="spinner h-6 w-6"></div>
        </div>
      </div>
    }>
      <AIChatbotContent />
    </Suspense>
  )
})

export default AIChatbotLazy
