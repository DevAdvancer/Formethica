'use client'

import { useState } from 'react'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'

interface FormData {
  firstName: string
  lastName: string
  email: string
  company: string
  subject: string
  message: string
}

interface FormStatus {
  type: 'idle' | 'loading' | 'success' | 'error'
  message: string
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  })

  const [status, setStatus] = useState<FormStatus>({
    type: 'idle',
    message: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setStatus({ type: 'loading', message: 'Sending message...' })

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: 'a23bd24e-7f8e-4cc5-8901-413cfd736b6a',
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          company: formData.company,
          subject: formData.subject,
          message: formData.message,
          from_name: 'Formethica Contact Form'
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      if (data.success) {
        setStatus({
          type: 'success',
          message: 'Thank you! Your message has been sent successfully. We\'ll get back to you soon.'
        })
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          company: '',
          subject: '',
          message: ''
        })
      } else {
        throw new Error(data.message || 'Failed to send message')
      }
    } catch (error) {
      console.error('Contact form error:', error)
      setStatus({
        type: 'error',
        message: 'Sorry, there was an error sending your message. Please try again or contact us directly.'
      })
    }
  }

  const isFormValid = formData.firstName && formData.lastName && formData.email && formData.subject && formData.message

  return (
    <div className="space-y-6">
      {/* Status Message */}
      {status.type !== 'idle' && (
        <div className={`p-4 rounded-lg flex items-center gap-3 ${
          status.type === 'success'
            ? 'bg-green-600/20 border border-green-600/30 text-green-400'
            : status.type === 'error'
            ? 'bg-red-600/20 border border-red-600/30 text-red-400'
            : 'bg-blue-600/20 border border-blue-600/30 text-blue-400'
        }`}>
          {status.type === 'success' && <CheckCircle className="w-5 h-5" />}
          {status.type === 'error' && <AlertCircle className="w-5 h-5" />}
          {status.type === 'loading' && (
            <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
          )}
          <p className="text-sm">{status.message}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="firstName" className="block text-xs md:text-sm font-medium mb-2 text-white">
              First Name *
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-sm md:text-base text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
              placeholder="Enter your first name"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-xs md:text-sm font-medium mb-2 text-white">
              Last Name *
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-sm md:text-base text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
              placeholder="Enter your last name"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-xs md:text-sm font-medium mb-2 text-white">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-sm md:text-base text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
            placeholder="Enter your email address"
          />
        </div>

        <div>
          <label htmlFor="company" className="block text-xs md:text-sm font-medium mb-2 text-white">
            Company (Optional)
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-sm md:text-base text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
            placeholder="Enter your company name"
          />
        </div>

        <div>
          <label htmlFor="subject" className="block text-xs md:text-sm font-medium mb-2 text-white">
            Subject *
          </label>
          <select
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-sm md:text-base text-white focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
          >
            <option value="">Select a subject</option>
            <option value="general">General Inquiry</option>
            <option value="support">Technical Support</option>
            <option value="billing">Billing Question</option>
            <option value="feature">Feature Request</option>
            <option value="partnership">Partnership</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="message" className="block text-xs md:text-sm font-medium mb-2 text-white">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            required
            rows={6}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-sm md:text-base text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent resize-none"
            placeholder="Tell us how we can help you..."
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={!isFormValid || status.type === 'loading'}
          className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 text-sm md:text-base font-medium"
        >
          {status.type === 'loading' ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Sending...
            </>
          ) : (
            <>
              Send Message
              <Send className="w-4 h-4" />
            </>
          )}
        </button>
      </form>
    </div>
  )
}
