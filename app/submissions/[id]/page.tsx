'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Form, FormSubmission } from '@/lib/types'
import { formatDate } from '@/lib/utils'
import { Download, Eye } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import ProtectedRoute from '@/components/protected-route'
import * as XLSX from 'xlsx'

function SubmissionsContent() {
  const { user } = useAuth()
  const params = useParams()
  const [form, setForm] = useState<Form | null>(null)
  const [submissions, setSubmissions] = useState<FormSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedSubmission, setSelectedSubmission] = useState<FormSubmission | null>(null)

  useEffect(() => {
    if (params.id && user) {
      fetchFormAndSubmissions(params.id as string)
    }
  }, [params.id, user])

  const fetchFormAndSubmissions = async (formId: string) => {
    try {
      // Fetch form details (only if user owns it)
      const { data: formData, error: formError } = await supabase
        .from('forms')
        .select('*')
        .eq('id', formId)
        .eq('user_id', user?.id || '')
        .single()

      if (formError) throw formError
      setForm(formData as unknown as Form)

      // Fetch submissions
      const { data: submissionsData, error: submissionsError } = await supabase
        .from('form_submissions')
        .select('*')
        .eq('form_id', formId)
        .order('submitted_at', { ascending: false })

      if (submissionsError) throw submissionsError
      setSubmissions((submissionsData || []) as FormSubmission[])
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const exportToExcel = () => {
    if (!form || submissions.length === 0) return

    // Prepare data for Excel
    const data = submissions.map(submission => {
      const row: any = {
        'Submission Date': formatDate(submission.submitted_at || '')
      }

      form.fields.forEach(field => {
        const value = submission.data[field.id] || ''
        // Handle arrays (for checkbox fields)
        row[field.label] = Array.isArray(value) ? value.join('; ') : value
      })

      return row
    })

    // Create workbook and worksheet
    const wb = XLSX.utils.book_new()
    const ws = XLSX.utils.json_to_sheet(data)

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Submissions')

    // Save file
    XLSX.writeFile(wb, `${form.title}-submissions.xlsx`)
  }

  const exportToCSV = () => {
    if (!form || submissions.length === 0) return

    const headers = form.fields.map(field => field.label)
    const csvHeaders = ['Submission Date', ...headers].join(',')

    const csvRows = submissions.map(submission => {
      const row = [formatDate(submission.submitted_at || '')]
      form.fields.forEach(field => {
        const value = submission.data[field.id] || ''
        // Handle arrays (for checkbox fields)
        const cellValue = Array.isArray(value) ? value.join('; ') : value
        row.push(`"${cellValue}"`)
      })
      return row.join(',')
    })

    const csvContent = [csvHeaders, ...csvRows].join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${form.title}-submissions.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <div className="spinner h-8 w-8 mx-auto mb-4"></div>
          <p className="text-white/60">Loading submissions...</p>
        </div>
      </div>
    )
  }

  if (!form) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="card text-center glow-amber">
          <h1 className="text-2xl font-bold text-white mb-4">Form Not Found</h1>
          <p className="text-white/70">The form you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">{form.title} - Submissions</h1>
          <p className="text-white/70 mt-2">{submissions.length} total submissions</p>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={exportToExcel}
            disabled={submissions.length === 0}
            className="btn btn-primary glow-emerald disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
          >
            <Download size={16} className="mr-1" />
            Export Excel
          </button>
          <button
            onClick={exportToCSV}
            disabled={submissions.length === 0}
            className="btn btn-secondary disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
          >
            <Download size={16} className="mr-1" />
            Export CSV
          </button>
          <a href={`/edit/${form.id}`} className="btn btn-secondary">
            Edit Form
          </a>
        </div>
      </div>

      {submissions.length === 0 ? (
        <div className="text-center py-12 card glow-amber">
          <h3 className="text-lg font-medium text-white mb-2">No submissions yet</h3>
          <p className="text-white/70 mb-4">Share your form to start collecting responses</p>
          <div className="flex items-center justify-center space-x-2 text-sm">
            <span className="text-white/60">Form URL:</span>
            <code className="glass px-2 py-1 rounded text-emerald-400">
              {process.env.NEXT_PUBLIC_APP_URL}/form/{form.id}
            </code>
          </div>
        </div>
      ) : (
        <div className="card glow-emerald overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-white/10">
              <thead className="glass">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white/80 uppercase tracking-wider">
                    Submitted
                  </th>
                  {form.fields.map((field) => (
                    <th
                      key={field.id}
                      className="px-6 py-3 text-left text-xs font-medium text-white/80 uppercase tracking-wider"
                    >
                      {field.label}
                    </th>
                  ))}
                  <th className="px-6 py-3 text-left text-xs font-medium text-white/80 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {submissions.map((submission) => (
                  <tr key={submission.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      {formatDate(submission.submitted_at || '')}
                    </td>
                    {form.fields.map((field) => (
                      <td key={field.id} className="px-6 py-4 text-sm text-white/90">
                        <div className="max-w-xs truncate">
                          {Array.isArray(submission.data[field.id])
                            ? submission.data[field.id].join(', ')
                            : submission.data[field.id] || '-'}
                        </div>
                      </td>
                    ))}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white/70">
                      <button
                        onClick={() => setSelectedSubmission(submission)}
                        className="text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
                      >
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Submission Detail Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="card glow-emerald max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-white">Submission Details</h3>
                <button
                  onClick={() => setSelectedSubmission(null)}
                  className="text-white/60 hover:text-white text-2xl leading-none cursor-pointer"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <span className="text-sm font-medium text-white/70">Submitted:</span>
                  <p className="text-white">{formatDate(selectedSubmission.submitted_at || '')}</p>
                </div>

                {form.fields.map((field) => (
                  <div key={field.id}>
                    <span className="text-sm font-medium text-white/70">{field.label}:</span>
                    <p className="text-white mt-1">
                      {Array.isArray(selectedSubmission.data[field.id])
                        ? selectedSubmission.data[field.id].join(', ')
                        : selectedSubmission.data[field.id] || '-'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function SubmissionsPage() {
  return (
    <ProtectedRoute>
      <SubmissionsContent />
    </ProtectedRoute>
  )
}
