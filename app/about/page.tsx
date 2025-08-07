import { Metadata } from 'next'
import Link from 'next/link'
import { Users, Target, Heart, Award, ArrowRight, ArrowLeft, Linkedin, Twitter, Mail } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Us - Formethica',
  description: 'Learn about Formethica\'s mission to make form building simple, intelligent, and accessible for everyone.',
}

const team = [
  {
    name: 'Abhirup Kumar',
    role: 'Lead Developer & Founder',
    bio: 'Passionate about creating tools that make developers\' lives easier. 2+ years of experience in web development and product design.',
    image: '/team/abhirup.jpg',
    social: {
      linkedin: 'https://linkedin.com/in/abhirupkumar',
      twitter: 'https://x.com/devadvancer',
      email: 'theabhirupkumar@gmail.com',
    },
  }
]

const values = [
  {
    icon: Users,
    title: 'User-Centric',
    description: 'We put our users at the center of everything we do, creating tools that solve real problems and make work easier.',
  },
  {
    icon: Target,
    title: 'Innovation',
    description: 'We constantly push the boundaries of what\'s possible, leveraging AI and modern technology to create better solutions.',
  },
  {
    icon: Heart,
    title: 'Simplicity',
    description: 'We believe powerful tools should be simple to use. Complexity should be hidden behind intuitive interfaces.',
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'We strive for excellence in everything we build, from code quality to customer support and user experience.',
  },
]

const stats = [
  { number: '50+', label: 'Active Users' },
  { number: '10+', label: 'Forms Created' },
  { number: '25+', label: 'Submissions Processed' },
  { number: '90.09%', label: 'Uptime' },
]

export default function AboutPage() {
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
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            About Formethica
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            We're on a mission to make form building simple, intelligent, and accessible
            for everyone. From solo entrepreneurs to enterprise teams, we help you create
            better forms faster.
          </p>
        </div>

        {/* Mission Section */}
        <div className="mb-16">
          <div className="card glow-emerald">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
              <p className="text-lg text-white/80 max-w-4xl mx-auto">
                To democratize form building by providing powerful, AI-enhanced tools that
                anyone can use to create professional, high-converting forms without technical expertise.
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="card text-center">
                <div className="text-3xl md:text-4xl font-bold text-emerald-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-white/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <div
                  key={index}
                  className="card text-center glow-emerald"
                >
                  <div className="bg-emerald-600/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">{value.title}</h3>
                  <p className="text-white/70 text-sm">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Team */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Meet Our Team</h2>
          <div className="flex justify-center items-center">
            <div className="max-w-sm w-full">
              {team.map((member, index) => (
              <div
                key={index}
                className="card text-center hover:glow-orange transition-all duration-300"
              >
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-12 h-12 text-gray-500" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">{member.name}</h3>
                <p className="text-emerald-400 text-sm mb-3">{member.role}</p>
                <p className="text-white/70 text-sm mb-4">{member.bio}</p>
                <div className="flex justify-center gap-3">
                  <a
                    href={member.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/60 hover:text-emerald-400 transition-colors duration-200"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href={member.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/60 hover:text-emerald-400 transition-colors duration-200"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                  <a
                    href={`mailto:${member.social.email}`}
                    className="text-white/60 hover:text-emerald-400 transition-colors duration-200"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
        </div>

        {/* Story */}
        <div className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="card">
              <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
              <div className="space-y-4 text-white/70">
                <p>
                  Formethica was born out of frustration with existing form builders that were
                  either too simple for professional use or too complex for everyday users.
                  As developers and designers, we knew there had to be a better way.
                </p>
                <p>
                  In 2025, we set out to create a form builder that would combine the power
                  of advanced features with the simplicity of drag-and-drop design. We wanted
                  to leverage AI to make form creation not just easier, but smarter.
                </p>
                <p>
                  Today, Formethica serves thousands of users worldwide, from solo entrepreneurs
                  to Fortune 500 companies. We're proud to be helping businesses collect data,
                  generate leads, and connect with their customers more effectively.
                </p>
              </div>
            </div>
            <div className="card glow-orange">
              <div className="aspect-video bg-gradient-to-br from-orange-900/20 to-amber-900/20 rounded-xl flex items-center justify-center">
                <span className="text-white/70">Company Story Image</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center card glow-emerald">
          <h2 className="text-2xl font-bold text-white mb-4">Join Our Journey</h2>
          <p className="text-white/70 mb-6">
            We're always looking for talented people who share our passion for creating
            exceptional user experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/careers"
              className="btn btn-primary glow-emerald inline-flex items-center justify-center gap-2"
            >
              View Open Positions
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="btn btn-secondary"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
