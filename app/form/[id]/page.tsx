'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Form, FormField } from '@/lib/types'
import { CheckCircledIcon, ExclamationTriangleIcon, RocketIcon } from '@radix-ui/react-icons'

export default function FormPage() {
  const params = useParams()
  const [form, setForm] = useState<Form | null>(null)
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (params.id) {
      fetchForm(params.id as string)
    }
  }, [params.id])

  const fetchForm = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('forms')
        .select('*')
        .eq('id', id)
        .eq('is_active', true)
        .single()

      if (error) throw error
      setForm(data as unknown as Form)
    } catch (error) {
      console.error('Error fetching form:', error)
    } finally {
      setLoading(false)
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    form?.fields.forEach((field) => {
      if (field.required && !formData[field.id]) {
        newErrors[field.id] = `${field.label} is required`
      }

      if (field.type === 'email' && formData[field.id]) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(formData[field.id])) {
          newErrors[field.id] = 'Please enter a valid email address'
        }
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setSubmitting(true)
    try {
      const { error } = await supabase
        .from('form_submissions')
        .insert({
          form_id: form!.id,
          data: formData,
          ip_address: null // You could get this from a service
        })

      if (error) throw error
      setSubmitted(true)
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setSubmitting(false)
    }
  }

  const handleFieldChange = (fieldId: string, value: any) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }))
    if (errors[fieldId]) {
      setErrors(prev => ({ ...prev, [fieldId]: '' }))
    }
  }

  const renderField = (field: FormField) => {
    const commonProps = {
      id: field.id,
      required: field.required,
      className: `form-input ${errors[field.id] ? 'border-red-500' : ''}`
    }

    switch (field.type) {
      case 'text':
        return (
          <input
            {...commonProps}
            type="text"
            placeholder={field.placeholder}
            value={formData[field.id] || ''}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
          />
        )

      case 'email':
        return (
          <input
            {...commonProps}
            type="email"
            placeholder={field.placeholder}
            value={formData[field.id] || ''}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
          />
        )

      case 'number':
        return (
          <input
            {...commonProps}
            type="number"
            placeholder={field.placeholder}
            value={formData[field.id] || ''}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
          />
        )

      case 'textarea':
        return (
          <textarea
            {...commonProps}
            rows={4}
            placeholder={field.placeholder}
            value={formData[field.id] || ''}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
          />
        )

      case 'select':
        return (
          <select
            {...commonProps}
            value={formData[field.id] || ''}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
          >
            <option value="">Select an option</option>
            {field.options?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        )

      case 'radio':
        return (
          <div className="space-y-2">
            {field.options?.map((option, index) => (
              <label key={index} className="flex items-center">
                <input
                  type="radio"
                  name={field.id}
                  value={option}
                  checked={formData[field.id] === option}
                  onChange={(e) => handleFieldChange(field.id, e.target.value)}
                  className="mr-3 w-4 h-4 text-blue-400 bg-transparent border-2 border-white/30 rounded-full focus:ring-blue-400 focus:ring-2"
                />
                <span className="text-white/90">{option}</span>
              </label>
            ))}
          </div>
        )

      case 'checkbox':
        return (
          <div className="space-y-3">
            {field.options?.map((option, index) => (
              <label key={index} className="flex items-center cursor-pointer hover:bg-white/5 p-2 rounded-lg transition-colors">
                <input
                  type="checkbox"
                  value={option}
                  checked={(formData[field.id] || []).includes(option)}
                  onChange={(e) => {
                    const currentValues = formData[field.id] || []
                    const newValues = e.target.checked
                      ? [...currentValues, option]
                      : currentValues.filter((v: string) => v !== option)
                    handleFieldChange(field.id, newValues)
                  }}
                  className="mr-3 w-4 h-4 text-blue-400 bg-transparent border-2 border-white/30 rounded focus:ring-blue-400 focus:ring-2"
                />
                <span className="text-white/90">{option}</span>
              </label>
            ))}
          </div>
        )

      default:
        return null
    }
  }

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <div className="spinner h-8 w-8 mx-auto mb-4"></div>
          <p className="text-white/60">Loading form...</p>
        </div>
      </div>
    )
  }

  if (!form) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="card text-center glow-pink">
          <svg className="w-16 h-16 mx-auto text-pink-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h1 className="text-2xl font-bold text-white mb-4">Form Not Found</h1>
          <p className="text-white/70">The form you're looking for doesn't exist or is no longer active.</p>
        </div>
      </div>
    )
  }

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="card text-center glow-emerald">
          <CheckCircledIcon className="mx-auto h-20 w-20 text-green-400 mb-6" />
          <h1 className="text-3xl font-bold text-white mb-4">Thank You!</h1>
          <p className="text-white/80 text-lg">Your response has been submitted successfully.</p>
          <div className="mt-8">
            <a href="/" className="btn btn-secondary">
              ← Back to Home
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="card glow-orange">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold solid-text-orange mb-4">
            {form.title}
          </h1>
          {form.description && (
            <p className="text-white/80 text-lg">{form.description}</p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {form.fields.map((field) => (
            <div key={field.id}>
              <label className="form-label">
                {field.label}
                {field.required && <span className="text-red-400 ml-1">*</span>}
              </label>
              {renderField(field)}
              {errors[field.id] && (
                <p className="text-red-400 text-sm mt-2 flex items-center">
                  <ExclamationTriangleIcon className="w-4 h-4 mr-1" />
                  {errors[field.id]}
                </p>
              )}
            </div>
          ))}

          <div className="pt-6">
            <button
              type="submit"
              disabled={submitting}
              className="w-full btn btn-primary glow-emerald disabled:opacity-50 disabled:hover:scale-100"
            >
              {submitting ? (
                <>
                  <div className="spinner h-5 w-5 mr-2"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <RocketIcon className="w-5 h-5 mr-2" />
                  Submit Response
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
