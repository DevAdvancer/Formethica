'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Github, Twitter, Linkedin, Mail, Heart, ExternalLink } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const [email, setEmail] = useState('')
  const [isSubscribing, setIsSubscribing] = useState(false)
  const [subscriptionMessage, setSubscriptionMessage] = useState('')

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSubscribing(true)
    setSubscriptionMessage('')

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const result = await response.json()

      if (!response.ok) {
        setSubscriptionMessage(result.error || 'Something went wrong. Please try again.')
        return
      }

      setSubscriptionMessage('Thanks for subscribing! 🎉')
      setEmail('')
    } catch (error) {
      console.error('Subscription error:', error)
      setSubscriptionMessage('Something went wrong. Please try again.')
    } finally {
      setIsSubscribing(false)
    }
  }

  const footerLinks = {
    product: [
      { name: 'Features', href: '/#features' },
      { name: 'Pricing', href: '/pricing' },
    ],
    resources: [
      { name: 'Help Center', href: '/help' },
      { name: 'Blog', href: '/blog' },
    ],
    company: [
      { name: 'About', href: '/about' },
      { name: 'Contact', href: '/contact' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'GDPR', href: '/gdpr' },
    ],
  }

  const socialLinks = [
    { name: 'GitHub', href: 'https://github.com/devadvancer', icon: Github },
    { name: 'Twitter', href: 'https://x.com/devadvancer', icon: Twitter },
    { name: 'LinkedIn', href: 'https://linkedin.com/in/abhirupkumar', icon: Linkedin },
    { name: 'Email', href: 'mailto:theabhirupkumar@gmail.com', icon: Mail },
  ]

  return (
    <footer className="bg-gray-900/50 backdrop-blur-sm border-t border-gray-800/50 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center space-x-2 mb-4">
                <Image
                  src="/formethica-logo.svg"
                  alt="Formethica logo"
                  width={32}
                  height={32}
                  className="h-8 w-8"
                />
                <span className="text-xl font-bold text-white">Formethica</span>
              </Link>
              <p className="text-gray-400 text-sm mb-6 max-w-sm">
                Create beautiful, intelligent forms with AI-powered suggestions and advanced analytics.
                Build better forms, faster.
              </p>

              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target={social.href.startsWith('http') ? '_blank' : undefined}
                      rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-gray-400 hover:text-white transition-colors duration-200"
                      aria-label={social.name}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  )
                })}
              </div>
            </div>

            {/* Product Links */}
            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-3">
                {footerLinks.product.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Links */}
            <div>
              <h3 className="text-white font-semibold mb-4">Resources</h3>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="py-8 border-t border-gray-800/50">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-white font-semibold mb-2">Stay updated</h3>
              <p className="text-gray-400 text-sm">
                Get the latest updates on new features and form building tips.
              </p>
            </div>
            <form onSubmit={handleNewsletterSubmit} className="flex w-full md:w-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 md:w-64 px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-l-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isSubscribing}
              />
              <button
                type="submit"
                disabled={isSubscribing || !email}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-r-lg transition-colors duration-200 flex items-center"
              >
                {isSubscribing ? 'Subscribing...' : 'Subscribe'}
                <ExternalLink className="w-4 h-4 ml-2" />
              </button>
            </form>
            {subscriptionMessage && (
              <p className={`mt-2 text-sm ${subscriptionMessage.includes('Thanks') ? 'text-green-400' : 'text-red-400'}`}>
                {subscriptionMessage}
              </p>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-gray-800/50">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center text-gray-400 text-sm mb-4 md:mb-0">
              <span>© {currentYear} Formethica. All rights reserved.</span>
            </div>

            <div className="flex items-center space-x-6 text-sm">
              <Link
                href="/changelog"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                Version 0.0.1
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
