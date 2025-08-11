import { Metadata } from 'next'
import Link from 'next/link'
import { Mail, Phone, MapPin, Clock, MessageCircle, Send, ArrowLeft } from 'lucide-react'
import ContactForm from '@/components/contact-form'

export const metadata: Metadata = {
  title: 'Contact Us - Formethica',
  description: 'Get in touch with the Formethica team. We\'re here to help with any questions or support you need.',
}

const contactMethods = [
  {
    icon: Mail,
    title: 'Email Support',
    description: 'Send us a message and we\'ll respond within 24 hours',
    contact: 'theabhirupkumar@gmail.com',
    href: 'mailto:theabhirupkumar@gmail.com',
    color: 'green',
  },
  {
    icon: Phone,
    title: 'Phone Support',
    description: 'Speak directly with our team',
    contact: '+91 8250772855',
    href: 'tel:+918250772855',
    color: 'orange',
  },
]

const offices = [
  {
    city: 'Kolkata',
    address: 'Barasat, West Bengal',
    zipcode: '700001',
    phone: '+91 8250772855',
    email: 'theabhirupkumar@gmail.com',
  }
]

export default function ContactPage() {
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
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Contact Us</h1>
          <p className="text-lg text-white/60">
            Have a question or need help? We're here to assist you.
            Reach out to us through any of the channels below.
          </p>
        </div>

        <div className="space-y-8">
          {/* Contact Methods */}
          <div className="card">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-6">Get in Touch</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {contactMethods.map((method, index) => {
                const Icon = method.icon
                const colorClasses = {
                  green: 'bg-green-600/20 text-green-400',
                  orange: 'bg-orange-600/20 text-orange-400',
                }
                return (
                  <a
                    key={index}
                    href={method.href}
                    className="glass-dark rounded-lg p-6 text-center hover:bg-white/5 transition-all duration-200 group"
                  >
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${colorClasses[method.color as keyof typeof colorClasses]}`}>
                      <Icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-base md:text-lg font-semibold mb-2 text-white group-hover:text-emerald-400 transition-colors duration-200">
                      {method.title}
                    </h3>
                    <p className="text-white/60 text-xs md:text-sm mb-3">{method.description}</p>
                    <p className="text-white font-medium text-sm md:text-base break-all">{method.contact}</p>
                  </a>
                )
              })}
            </div>
          </div>

          {/* Contact Form */}
          <div className="card">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-6">Send us a Message</h2>
            <ContactForm />
          </div>

          {/* Support Hours */}
          <div className="card">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-6">Support Information</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-emerald-400" />
                <div>
                  <p className="font-medium text-white text-sm md:text-base">Support Hours</p>
                  <p className="text-white/60 text-xs md:text-sm">Monday - Friday: 10AM - 5PM IST</p>
                  <p className="text-white/60 text-xs md:text-sm">Weekend: 10AM - 4PM IST</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-green-400" />
                <div>
                  <p className="font-medium text-white text-sm md:text-base">Response Time</p>
                  <p className="text-white/60 text-xs md:text-sm">We typically respond within 24 hours</p>
                </div>
              </div>
            </div>
          </div>

          {/* Office Locations */}
          <div className="card">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-6">Our Offices</h2>
            <div className="space-y-4">
              {offices.map((office, index) => (
                <div
                  key={index}
                  className="glass-dark rounded-lg p-4"
                >
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-emerald-400 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1 text-white text-sm md:text-base">{office.city}</h4>
                      <p className="text-white/60 text-xs md:text-sm mb-1">{office.address}</p>
                      <p className="text-white/60 text-xs md:text-sm mb-2">{office.zipcode}</p>
                      <div className="flex flex-col gap-1 text-xs md:text-sm">
                        <a
                          href={`tel:${office.phone.replace(/\s/g, '')}`}
                          className="text-emerald-400 hover:text-emerald-300 transition-colors duration-200"
                        >
                          {office.phone}
                        </a>
                        <a
                          href={`mailto:${office.email}`}
                          className="text-emerald-400 hover:text-emerald-300 transition-colors duration-200"
                        >
                          {office.email}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ Link */}
          <div className="card">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4">Looking for Quick Answers?</h2>
            <p className="text-white/60 mb-6 text-sm md:text-base">
              Check out our help center for instant answers to common questions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/help"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg transition-colors duration-200 text-center text-sm md:text-base font-medium"
              >
                Visit Help Center
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
