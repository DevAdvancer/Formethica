import { NextRequest, NextResponse } from 'next/server'
import { supabaseAnonymous } from '@/lib/supabase-server'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { data: formData } = body

    if (!id || !formData) {
      return NextResponse.json(
        { error: 'Missing form ID or submission data' },
        { status: 400 }
      )
    }

        // First, verify the form exists and is active
    const { data: form, error: formError } = await supabaseAnonymous
      .from('forms')
      .select('id, title, is_active, fields')
      .eq('id', id)
      .single()

    if (formError || !form) {
      return NextResponse.json(
        { error: 'Form not found' },
        { status: 404 }
      )
    }

    // Check if form is active
    if (!form.is_active) {
      return NextResponse.json(
        { error: 'Form is currently inactive and not accepting submissions' },
        { status: 403 }
      )
    }

    // Validate required fields
    const requiredFields = form.fields.filter((field: any) => field.required)
    for (const field of requiredFields) {
      if (!formData[field.id] || (Array.isArray(formData[field.id]) && formData[field.id].length === 0)) {
        return NextResponse.json(
          { error: `Field "${field.label}" is required` },
          { status: 400 }
        )
      }
    }

    // Insert the submission
    const { data: submission, error: submissionError } = await supabaseAnonymous
      .from('form_submissions')
      .insert({
        form_id: id,
        data: formData,
        ip_address: request.headers.get('x-forwarded-for') ||
                   request.headers.get('x-real-ip') ||
                   'unknown'
      })
      .select()
      .single()

    if (submissionError) {
      console.error('Submission error:', submissionError)
      return NextResponse.json(
        { error: 'Failed to submit form' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      submissionId: submission.id,
      message: 'Form submitted successfully'
    })

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
