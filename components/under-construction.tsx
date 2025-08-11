'use client'

import Link from 'next/link'
import { ArrowLeft, Construction, Clock, Home } from 'lucide-react'

interface UnderConstructionProps {
  pageName?: string
  estimatedCompletion?: string
  showHomeButton?: boolean
}

export default function UnderConstruction({
  pageName = "This Page",
  estimatedCompletion,
  showHomeButton = true
}: UnderConstructionProps) {
  return (
    <div className="page-content flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl mx-auto text-center w-full">
        {/* Back Button */}
        <div className="mb-8">
          <button
            onClick={() => window.history.back()}
            className="btn btn-secondary inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>

        {/* Main Content */}
        <div className="card glow-orange max-w-xl mx-auto">
          {/* Construction Icon */}
          <div className="bg-orange-600/20 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <Construction className="w-12 h-12 text-orange-400" />
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Under Construction
          </h1>

          {/* Description */}
          <p className="text-xl text-white/80 mb-6">
            {pageName} is currently being built. We're working hard to bring you an amazing experience!
          </p>

          {/* Estimated Completion */}
          {estimatedCompletion && (
            <div className="glass-dark rounded-lg p-4 mb-6">
              <div className="flex items-center justify-center gap-2 text-emerald-400 mb-2">
                <Clock className="w-5 h-5" />
                <span className="font-semibold">Estimated Completion</span>
              </div>
              <p className="text-white/70">{estimatedCompletion}</p>
            </div>
          )}

          {/* Progress Animation */}
          <div className="mb-8">
            <div className="bg-gray-700 rounded-full h-2 mb-2">
              <div className="bg-gradient-to-r from-emerald-500 to-orange-500 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
            </div>
            <p className="text-sm text-white/60">Work in progress...</p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {showHomeButton && (
              <Link
                href="/"
                className="btn btn-primary glow-emerald inline-flex items-center gap-2"
              >
                <Home className="w-4 h-4" />
                Go to Homepage
              </Link>
            )}

            <Link
              href="/contact"
              className="btn btn-secondary"
            >
              Contact Us
            </Link>
          </div>

          {/* Additional Info */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <p className="text-white/60 text-sm">
              Want to be notified when this page is ready?
              <Link href="/contact" className="text-emerald-400 hover:text-emerald-300 ml-1">
                Get in touch
              </Link>
            </p>
          </div>
        </div>

        {/* Features Coming Soon */}
        <div className="mt-12 mb-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card text-center">
            <div className="w-12 h-12 bg-emerald-600/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-emerald-400 text-xl">🚀</span>
            </div>
            <h3 className="text-white font-semibold mb-2">New Features</h3>
            <p className="text-white/60 text-sm">Exciting new functionality coming your way</p>
          </div>

          <div className="card text-center">
            <div className="w-12 h-12 bg-orange-600/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-orange-400 text-xl">⚡</span>
            </div>
            <h3 className="text-white font-semibold mb-2">Better Performance</h3>
            <p className="text-white/60 text-sm">Faster loading and improved user experience</p>
          </div>

          <div className="card text-center">
            <div className="w-12 h-12 bg-amber-600/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-amber-400 text-xl">🎨</span>
            </div>
            <h3 className="text-white font-semibold mb-2">Enhanced Design</h3>
            <p className="text-white/60 text-sm">Beautiful new interface and better usability</p>
          </div>
        </div>
      </div>
    </div>
  )
}
