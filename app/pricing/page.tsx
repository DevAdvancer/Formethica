import { Metadata } from 'next'
import Link from 'next/link'
import { Check, X, Star, Zap, Shield, Users, Sparkles } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Pricing - FORMETHICA',
  description: 'Choose the perfect plan for your form building needs. Start free and scale as you grow.',
}

const plans = [
  {
    name: 'Free',
    price: 'Free',
    period: 'forever',
    description: 'Perfect for getting started with form creation',
    features: [
      { name: 'Up to 3 form creations', included: true },
      { name: 'Unlimited submissions', included: true },
      { name: 'All form field types', included: true },
      { name: 'AI-powered suggestions', included: true },
      { name: 'Basic analytics', included: true },
      { name: 'Short URL sharing', included: true },
      { name: 'Export to Excel/CSV', included: true },
      { name: 'Form activation controls', included: true },
      { name: 'Email notifications', included: false },
      { name: 'Priority support', included: false },
      { name: 'Custom branding', included: false },
    ],
    cta: 'Start Creating Free',
    popular: false,
    currentPlan: true,
  },
  {
    name: 'Pro',
    price: 'Coming Soon',
    period: '',
    description: 'For power users who need more forms',
    features: [
      { name: 'Up to 30 form creations', included: true },
      { name: 'Unlimited submissions', included: true },
      { name: 'All form field types', included: true },
      { name: 'AI-powered suggestions', included: true },
      { name: 'Advanced analytics', included: true },
      { name: 'Email notifications', included: true },
      { name: 'Priority support', included: true },
      { name: 'Custom branding removal', included: true },
      { name: 'Form templates', included: true },
      { name: 'Advanced customization', included: true },
    ],
    cta: 'Coming Soon',
    popular: true,
    currentPlan: false,
  },
  {
    name: 'Max',
    price: 'Coming Soon',
    period: '',
    description: 'For teams and unlimited creativity',
    features: [
      { name: 'Up to 50 form creations', included: true },
      { name: 'Deletions don\'t affect limit', included: true },
      { name: 'Unlimited submissions', included: true },
      { name: 'All form field types', included: true },
      { name: 'AI-powered suggestions', included: true },
      { name: 'Email notifications', included: true },
      { name: 'Team collaboration', included: true },
      { name: 'White-label solution', included: true },
      { name: 'API access', included: true },
      { name: 'Dedicated support', included: true },
      { name: 'Custom integrations', included: true },
    ],
    cta: 'Coming Soon',
    popular: false,
    currentPlan: false,
  },
]

const faqs = [
  {
    question: 'What does "form creation" mean?',
    answer: 'Each time you create a new form, it counts towards your creation limit. This includes both new forms and duplicating existing ones.',
  },
  {
    question: 'What happens when I reach my creation limit?',
    answer: 'You\'ll need to upgrade to a higher plan to create more forms. Your existing forms will continue to work normally.',
  },
  {
    question: 'Do deleted forms count towards my limit?',
    answer: 'For Free and Pro plans, yes - once you create a form, it counts towards your limit even if deleted. Max plan users can delete forms without affecting their creation count.',
  },
  {
    question: 'Is AI really available for all plans?',
    answer: 'Yes! Our AI-powered form suggestions and chatbot assistance are available to all users, regardless of their plan.',
  },
  {
    question: 'When will Pro and Max plans be available?',
    answer: 'We\'re working hard to launch our paid plans soon. Stay tuned for updates! For now, enjoy all the features in our Free plan.',
  },
  {
    question: 'Will my forms be affected when paid plans launch?',
    answer: 'No, all your existing forms will continue to work exactly as they do now. You\'ll just have the option to upgrade for more creation slots.',
  },
]

export default function PricingPage() {
  return (
    <div className="page-content">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="solid-text-emerald">Simple</span>, <span className="solid-text-orange">Transparent</span> Pricing
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
            Start creating beautiful forms today with our free plan. More powerful options coming soon!
          </p>
          <div className="card max-w-2xl mx-auto glow-emerald">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Sparkles className="w-6 h-6 text-emerald-400" />
              <span className="text-lg font-semibold text-emerald-400">Currently Free for Everyone</span>
              <Sparkles className="w-6 h-6 text-emerald-400" />
            </div>
            <p className="text-white/70">
              Enjoy all our core features completely free while we prepare our premium plans.
              AI assistance included for all users!
            </p>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative card ${
                plan.popular
                  ? 'glow-emerald border-emerald-500/50'
                  : plan.currentPlan
                  ? 'glow-orange border-orange-500/50'
                  : 'border-gray-800'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-emerald-600 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    Most Popular
                  </span>
                </div>
              )}

              {plan.currentPlan && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-orange-600 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                    <Sparkles className="w-4 h-4" />
                    Current Plan
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2 text-white">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  {plan.period && <span className="text-white/60">/{plan.period}</span>}
                </div>
                <p className="text-white/70">{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature.name} className="flex items-center gap-3">
                    {feature.included ? (
                      <Check className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    ) : (
                      <X className="w-5 h-5 text-white/40 flex-shrink-0" />
                    )}
                    <span className={feature.included ? 'text-white' : 'text-white/40'}>
                      {feature.name}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-200 ${
                  plan.currentPlan
                    ? 'bg-orange-600 hover:bg-orange-700 text-white glow-orange'
                    : plan.popular
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white glow-emerald'
                    : plan.cta === 'Coming Soon'
                    ? 'bg-gray-700 text-white/60 cursor-not-allowed'
                    : 'btn btn-secondary'
                } ${plan.cta !== 'Coming Soon' ? 'cursor-pointer' : ''}`}
                disabled={plan.cta === 'Coming Soon'}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* AI Features Highlight */}
        <div className="mb-16">
          <div className="card glow-amber max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Sparkles className="w-8 h-8 text-amber-400" />
              <h2 className="text-3xl font-bold text-white">AI-Powered for Everyone</h2>
              <Sparkles className="w-8 h-8 text-amber-400" />
            </div>
            <p className="text-xl text-white/80 mb-8">
              Experience the future of form building with AI assistance available to all users, completely free!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-dark rounded-lg p-6">
                <Zap className="w-8 h-8 text-amber-400 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-white mb-2">Smart Suggestions</h3>
                <p className="text-white/70">Get intelligent field recommendations based on your form title and purpose</p>
              </div>
              <div className="glass-dark rounded-lg p-6">
                <Users className="w-8 h-8 text-amber-400 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-white mb-2">AI Chatbot</h3>
                <p className="text-white/70">Ask questions and get instant help with form creation and optimization</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Comparison */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-white">Why Choose <span className="solid-text-emerald">FORMETHICA</span>?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card text-center glow-emerald">
              <div className="bg-emerald-600/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Lightning Fast</h3>
              <p className="text-white/70">
                Create and deploy forms in minutes with our intuitive glassmorphism interface and AI assistance.
              </p>
            </div>
            <div className="card text-center glow-orange">
              <div className="bg-orange-600/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-orange-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Secure & Reliable</h3>
              <p className="text-white/70">
                Enterprise-grade security with user authentication and secure data collection for peace of mind.
              </p>
            </div>
            <div className="card text-center glow-amber">
              <div className="bg-amber-600/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-amber-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">AI-Enhanced</h3>
              <p className="text-white/70">
                Smart form building with AI suggestions and assistance available to all users, completely free.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-white">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="card"
              >
                <h3 className="text-lg font-semibold mb-2 text-white">{faq.question}</h3>
                <p className="text-white/70">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="card glow-emerald max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-white">Ready to Start Creating?</h2>
            <p className="text-white/80 mb-8 text-lg">
              Join thousands of users who trust <span className="solid-text-emerald">FORMETHICA</span> for their form building needs.
              Start creating beautiful forms today with AI assistance!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/signup"
                className="btn btn-primary text-lg px-10 py-4 glow-emerald"
              >
                Start Creating Free
              </Link>
              <Link
                href="/contact"
                className="btn btn-secondary text-lg px-10 py-4"
              >
                Contact Us
              </Link>
            </div>
            <p className="text-sm text-white/60 mt-6">
              No credit card required • AI assistance included • Get started in seconds
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
