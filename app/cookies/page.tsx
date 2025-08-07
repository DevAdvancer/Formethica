import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Cookie Policy - Formethica',
  description: 'Learn about how Formethica uses cookies and similar technologies.',
}

export default function CookiesPage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link
          href="/"
          className="btn btn-secondary mb-8 inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="card mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Cookie Policy</h1>
          <p className="text-white/60">Last updated: August 1, 2025</p>
        </div>

        <div className="prose prose-invert max-w-none">
          <div className="space-y-8">
            <div className="card">
              <h2 className="text-2xl font-bold text-white mb-4">What Are Cookies?</h2>
              <p className="text-white/80">
                Cookies are small text files that are stored on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and analyzing how you use our service.
              </p>
            </div>

            <div className="card">
              <h2 className="text-2xl font-bold text-white mb-4">How We Use Cookies</h2>
              <p className="text-white/80 mb-4">We use cookies for the following purposes:</p>

              <h3 className="text-xl font-semibold text-white mb-3">Essential Cookies</h3>
              <p className="text-white/80 mb-4">These cookies are necessary for the website to function properly:</p>
              <ul className="list-disc list-inside text-white/80 mb-4 space-y-1">
                <li>Authentication and security</li>
                <li>Session management</li>
                <li>Load balancing</li>
                <li>Form functionality</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3">Analytics Cookies</h3>
              <p className="text-white/80 mb-4">These cookies help us understand how visitors use our website:</p>
              <ul className="list-disc list-inside text-white/80 mb-4 space-y-1">
                <li>Page views and user interactions</li>
                <li>Traffic sources and patterns</li>
                <li>Performance monitoring</li>
                <li>Error tracking</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3">Functional Cookies</h3>
              <p className="text-white/80 mb-4">These cookies enhance your experience:</p>
              <ul className="list-disc list-inside text-white/80 mb-4 space-y-1">
                <li>Language preferences</li>
                <li>Theme settings</li>
                <li>Form auto-save</li>
                <li>User interface preferences</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3">Marketing Cookies</h3>
              <p className="text-white/80 mb-4">These cookies help us deliver relevant content:</p>
              <ul className="list-disc list-inside text-white/80 space-y-1">
                <li>Personalized content</li>
                <li>Ad targeting and measurement</li>
                <li>Social media integration</li>
                <li>Campaign tracking</li>
              </ul>
            </div>

            <div className="card">
              <h2 className="text-2xl font-bold text-white mb-4">Managing Cookies</h2>
              <p className="text-white/80 mb-4">
                You can control and manage cookies in several ways:
              </p>

              <h3 className="text-xl font-semibold text-white mb-3">Browser Settings</h3>
              <p className="text-white/80 mb-4">
                Most browsers allow you to control cookies through their settings. You can:
              </p>
              <ul className="list-disc list-inside text-white/80 mb-4 space-y-1">
                <li>Block all cookies</li>
                <li>Block third-party cookies</li>
                <li>Delete existing cookies</li>
                <li>Set preferences for specific websites</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3">Cookie Consent</h3>
              <p className="text-white/80">
                When you first visit our website, we'll ask for your consent to use non-essential cookies. You can change your preferences at any time through our cookie consent banner or by contacting us.
              </p>
            </div>

            <div className="card">
              <h2 className="text-2xl font-bold text-white mb-4">Third-Party Cookies</h2>
              <p className="text-white/80 mb-4">
                We work with trusted third-party services that may set their own cookies:
              </p>
              <ul className="list-disc list-inside text-white/80 space-y-1">
                <li>Google Analytics for website analytics</li>
                <li>Stripe for payment processing</li>
                <li>Intercom for customer support</li>
                <li>Social media platforms for sharing features</li>
              </ul>
            </div>

            <div className="card">
              <h2 className="text-2xl font-bold text-white mb-4">Cookie Retention</h2>
              <p className="text-white/80 mb-4">
                Different cookies have different retention periods:
              </p>
              <ul className="list-disc list-inside text-white/80 space-y-1">
                <li><strong>Session cookies:</strong> Deleted when you close your browser</li>
                <li><strong>Persistent cookies:</strong> Remain for a set period (typically 30 days to 2 years)</li>
                <li><strong>Essential cookies:</strong> Retained as long as necessary for functionality</li>
              </ul>
            </div>

            <div className="card">
              <h2 className="text-2xl font-bold text-white mb-4">Impact of Disabling Cookies</h2>
              <p className="text-white/80 mb-4">
                If you disable cookies, some features of our website may not work properly:
              </p>
              <ul className="list-disc list-inside text-white/80 space-y-1">
                <li>You may need to log in repeatedly</li>
                <li>Your preferences won't be saved</li>
                <li>Some forms may not function correctly</li>
                <li>Analytics and performance monitoring will be limited</li>
              </ul>
            </div>

            <div className="card">
              <h2 className="text-2xl font-bold text-white mb-4">Updates to This Policy</h2>
              <p className="text-white/80">
                We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the updated policy on our website.
              </p>
            </div>

            <div className="card">
              <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
              <p className="text-white/80 mb-4">
                If you have any questions about our use of cookies, please contact us:
              </p>
              <div className="glass-dark rounded-lg p-4">
                <p className="text-white/80">Email: privacy@formcraft.ai</p>
                <p className="text-white/80">Address: 123 Market Street, Suite 400, San Francisco, CA 94105</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
