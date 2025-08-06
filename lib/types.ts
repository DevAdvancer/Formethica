export interface FormField {
  id: string
  type: 'text' | 'email' | 'number' | 'textarea' | 'select' | 'radio' | 'checkbox'
  label: string
  placeholder?: string
  required: boolean
  options?: string[] // for select, radio, checkbox
}

export interface Form {
  id: string
  title: string
  description?: string | null
  fields: FormField[]
  created_at: string | null
  updated_at: string | null
  user_id: string
  short_url: string
  is_active: boolean | null
}

export interface FormSubmission {
  id: string
  form_id: string | null
  data: Record<string, any>
  submitted_at: string | null
  ip_address?: string | null
}

export interface ShortUrl {
  id: string
  short_code: string
  original_url: string
  form_id: string
  clicks: number
  created_at: string
}
