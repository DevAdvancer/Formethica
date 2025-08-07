import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Terms of Service - Formethica',
  description: 'Read the terms and conditions for using Formethica\'s form building service.',
}

export default function TermsPage() {
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
          <h1 className="text-4xl font-bold text-white mb-4">Terms of Service</h1>
          <p className="text-white/60">Last updated: August 1, 2025</p>
        </div>

        <div className="prose prose-invert max-w-none">
          <div className="space-y-8">
            <div className="card">
              <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
              <p className="text-white/80">
                By accessing and using Formethica's services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </div>

            <div className="card">
              <h2 className="text-2xl font-bold text-white mb-4">2. Description of Service</h2>
              <p className="text-white/80 mb-4">
                Formethica provides an online form building platform that allows users to create, customize, and deploy web forms. Our service includes:
              </p>
              <ul className="list-disc list-inside text-white/80 space-y-1">
                <li>Drag-and-drop form builder</li>
                <li>Form hosting and submission processing</li>
                <li>Analytics and reporting tools</li>
                <li>Integration capabilities</li>
                <li>Customer support</li>
              </ul>
            </div>

            <div className="card">
              <h2 className="text-2xl font-bold text-white mb-4">3. User Accounts</h2>

              <h3 className="text-xl font-semibold text-white mb-3">3.1 Account Creation</h3>
              <p className="text-white/80 mb-4">
                To use our service, you must create an account by providing accurate and complete information. You are responsible for maintaining the confidentiality of your account credentials.
              </p>

              <h3 className="text-xl font-semibold text-white mb-3">3.2 Account Responsibility</h3>
              <p className="text-white/80">
                You are responsible for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account.
              </p>
            </div>

            <div className="card">
              <h2 className="text-2xl font-bold text-white mb-4">4. Acceptable Use</h2>

              <h3 className="text-xl font-semibold text-white mb-3">4.1 Permitted Use</h3>
              <p className="text-white/80 mb-4">
                You may use our service for lawful purposes only. You agree to comply with all applicable laws and regulations.
              </p>

              <h3 className="text-xl font-semibold text-white mb-3">4.2 Prohibited Activities</h3>
              <p className="text-white/80 mb-4">You agree not to:</p>
              <ul className="list-disc list-inside text-white/80 space-y-1">
                <li>Use the service for illegal activities</li>
                <li>Collect sensitive information without proper consent</li>
                <li>Spam or send unsolicited communications</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with or disrupt the service</li>
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe on intellectual property rights</li>
              </ul>
            </div>

            <div className="card">
              <h2 className="text-2xl font-bold text-white mb-4">5. Subscription and Payment</h2>

              <h3 className="text-xl font-semibold text-white mb-3">5.1 Subscription Plans</h3>
              <p className="text-white/80 mb-4">
                We offer various subscription plans with different features and usage limits. Current pricing is available on our website.
              </p>

              <h3 className="text-xl font-semibold text-white mb-3">5.2 Payment Terms</h3>
              <p className="text-white/80 mb-4">
                Subscription fees are billed in advance on a monthly or annual basis. All fees are non-refundable except as required by law or as specified in our refund policy.
              </p>

              <h3 className="text-xl font-semibold text-white mb-3">5.3 Auto-Renewal</h3>
              <p className="text-white/80">
                Subscriptions automatically renew unless cancelled before the renewal date. You can cancel your subscription at any time through your account settings.
              </p>
            </div>

            <div className="card">
              <h2 className="text-2xl font-bold text-white mb-4">6. Data and Privacy</h2>

              <h3 className="text-xl font-semibold text-white mb-3">6.1 Your Data</h3>
              <p className="text-white/80 mb-4">
                You retain ownership of all data you submit through our service. We process your data in accordance with our Privacy Policy.
              </p>

              <h3 className="text-xl font-semibold text-white mb-3">6.2 Data Security</h3>
              <p className="text-white/80">
                We implement reasonable security measures to protect your data, but cannot guarantee absolute security. You are responsible for maintaining appropriate security measures for your forms.
              </p>
            </div>

            <div className="card">
              <h2 className="text-2xl font-bold text-white mb-4">7. Intellectual Property</h2>

              <h3 className="text-xl font-semibold text-white mb-3">7.1 Our Rights</h3>
              <p className="text-white/80 mb-4">
                Formethica and its licensors own all rights, title, and interest in the service, including all intellectual property rights.
              </p>

              <h3 className="text-xl font-semibold text-white mb-3">7.2 Your Rights</h3>
              <p className="text-white/80">
                You retain ownership of your content and forms. By using our service, you grant us a license to host, store, and process your content as necessary to provide the service.
              </p>
            </div>

            <div className="card">
              <h2 className="text-2xl font-bold text-white mb-4">8. Service Availability</h2>
              <p className="text-white/80 mb-4">
                We strive to maintain high service availability but cannot guarantee uninterrupted access. We may perform maintenance or updates that temporarily affect service availability.
              </p>
              <p className="text-white/80">
                We reserve the right to modify, suspend, or discontinue the service at any time with reasonable notice.
              </p>
            </div>

            <div className="card">
              <h2 className="text-2xl font-bold text-white mb-4">9. Limitation of Liability</h2>
              <p className="text-white/80 mb-4">
                To the maximum extent permitted by law, Formethica shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or use.
              </p>
              <p className="text-white/80">
                Our total liability for any claims arising from or related to the service shall not exceed the amount paid by you for the service in the 12 months preceding the claim.
              </p>
            </div>

            <div className="card">
              <h2 className="text-2xl font-bold text-white mb-4">10. Indemnification</h2>
              <p className="text-white/80">
                You agree to indemnify and hold harmless Formethica from any claims, damages, or expenses arising from your use of the service, violation of these terms, or infringement of any rights of another party.
              </p>
            </div>

            <div className="card">
              <h2 className="text-2xl font-bold text-white mb-4">11. Termination</h2>

              <h3 className="text-xl font-semibold text-white mb-3">11.1 Termination by You</h3>
              <p className="text-white/80 mb-4">
                You may terminate your account at any time by cancelling your subscription through your account settings.
              </p>

              <h3 className="text-xl font-semibold text-white mb-3">11.2 Termination by Us</h3>
              <p className="text-white/80">
                We may terminate or suspend your account if you violate these terms or engage in prohibited activities. Upon termination, your access to the service will cease immediately.
              </p>
            </div>

            <div className="card">
              <h2 className="text-2xl font-bold text-white mb-4">12. Governing Law</h2>
              <p className="text-white/80">
                These terms shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions.
              </p>
            </div>

            <div className="card">
              <h2 className="text-2xl font-bold text-white mb-4">13. Changes to Terms</h2>
              <p className="text-white/80">
                We reserve the right to modify these terms at any time. We will notify users of significant changes via email or through the service. Continued use of the service after changes constitutes acceptance of the new terms.
              </p>
            </div>

            <div className="card">
              <h2 className="text-2xl font-bold text-white mb-4">14. Contact Information</h2>
              <p className="text-white/80 mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="glass-dark rounded-lg p-4">
                <p className="text-white/80">Email: legal@formcraft.ai</p>
                <p className="text-white/80">Address: 123 Market Street, Suite 400, San Francisco, CA 94105</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
