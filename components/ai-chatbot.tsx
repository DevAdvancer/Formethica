'use client'

import { useState, useRef, useEffect } from 'react'
import { ChatBubbleIcon, Cross2Icon, PaperPlaneIcon } from '@radix-ui/react-icons'
import { chatWithBot } from '@/lib/gemini'

interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your AI assistant. I can help you create better forms, suggest field types, and answer questions about form design. How can I help you today?",
      isUser: false,
      timestamp: new Date()
    }
  ])
  const [inputText, setInputText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      isUser: true,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputText('')
    setIsLoading(true)

    try {
      const response = await chatWithBot(inputText.trim())

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        isUser: false,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, botMessage])
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm sorry, I'm having trouble responding right now. Please try again later.",
        isUser: false,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-emerald-600 hover:bg-emerald-700 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 z-50 glow-emerald cursor-pointer"
      >
        <ChatBubbleIcon className="w-6 h-6 text-white" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] glass-dark rounded-2xl shadow-2xl border border-white/10 z-50 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
                <ChatBubbleIcon className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-white font-medium">AI Assistant</h3>
                <p className="text-white/60 text-xs">Always here to help</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/60 hover:text-white transition-colors p-1 cursor-pointer"
            >
              <Cross2Icon className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    message.isUser
                      ? 'bg-emerald-600 text-white'
                      : 'glass text-white/90'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <p className={`text-xs mt-1 ${
                    message.isUser ? 'text-white/70' : 'text-white/50'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="glass p-3 rounded-2xl">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-white/10">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about forms..."
                className="flex-1 form-input text-sm cursor-text disabled:cursor-not-allowed"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isLoading}
                className="btn btn-primary px-3 py-2 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
              >
                <PaperPlaneIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
