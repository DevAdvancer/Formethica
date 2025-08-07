import { Metadata } from 'next'
import Link from 'next/link'
import { Shield, Users, Lock, FileText, Mail, ArrowRight, ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'GDPR Compliance - Formethica',
  description: 'Learn about Formethica\'s commitment to GDPR compliance and data protection.',
}

export default function GDPRPage() {
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
          <h1 className="text-4xl font-bold text-white mb-4">GDPR Compliance</h1>
          <p className="text-white/60">Last updated: August 1, 2025</p>
          <p className="text-white/80 mt-4">
            Formethica is committed to protecting your privacy and complying with the General Data Protection Regulation (GDPR).
          </p>
        </div>

        <div className="prose prose-invert max-w-none">
          <div className="space-y-8">
            <div className="card">
              <h2 className="text-2xl font-bold text-white mb-4">Our Commitment to GDPR</h2>
              <p className="text-white/80 mb-6">
                The General Data Protection Regulation (GDPR) is a comprehensive data protection law that came into effect on May 25, 2018.
                At Formethica, we take data protection seriously and have implemented measures to ensure compliance with GDPR requirements.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass-dark rounded-lg p-6">
                  <Shield className="w-8 h-8 text-emerald-400 mb-3" />
                  <h3 className="text-lg font-semibold text-white mb-2">Data Protection by Design</h3>
                  <p className="text-white/70 text-sm">
                    We implement privacy considerations into our systems and processes from the ground up.
                  </p>
                </div>

                <div className="glass-dark rounded-lg p-6">
                  <Users className="w-8 h-8 text-orange-400 mb-3" />
                  <h3 className="text-lg font-semibold text-white mb-2">User Rights</h3>
                  <p className="text-white/70 text-sm">
                    We respect and facilitate all GDPR rights including access, rectification, and erasure.
                  </p>
                </div>

                <div className="glass-dark rounded-lg p-6">
                  <Lock className="w-8 h-8 text-amber-400 mb-3" />
                  <h3 className="text-lg font-semibold text-white mb-2">Data Security</h3>
                  <p className="text-white/70 text-sm">
                    We use industry-standard security measures to protect personal data from unauthorized access.
                  </p>
                </div>

                <div className="glass-dark rounded-lg p-6">
                  <FileText className="w-8 h-8 text-cyan-400 mb-3" />
                  <h3 className="text-lg font-semibold text-white mb-2">Transparent Processing</h3>
                  <p className="text-white/70 text-sm">
                    We provide clear information about how we collect, use, and process personal data.
                  </p>
                </div>
              </div>
            </div>

            <div className="card">
              <h2 className="text-2xl font-bold text-white mb-4">Your Rights Under GDPR</h2>
              <p className="text-white/80 mb-6">
                As a data subject under GDPR, you have several rights regarding your personal data:
              </p>

              <div className="space-y-4">
                <div className="glass-dark rounded-lg p-4">
                  <h3 className="font-semibold text-white mb-2">Right to Information</h3>
                  <p className="text-white/70 text-sm">
                    You have the right to know what personal data we collect, how we use it, and who we share it with.
                  </p>
                </div>

                <div className="glass-dark rounded-lg p-4">
                  <h3 className="font-semibold text-white mb-2">Right of Access</h3>
                  <p className="text-white/70 text-sm">
                    You can request a copy of the personal data we hold about you.
                  </p>
                </div>

                <div className="glass-dark rounded-lg p-4">
                  <h3 className="font-semibold text-white mb-2">Right to Rectification</h3>
                  <p className="text-white/70 text-sm">
                    You can ask us to correct any inaccurate or incomplete personal data.
                  </p>
                </div>

                <div className="glass-dark rounded-lg p-4">
                  <h3 className="font-semibold text-white mb-2">Right to Erasure ("Right to be Forgotten")</h3>
                  <p className="text-white/70 text-sm">
                    You can request that we delete your personal data under certain circumstances.
                  </p>
                </div>

                <div className="glass-dark rounded-lg p-4">
                  <h3 className="font-semibold text-white mb-2">Right to Restrict Processing</h3>
                  <p className="text-white/70 text-sm">
                    You can ask us to limit how we use your personal data in certain situations.
                  </p>
                </div>

                <div className="glass-dark rounded-lg p-4">
                  <h3 className="font-semibold text-white mb-2">Right to Data Portability</h3>
                  <p className="text-white/70 text-sm">
                    You can request your personal data in a structured, machine-readable format.
                  </p>
                </div>

                <div className="glass-dark rounded-lg p-4">
                  <h3 className="font-semibold text-white mb-2">Right to Object</h3>
                  <p className="text-white/70 text-sm">
                    You can object to certain types of processing, including direct marketing.
                  </p>
                </div>
              </div>
            </div>

            <div className="card">
              <h2 className="text-2xl font-bold text-white mb-4">Legal Basis for Processing</h2>
              <p className="text-white/80 mb-4">
                We process personal data based on the following legal grounds:
              </p>

              <ul className="space-y-3 text-white/80">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong>Contract:</strong> Processing necessary for the performance of our service agreement with you
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong>Legitimate Interest:</strong> Processing for our legitimate business interests, such as improving our service
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong>Consent:</strong> Processing based on your explicit consent, which you can withdraw at any time
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong>Legal Obligation:</strong> Processing required to comply with legal requirements
                  </div>
                </li>
              </ul>
            </div>

            <div className="card">
              <h2 className="text-2xl font-bold text-white mb-4">Data Transfers</h2>
              <p className="text-white/80 mb-4">
                When we transfer personal data outside the European Economic Area (EEA), we ensure appropriate safeguards are in place:
              </p>

              <ul className="space-y-2 text-white/80">
                <li>• Adequacy decisions by the European Commission</li>
                <li>• Standard Contractual Clauses (SCCs)</li>
                <li>• Binding Corporate Rules (BCRs)</li>
                <li>• Certification schemes and codes of conduct</li>
              </ul>
            </div>

            <div className="card">
              <h2 className="text-2xl font-bold text-white mb-4">Data Retention</h2>
              <p className="text-white/80 mb-4">
                We retain personal data only for as long as necessary to fulfill the purposes for which it was collected:
              </p>

              <div className="glass-dark rounded-lg p-4">
                <ul className="space-y-2 text-white/80">
                  <li>• Account data: Retained while your account is active</li>
                  <li>• Form data: Retained according to your settings and legal requirements</li>
                  <li>• Analytics data: Typically retained for 26 months</li>
                  <li>• Support communications: Retained for 3 years</li>
                </ul>
              </div>
            </div>

            <div className="card">
              <h2 className="text-2xl font-bold text-white mb-4">Data Protection Officer</h2>
              <p className="text-white/80 mb-4">
                We have appointed a Data Protection Officer (DPO) to oversee our data protection activities.
                You can contact our DPO with any questions or concerns about data protection:
              </p>

              <div className="glass-dark rounded-lg p-4">
                <p className="text-white/80">Email: dpo@formethica.com</p>
                <p className="text-white/80">Address: Data Protection Officer, Formethica, 123 Market Street, Suite 400, San Francisco, CA 94105</p>
              </div>
            </div>

            <div className="card">
              <h2 className="text-2xl font-bold text-white mb-4">Exercising Your Rights</h2>
              <p className="text-white/80 mb-6">
                To exercise any of your GDPR rights, please contact us using the information below.
                We will respond to your request within one month.
              </p>

              <div className="card glow-emerald">
                <div className="flex items-center gap-3 mb-4">
                  <Mail className="w-6 h-6 text-emerald-400" />
                  <h3 className="text-lg font-semibold text-white">Contact Us</h3>
                </div>
                <p className="text-white/80 mb-4">
                  For any GDPR-related requests or questions, please reach out to us:
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="mailto:privacy@formethica.com"
                    className="btn btn-primary glow-emerald flex items-center justify-center gap-2"
                  >
                    Email Privacy Team
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/contact"
                    className="btn btn-secondary text-center"
                  >
                    Contact Form
                  </Link>
                </div>
              </div>
            </div>

            <div className="card">
              <h2 className="text-2xl font-bold text-white mb-4">Supervisory Authority</h2>
              <p className="text-white/80">
                If you believe we have not handled your personal data in accordance with GDPR,
                you have the right to lodge a complaint with your local supervisory authority.
                You can find contact information for EU supervisory authorities on the
                European Data Protection Board website.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
