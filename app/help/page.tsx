import { Metadata } from 'next'
import Link from 'next/link'
import { Search, MessageCircle, Mail, Phone, Clock, ArrowRight, ArrowLeft, HelpCircle, Book, Video, Users } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Help Center - Formethica',
  description: 'Get help and support for Formethica. Find answers to common questions and contact our support team.',
}

const supportOptions = [
  {
    title: 'Live Chat',
    description: 'Get instant help from our support team',
    icon: MessageCircle,
    availability: 'Available 24/7',
    action: 'Start Chat',
    href: '/underconstruction',
    color: 'blue',
  },
  {
    title: 'Email Support',
    description: 'Send us a detailed message about your issue',
    icon: Mail,
    availability: 'Response within 24 hours',
    action: 'Send Email',
    href: 'mailto:support@formcraft.ai',
    color: 'green',
  },
  {
    title: 'Phone Support',
    description: 'Speak directly with our support team',
    icon: Phone,
    availability: 'Mon-Fri, 9AM-6PM EST',
    action: 'Call Now',
    href: 'tel:+1-555-0123',
    color: 'purple',
  },
]

const faqCategories = [
  {
    title: 'Getting Started',
    questions: [
      {
        question: 'How do I create my first form?',
        answer: 'Click on "Create Form" from your dashboard, choose a template or start from scratch, add your fields using the drag-and-drop builder, and publish when ready.',
      },
      {
        question: 'Is there a free plan available?',
        answer: 'Yes! Our free plan includes up to 3 forms and 100 submissions per month, perfect for getting started.',
      },
      {
        question: 'How do I embed a form on my website?',
        answer: 'After publishing your form, go to the "Share" tab and copy the embed code. Paste it into your website\'s HTML where you want the form to appear.',
      },
    ],
  },
  {
    title: 'Account & Billing',
    questions: [
      {
        question: 'How do I upgrade my plan?',
        answer: 'Go to Settings > Billing in your dashboard and select the plan you want to upgrade to. Changes take effect immediately.',
      },
      {
        question: 'Can I cancel my subscription anytime?',
        answer: 'Yes, you can cancel your subscription at any time. Your account will remain active until the end of your current billing period.',
      },
      {
        question: 'Do you offer refunds?',
        answer: 'We offer a 30-day money-back guarantee for all paid plans. Contact support if you\'re not satisfied.',
      },
    ],
  },
  {
    title: 'Forms & Features',
    questions: [
      {
        question: 'How many forms can I create?',
        answer: 'Free plan: 3 forms, Pro plan: unlimited forms, Business plan: unlimited forms with advanced features.',
      },
      {
        question: 'Can I customize the appearance of my forms?',
        answer: 'Yes! You can customize colors, fonts, spacing, and add custom CSS for advanced styling on Pro and Business plans.',
      },
      {
        question: 'How do I set up email notifications?',
        answer: 'In your form settings, go to "Notifications" and add email addresses that should receive notifications when someone submits your form.',
      },
    ],
  },
  {
    title: 'Technical Issues',
    questions: [
      {
        question: 'My form is not receiving submissions',
        answer: 'Check that your form is published and active. Verify the embed code is correct and there are no JavaScript errors on your page.',
      },
      {
        question: 'How do I export my form data?',
        answer: 'Go to your form\'s submissions page and click "Export". You can download data in CSV, Excel, or JSON format.',
      },
      {
        question: 'Can I integrate with other tools?',
        answer: 'Yes! We support webhooks, Zapier, and direct integrations with popular tools like Mailchimp, Slack, and Google Sheets.',
      },
    ],
  },
]

const resources = [
  {
    title: 'Video Tutorials',
    description: 'Step-by-step video guides',
    icon: Video,
    href: '/tutorials',
    color: 'purple',
  },
  {
    title: 'Community Forum',
    description: 'Connect with other users',
    icon: Users,
    href: '/contact',
    color: 'green',
  },
]

export default function HelpPage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link
          href="/"
          className="btn btn-secondary mb-8 inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Help Center
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto mb-8">
            Find answers to your questions or get in touch with our support team.
            We're here to help you succeed with Formethica.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for help articles..."
              className="form-input pl-12"
            />
          </div>
        </div>

        {/* Support Options */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white text-center mb-8">Get Support</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {supportOptions.map((option, index) => {
              const Icon = option.icon
              return (
                <div
                  key={index}
                  className="card text-center glow-emerald hover:glow-orange transition-all duration-300"
                >
                  <div className={`bg-${option.color}-600/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <Icon className={`w-8 h-8 text-${option.color}-400`} />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{option.title}</h3>
                  <p className="text-white/70 text-sm mb-3">{option.description}</p>
                  <div className="flex items-center justify-center gap-1 text-xs text-white/60 mb-4">
                    <Clock className="w-3 h-3" />
                    <span>{option.availability}</span>
                  </div>
                  <Link
                    href={option.href}
                    className={`btn btn-primary glow-${option.color}`}
                  >
                    {option.action}
                  </Link>
                </div>
              )
            })}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white text-center mb-8">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {faqCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="card">
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-emerald-400" />
                  {category.title}
                </h3>
                <div className="space-y-4">
                  {category.questions.map((faq, faqIndex) => (
                    <div
                      key={faqIndex}
                      className="glass-dark rounded-lg p-4"
                    >
                      <h4 className="font-semibold text-white mb-2">{faq.question}</h4>
                      <p className="text-white/70 text-sm">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Resources */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white text-center mb-8">Additional Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {resources.map((resource, index) => {
              const Icon = resource.icon
              return (
                <Link
                  key={index}
                  href={resource.href}
                  className="card text-center group hover:glow-emerald transition-all duration-300"
                >
                  <div className={`bg-${resource.color}-600/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <Icon className={`w-8 h-8 text-${resource.color}-400`} />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors duration-200">
                    {resource.title}
                  </h3>
                  <p className="text-white/70 text-sm mb-4">{resource.description}</p>
                  <div className="flex items-center justify-center gap-1 text-emerald-400 text-sm">
                    <span>Learn more</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="text-center card glow-emerald">
          <h2 className="text-2xl font-bold text-white mb-4">Still Need Help?</h2>
          <p className="text-white/70 mb-6">
            Our support team is standing by to help you with any questions or issues you might have.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn btn-primary glow-emerald">
              Start Live Chat
            </button>
            <Link
              href="mailto:support@formcraft.ai"
              className="btn btn-secondary"
            >
              Email Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
