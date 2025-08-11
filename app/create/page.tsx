'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { FormField } from '@/lib/types'
import { generateShortCode } from '@/lib/utils'
import { PlusIcon, TrashIcon, DragHandleDots2Icon, InfoCircledIcon, ComponentInstanceIcon } from '@radix-ui/react-icons'
import { useAuth } from '@/lib/auth-context'
import ProtectedRoute from '@/components/protected-route'
import AiFieldSuggestions from '@/components/ai-field-suggestions'

function CreateFormContent() {
  const { user } = useAuth()
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [fields, setFields] = useState<FormField[]>([])
  const [loading, setLoading] = useState(false)

  const addField = () => {
    const newField: FormField = {
      id: Date.now().toString(),
      type: 'text',
      label: '',
      placeholder: '',
      required: false,
      options: []
    }
    setFields([...fields, newField])
  }

  const addAiFields = (aiFields: FormField[]) => {
    setFields([...fields, ...aiFields])
  }

  const updateField = (id: string, updates: Partial<FormField>) => {
    setFields(fields.map(field =>
      field.id === id ? { ...field, ...updates } : field
    ))
  }

  const removeField = (id: string) => {
    setFields(fields.filter(field => field.id !== id))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || fields.length === 0 || !user) return

    setLoading(true)
    try {
      const shortCode = generateShortCode()

      const { data, error } = await supabase
        .from('forms')
        .insert({
          title: title.trim(),
          description: description.trim() || null,
          fields: fields as any,
          user_id: user.id,
          short_url: shortCode,
          is_active: true
        })
        .select()
        .single()

      if (error) throw error

      // Create short URL entry
      await supabase
        .from('short_urls')
        .insert({
          short_code: shortCode,
          original_url: `/form/${data.id}`,
          form_id: data.id,
          clicks: 0
        })

      router.push('/')
    } catch (error) {
      console.error('Error creating form:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-content">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold solid-text-emerald mb-4">
          Create New Form
        </h1>
        <p className="text-white/70">Build a custom form to collect responses with our intuitive form builder</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="card glow-emerald">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
            <InfoCircledIcon className="w-6 h-6 mr-2 text-emerald-400" />
            Form Details
          </h2>

          <div className="space-y-6">
            <div>
              <label className="form-label">Form Title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="form-input cursor-text"
                placeholder="Enter form title"
                required
              />
            </div>

            <div>
              <label className="form-label">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="form-input cursor-text"
                rows={3}
                placeholder="Optional form description"
              />
            </div>
          </div>
        </div>

        <div className="card glow-orange">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-white flex items-center">
              <ComponentInstanceIcon className="w-6 h-6 mr-2 text-orange-400" />
              Form Fields
            </h2>
            <button
              type="button"
              onClick={addField}
              className="btn btn-primary glow-emerald cursor-pointer"
            >
              <PlusIcon className="w-4 h-4 mr-1" />
              Add Field
            </button>
          </div>

          {/* AI Suggestions */}
          <div className="mb-6">
            <AiFieldSuggestions
              formTitle={title}
              formDescription={description}
              onAddFields={addAiFields}
            />
          </div>

          {fields.length === 0 ? (
            <div className="text-center py-12">
              <div className="glass-dark rounded-xl p-8">
                <svg className="w-16 h-16 mx-auto text-white/40 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <p className="text-white/60">No fields added yet. Click "Add Field" to get started.</p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {fields.map((field, index) => (
                <div key={field.id} className="glass-dark rounded-xl p-6 border border-white/10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <DragHandleDots2Icon className="w-5 h-5 text-white/40" />
                      <span className="text-sm font-medium text-white/80 bg-white/10 px-3 py-1 rounded-full">
                        Field {index + 1}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeField(field.id)}
                      className="text-red-400 hover:text-red-300 transition-colors p-2 hover:bg-red-500/10 rounded-lg cursor-pointer"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="form-label">Field Type</label>
                      <select
                        value={field.type}
                        onChange={(e) => updateField(field.id, {
                          type: e.target.value as FormField['type']
                        })}
                        className="form-input cursor-pointer"
                      >
                        <option value="text">Text</option>
                        <option value="email">Email</option>
                        <option value="number">Number</option>
                        <option value="textarea">Textarea</option>
                        <option value="select">Select</option>
                        <option value="radio">Radio</option>
                        <option value="checkbox">Checkbox</option>
                      </select>
                    </div>

                    <div>
                      <label className="form-label">Label *</label>
                      <input
                        type="text"
                        value={field.label}
                        onChange={(e) => updateField(field.id, { label: e.target.value })}
                        className="form-input cursor-text"
                        placeholder="Field label"
                        required
                      />
                    </div>

                    <div>
                      <label className="form-label">Placeholder</label>
                      <input
                        type="text"
                        value={field.placeholder || ''}
                        onChange={(e) => updateField(field.id, { placeholder: e.target.value })}
                        className="form-input cursor-text"
                        placeholder="Placeholder text"
                      />
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id={`required-${field.id}`}
                        checked={field.required}
                        onChange={(e) => updateField(field.id, { required: e.target.checked })}
                        className="mr-2 cursor-pointer"
                      />
                      <label htmlFor={`required-${field.id}`} className="text-sm text-gray-100">
                        Required field
                      </label>
                    </div>
                  </div>

                  {['select', 'radio', 'checkbox'].includes(field.type) && (
                    <div className="mt-4">
                      <label className="form-label">Options (one per line)</label>
                      <textarea
                        value={field.options?.join('\n') || ''}
                        onChange={(e) => updateField(field.id, {
                          options: e.target.value.split('\n').filter(opt => opt.trim())
                        })}
                        className="form-input cursor-text"
                        rows={3}
                        placeholder="Option 1&#10;Option 2&#10;Option 3"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={() => router.push('/')}
            className="btn btn-secondary cursor-pointer"
          >
            ← Back to Dashboard
          </button>
          <button
            type="submit"
            disabled={loading || !title.trim() || fields.length === 0}
            className="btn btn-primary glow-emerald disabled:opacity-50 disabled:hover:scale-100 cursor-pointer disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="spinner h-4 w-4 mr-2"></div>
                Creating...
              </>
            ) : (
              <>
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Create Form
              </>
            )}
          </button>
        </div>
      </form>
      </div>
    </div>
  )
}

export default function CreateForm() {
  return (
    <ProtectedRoute>
      <CreateFormContent />
    </ProtectedRoute>
  )
}
