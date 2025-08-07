'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Form, FormField } from '@/lib/types'
import { Plus, Trash2, GripVertical } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import { useConfirmation } from '@/lib/confirmation-context'
import ProtectedRoute from '@/components/protected-route'

function EditFormContent() {
  const { user, loading: authLoading } = useAuth()
  const { showSuccess, showError } = useConfirmation()
  const params = useParams()
  const router = useRouter()
  const [form, setForm] = useState<Form | null>(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [fields, setFields] = useState<FormField[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const fetchForm = async (id: string) => {
      try {
        const { data, error } = await supabase
          .from('forms')
          .select('*')
          .eq('id', id)
          .eq('user_id', user?.id || '')
          .single()

        if (error) {
          if (error.code === 'PGRST116') {
            showError('Form Not Found', 'The form you are trying to edit does not exist or you do not have permission to edit it.')
          } else {
            showError('Error Loading Form', `Failed to load the form: ${error.message}`)
          }
          throw error
        }

        setForm(data as unknown as Form)
        setTitle(data.title)
        setDescription(data.description || '')
        setFields(data.fields as unknown as FormField[])
      } catch (error) {
        console.error('Error fetching form:', error)
      } finally {
        setLoading(false)
      }
    }

    if (mounted && params.id && user && !authLoading) {
      fetchForm(params.id as string)
    }
  }, [params.id, user, authLoading, mounted])

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
    if (!title.trim() || fields.length === 0 || !form) return

    setSaving(true)
    try {
      const { error } = await supabase
        .from('forms')
        .update({
          title: title.trim(),
          description: description.trim() || null,
          fields: fields,
          updated_at: new Date().toISOString()
        })
        .eq('id', form.id)
        .eq('user_id', user?.id || '')

      if (error) {
        showError('Update Failed', `Failed to update the form: ${error.message}`)
        throw error
      }

      showSuccess('Form Updated', 'Your form has been successfully updated!')
      setTimeout(() => router.push('/'), 1500)
    } catch (error) {
      console.error('Error updating form:', error)
    } finally {
      setSaving(false)
    }
  }

  if (!mounted || authLoading || loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <div className="spinner h-8 w-8 mx-auto mb-4"></div>
          <p className="text-white/60">Loading form...</p>
        </div>
      </div>
    )
  }

  if (!form) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="card text-center glow-amber">
          <h1 className="text-2xl font-bold text-white mb-4">Form Not Found</h1>
          <p className="text-white/70">The form you're trying to edit doesn't exist.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Edit Form</h1>
        <p className="text-white/70 mt-2">Update your form details and fields</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="card glow-emerald p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Form Details</h2>

          <div className="space-y-4">
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

        <div className="card glow-orange p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-white">Form Fields</h2>
            <button
              type="button"
              onClick={addField}
              className="btn btn-primary glow-emerald cursor-pointer"
            >
              <Plus size={16} className="mr-1" />
              Add Field
            </button>
          </div>

          {fields.length === 0 ? (
            <div className="text-center py-8 text-white/60">
              No fields added yet. Click "Add Field" to get started.
            </div>
          ) : (
            <div className="space-y-4">
              {fields.map((field, index) => (
                <div key={field.id} className="glass border border-white/10 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <GripVertical size={16} className="text-white/60" />
                      <span className="text-sm font-medium text-white/80">
                        Field {index + 1}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeField(field.id)}
                      className="text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        className="mr-2 accent-emerald-400 cursor-pointer"
                      />
                      <label htmlFor={`required-${field.id}`} className="text-sm text-white/80">
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

        <div className="flex justify-between">
          <a
            href={`/submissions/${form.id}`}
            className="btn btn-secondary"
          >
            View Submissions
          </a>

          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => router.push('/')}
              className="btn btn-secondary cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving || !title.trim() || fields.length === 0}
              className="btn btn-primary disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default function EditForm() {
  return (
    <ProtectedRoute>
      <EditFormContent />
    </ProtectedRoute>
  )
}
