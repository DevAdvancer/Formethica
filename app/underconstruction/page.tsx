import { Metadata } from 'next'
import UnderConstruction from '@/components/under-construction'

export const metadata: Metadata = {
  title: 'Help Center - FORMETHICA',
  description: 'Get help and support for FORMETHICA. Find answers to common questions and contact our support team.',
}

export default function HelpPage() {
  return (
    <UnderConstruction
      pageName="Help Center"
      estimatedCompletion="Coming Soon - We're building a comprehensive help center for you"
      showHomeButton={true}
    />
  )
}
