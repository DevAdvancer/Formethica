import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI('AIzaSyCOp3kYMdCunbC8FnHtkpsfCaBIK7mg9cg')

export async function suggestFormFields(formTitle: string, formDescription?: string): Promise<any[]> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

    const prompt = `
    Based on the form title "${formTitle}" ${formDescription ? `and description "${formDescription}"` : ''}, suggest 3-5 relevant form fields.

    Return a JSON array of objects with this structure:
    [
      {
        "type": "text|email|number|textarea|select|radio|checkbox",
        "label": "Field Label",
        "placeholder": "Placeholder text",
        "required": true|false,
        "options": ["option1", "option2"] // only for select, radio, checkbox
      }
    ]

    Make the suggestions practical and relevant to the form's purpose. For example:
    - Contact forms need name, email, message
    - Event registration needs name, email, ticket type
    - Feedback forms need rating, comments, suggestions

    Only return the JSON array, no other text.
    `

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    // Parse the JSON response
    const cleanedText = text.replace(/```json\n?|\n?```/g, '').trim()
    return JSON.parse(cleanedText)
  } catch (error) {
    console.error('Error generating field suggestions:', error)
    return []
  }
}

export async function chatWithBot(message: string, context?: string): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

    const prompt = `
    You are a helpful assistant for a forms application. Help users with:
    - Creating effective forms
    - Choosing the right field types
    - Form design best practices
    - Data collection strategies

    ${context ? `Context: ${context}` : ''}

    User message: ${message}

    Provide a helpful, concise response (max 150 words). Be friendly and practical.
    `

    const result = await model.generateContent(prompt)
    const response = await result.response
    return response.text()
  } catch (error) {
    console.error('Error in chat:', error)
    return "I'm sorry, I'm having trouble responding right now. Please try again later."
  }
}
