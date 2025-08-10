'use client'

import { memo, useCallback } from 'react'
import { formatDate } from '@/lib/utils'
import { Pencil1Icon, TrashIcon, Share2Icon, BarChartIcon, CalendarIcon } from '@radix-ui/react-icons'

interface FormWithSubmissions {
  id: string
  title: string
  description?: string | null
  fields: any[]
  created_at: string | null
  updated_at: string | null
  user_id: string
  short_url: string
  is_active: boolean | null
  submission_count: number
}

interface FormCardProps {
  form: FormWithSubmissions
  mounted: boolean
  onCopyLink: (shortCode: string, event: React.MouseEvent) => void
  onDelete: (id: string) => void
  getShortUrl: (shortCode: string) => string
}

const FormCard = memo(function FormCard({
  form,
  mounted,
  onCopyLink,
  onDelete,
  getShortUrl
}: FormCardProps) {
  const handleCopyClick = useCallback((e: React.MouseEvent) => {
    onCopyLink(form.short_url, e)
  }, [form.short_url, onCopyLink])

  const handleDeleteClick = useCallback(() => {
    onDelete(form.id)
  }, [form.id, onDelete])

  return (
    <div className="card group cursor-default">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-white truncate group-hover:text-emerald-300 transition-colors">
          {form.title}
        </h3>
        <span className={form.is_active ? 'badge-active' : 'badge-inactive'}>
          {form.is_active ? 'Active' : 'Inactive'}
        </span>
      </div>

      {form.description && (
        <p className="text-white/70 text-sm mb-4 line-clamp-2">
          {form.description}
        </p>
      )}

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="glass-dark rounded-lg p-3 text-center">
          <div className="flex items-center justify-center mb-1">
            <BarChartIcon className="w-4 h-4 text-emerald-400 mr-1" />
            <span className="text-xs text-white/60">Responses</span>
          </div>
          <div className="text-lg font-semibold text-white">{form.submission_count || 0}</div>
        </div>
        <div className="glass-dark rounded-lg p-3 text-center">
          <div className="flex items-center justify-center mb-1">
            <CalendarIcon className="w-4 h-4 text-orange-400 mr-1" />
            <span className="text-xs text-white/60">Fields</span>
          </div>
          <div className="text-lg font-semibold text-white">{form.fields.length}</div>
        </div>
      </div>

      <div className="text-sm text-white/60 mb-4">
        <p className="flex items-center">
          <CalendarIcon className="w-3 h-3 mr-1" />
          Created {formatDate(form.created_at || '')}
        </p>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-white/60">Share Form:</span>
          {mounted && (
            <button
              onClick={handleCopyClick}
              className="flex items-center space-x-1 text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
            >
              <Share2Icon className="w-4 h-4" />
              <span>Copy Link</span>
            </button>
          )}
        </div>
        <code className="glass px-3 py-2 rounded-lg text-xs block truncate text-white/80">
          {mounted ? getShortUrl(form.short_url) : `/s/${form.short_url}`}
        </code>
      </div>

      <div className="flex space-x-2">
        <a
          href={`/submissions/${form.id}`}
          className="flex-1 btn btn-primary text-center text-sm glow-emerald"
        >
          <BarChartIcon className="w-4 h-4 inline mr-1" />
          View Responses
        </a>
        <a
          href={`/edit/${form.id}`}
          className="btn btn-secondary text-sm"
        >
          <Pencil1Icon className="w-4 h-4" />
        </a>
        <button
          onClick={handleDeleteClick}
          className="btn btn-danger text-sm cursor-pointer"
        >
          <TrashIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
})

export default FormCard
