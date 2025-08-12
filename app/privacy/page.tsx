import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Privacy Policy - Formethica',
  description: 'Learn how Formethica collects, uses, and protects your personal information.',
}

export default function PrivacyPage() {
  return (
    <div className="page-content">
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
          <h1 className="text-4xl font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-white/60">Last updated: August 1, 2025</p>
        </div>

        <div className="prose prose-invert max-w-none">
          <div className="space-y-8">
            <div className="card">
              <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
              <p className="text-white/80 mb-4">
                Formethica ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our form building service and website.
              </p>
              <p className="text-white/80">
                By using our service, you agree to the collection and use of information in accordance with this policy.
              </p>
            </div>

            <div className="card">
              <h2 className="text-2xl font-bold text-white mb-4">2. Information We Collect</h2>

              <h3 className="text-xl font-semibold text-white mb-3">2.1 Personal Information</h3>
              <p className="text-white/80 mb-4">We may collect the following personal information:</p>
              <ul className="list-disc list-inside text-white/80 mb-4 space-y-1">
                <li>Name and email address</li>
                <li>Account credentials</li>
                <li>Payment information (processed by third-party providers)</li>
                <li>Profile information you choose to provide</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3">2.2 Usage Information</h3>
              <p className="text-white/80 mb-4">We automatically collect certain information when you use our service:</p>
              <ul className="list-disc list-inside text-white/80 mb-4 space-y-1">
                <li>IP address and device information</li>
                <li>Browser type and version</li>
                <li>Pages visited and time spent</li>
                <li>Form creation and submission data</li>
                <li>Usage patterns and preferences</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3">2.3 Form Data</h3>
              <p className="text-white/80">
                When you create forms using our service, we store the form structure, settings, and submissions. You control what data is collected through your forms.
              </p>
            </div>

            <div className="card">
              <h2 className="text-2xl font-bold text-white mb-4">3. How We Use Your Information</h2>
              <p className="text-white/80 mb-4">We use the collected information for:</p>
              <ul className="list-disc list-inside text-white/80 space-y-1">
                <li>Providing and maintaining our service</li>
                <li>Processing payments and managing accounts</li>
                <li>Improving our service and user experience</li>
                <li>Sending important updates and notifications</li>
                <li>Providing customer support</li>
                <li>Preventing fraud and ensuring security</li>
                <li>Complying with legal obligations</li>
              </ul>
            </div>

            <div className="card">
              <h2 className="text-2xl font-bold text-white mb-4">4. Information Sharing</h2>
              <p className="text-white/80 mb-4">We do not sell your personal information. We may share information in the following circumstances:</p>

              <h3 className="text-xl font-semibold text-white mb-3">4.1 Service Providers</h3>
              <p className="text-white/80 mb-4">
                We work with trusted third-party service providers who help us operate our service, such as payment processors, hosting providers, and analytics services.
              </p>

              <h3 className="text-xl font-semibold text-white mb-3">4.2 Legal Requirements</h3>
              <p className="text-white/80 mb-4">
                We may disclose information if required by law or in response to valid legal requests from authorities.
              </p>

              <h3 className="text-xl font-semibold text-white mb-3">4.3 Business Transfers</h3>
              <p className="text-white/80">
                In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of the transaction.
              </p>
            </div>

            <div className="card">
              <h2 className="text-2xl font-bold text-white mb-4">5. Data Security</h2>
              <p className="text-white/80 mb-4">
                We implement appropriate technical and organizational measures to protect your information against unauthorized access, alteration, disclosure, or destruction. These measures include:
              </p>
              <ul className="list-disc list-inside text-white/80 space-y-1">
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security assessments and updates</li>
                <li>Access controls and authentication</li>
                <li>Employee training on data protection</li>
              </ul>
            </div>

            <div className="card">
              <h2 className="text-2xl font-bold text-white mb-4">6. Your Rights</h2>
              <p className="text-white/80 mb-4">Depending on your location, you may have the following rights:</p>
              <ul className="list-disc list-inside text-white/80 space-y-1">
                <li>Access to your personal information</li>
                <li>Correction of inaccurate information</li>
                <li>Deletion of your information</li>
                <li>Restriction of processing</li>
                <li>Data portability</li>
                <li>Objection to processing</li>
              </ul>
              <p className="text-white/80 mt-4">
                To exercise these rights, please contact us at privacy@formcraft.ai.
              </p>
            </div>

            <div className="card">
              <h2 className="text-2xl font-bold text-white mb-4">7. Cookies and Tracking</h2>
              <p className="text-white/80 mb-4">
                We use cookies and similar technologies to enhance your experience, analyze usage, and provide personalized content. You can control cookie settings through your browser preferences.
              </p>
              <p className="text-white/80">
                For more information, please see our Cookie Policy.
              </p>
            </div>

            <div className="card">
              <h2 className="text-2xl font-bold text-white mb-4">8. International Transfers</h2>
              <p className="text-white/80">
                Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your information in accordance with this Privacy Policy.
              </p>
            </div>

            <div className="card">
              <h2 className="text-2xl font-bold text-white mb-4">9. Children's Privacy</h2>
              <p className="text-white/80">
                Our service is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you become aware that a child has provided us with personal information, please contact us.
              </p>
            </div>

            <div className="card">
              <h2 className="text-2xl font-bold text-white mb-4">10. Changes to This Policy</h2>
              <p className="text-white/80">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </div>

            <div className="card">
              <h2 className="text-2xl font-bold text-white mb-4">11. Contact Us</h2>
              <p className="text-white/80 mb-4">
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <div className="glass-dark rounded-lg p-4">
                <p className="text-white/80">Email: theabhirupkumar@gmail.com</p>
                <p className="text-white/80">Address: Kolkata, West Bengal, India</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
