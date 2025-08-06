'use client'

import { useState } from 'react'
import { MagicWandIcon, PlusIcon } from '@radix-ui/react-icons'
import { suggestFormFields } from '@/lib/gemini'
import { FormField } from '@/lib/types'

interface AiFieldSuggestionsProps {
  formTitle: string
  formDescription?: string
  onAddFields: (fields: FormField[]) => void
}

export default function AiFieldSuggestions({
  formTitle,
  formDescription,
  onAddFields
}: AiFieldSuggestionsProps) {
  const [suggestions, setSuggestions] = useState<FormField[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)

  const generateSuggestions = async () => {
    if (!formTitle.trim()) return

    setIsLoading(true)
    try {
      const suggestedFields = await suggestFormFields(formTitle, formDescription)

      // Convert to FormField format with unique IDs
      const formFields: FormField[] = suggestedFields.map((field, index) => ({
        id: `ai-${Date.now()}-${index}`,
        type: field.type,
        label: field.label,
        placeholder: field.placeholder || '',
        required: field.required || false,
        options: field.options || []
      }))

      setSuggestions(formFields)
      setShowSuggestions(true)
    } catch (error) {
      console.error('Error generating suggestions:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const addField = (field: FormField) => {
    onAddFields([field])
    // Remove the added field from suggestions
    setSuggestions(prev => prev.filter(f => f.id !== field.id))
  }

  const addAllFields = () => {
    onAddFields(suggestions)
    setSuggestions([])
    setShowSuggestions(false)
  }

  if (!formTitle.trim()) {
    return (
      <div className="glass-dark rounded-xl p-4 text-center">
        <MagicWandIcon className="w-8 h-8 text-white/40 mx-auto mb-2" />
        <p className="text-white/60 text-sm">
          Add a form title to get AI field suggestions
        </p>
      </div>
    )
  }

  return (
    <div className="glass-dark rounded-xl p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <MagicWandIcon className="w-5 h-5 text-emerald-400" />
          <h3 className="text-white font-medium">AI Suggestions</h3>
        </div>

        {!showSuggestions && (
          <button
            onClick={generateSuggestions}
            disabled={isLoading}
            className="btn btn-primary text-sm px-4 py-2 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <div className="spinner h-3 w-3 mr-2"></div>
                Generating...
              </>
            ) : (
              <>
                <MagicWandIcon className="w-3 h-3 mr-1" />
                Suggest Fields
              </>
            )}
          </button>
        )}
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-white/80 text-sm">
              AI suggested {suggestions.length} fields for your form:
            </p>
            <button
              onClick={addAllFields}
              className="btn btn-secondary text-xs px-3 py-1"
            >
              Add All
            </button>
          </div>

          <div className="space-y-2 max-h-60 overflow-y-auto">
            {suggestions.map((field) => (
              <div
                key={field.id}
                className="flex items-center justify-between p-3 glass rounded-lg hover:bg-white/10 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-xs px-2 py-1 bg-emerald-600/20 text-emerald-300 rounded-full">
                      {field.type}
                    </span>
                    {field.required && (
                      <span className="text-xs px-2 py-1 bg-orange-600/20 text-orange-300 rounded-full">
                        required
                      </span>
                    )}
                  </div>
                  <p className="text-white font-medium text-sm">{field.label}</p>
                  {field.placeholder && (
                    <p className="text-white/60 text-xs">{field.placeholder}</p>
                  )}
                  {field.options && field.options.length > 0 && (
                    <p className="text-white/60 text-xs">
                      Options: {field.options.join(', ')}
                    </p>
                  )}
                </div>

                <button
                  onClick={() => addField(field)}
                  className="btn btn-primary text-xs px-2 py-1 ml-3"
                >
                  <PlusIcon className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {showSuggestions && suggestions.length === 0 && (
        <div className="text-center py-4">
          <p className="text-white/60 text-sm mb-3">
            All suggestions have been added! 🎉
          </p>
          <button
            onClick={() => {
              setShowSuggestions(false)
              generateSuggestions()
            }}
            className="btn btn-secondary text-sm"
          >
            Generate More
          </button>
        </div>
      )}
    </div>
  )
}
