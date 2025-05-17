"use client"

import { useState } from "react"
import Link from "next/link"
import { KeyboardIcon, BarChartIcon, TrophyIcon, UserIcon } from "lucide-react"

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <KeyboardIcon className="h-8 w-8 text-green-400" />
            <span className="ml-2 text-xl font-bold">KeyStroke-Arena</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="hover:text-green-400 transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="hover:text-green-400 transition-colors">
              How It Works
            </a>
            <Link href="/login" className="bg-green-500 hover:bg-green-900 px-4 py-2 rounded-md transition-colors">
              Login / Sign Up
            </Link>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="focus:outline-none">
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                  />
                ) : (
                  <path
                    fillRule="evenodd"
                    d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-4">
            <a href="#features" className="block hover:text-green-400 transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="block hover:text-green-400 transition-colors">
              How It Works
            </a>
            <Link
              href="/login"
              className="block bg-green-500 hover:bg-green-900 px-4 py-2 rounded-md transition-colors text-center"
            >
              Login / Sign Up
            </Link>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 text-center">
        <h1 className="text-5xl font-bold mb-6">Master Your Typing Skills</h1>
        <p className="text-xl mb-10 max-w-2xl mx-auto">
          Test your typing speed and accuracy with KeyStroke-Arena. Track your progress and become a typing champion!
        </p>
        <Link
          href="/login"
          className="bg-green-500 hover:bg-green-900 px-8 py-3 rounded-lg text-lg font-semibold transition-colors inline-block"
        >
          Start Typing Now
        </Link>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-center h-16 w-16 bg-green-500 rounded-full mx-auto mb-4">
              <BarChartIcon className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold text-center mb-2">Real-time Stats</h3>
            <p className="text-gray-300 text-center">
              Get instant feedback on your typing speed (WPM) and accuracy as you type.
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-center h-16 w-16 bg-green-500 rounded-full mx-auto mb-4">
              <TrophyIcon className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold text-center mb-2">Track Progress</h3>
            <p className="text-gray-300 text-center">
              View your typing history and see how your skills improve over time.
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-center h-16 w-16 bg-green-500 rounded-full mx-auto mb-4">
              <UserIcon className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold text-center mb-2">Personal Profile</h3>
            <p className="text-gray-300 text-center">
              Create your account to save your results and access them from anywhere.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row items-center mb-10">
            <div className="bg-gray-700 rounded-full h-12 w-12 flex items-center justify-center text-2xl font-bold mb-4 md:mb-0 md:mr-6">
              1
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Sign Up for an Account</h3>
              <p className="text-gray-300">Create your free account to start tracking your typing progress.</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center mb-10">
            <div className="bg-gray-700 rounded-full h-12 w-12 flex items-center justify-center text-2xl font-bold mb-4 md:mb-0 md:mr-6">
              2
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Take the 30-Second Test</h3>
              <p className="text-gray-300">
                Type the displayed text as quickly and accurately as you can within 30 seconds.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center">
            <div className="bg-gray-700 rounded-full h-12 w-12 flex items-center justify-center text-2xl font-bold mb-4 md:mb-0 md:mr-6">
              3
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">View Your Results</h3>
              <p className="text-gray-300">
                See your WPM, accuracy, and track your improvement over time in your profile.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-600 py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Test Your Skills?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of users who are improving their typing speed and accuracy with KeyStroke-Arena.
          </p>
          <Link
            href="/login"
            className="bg-white text-green-600 hover:bg-gray-300 px-8 py-3 rounded-lg text-lg font-semibold transition-colors inline-block"
          >
            Get Started Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <KeyboardIcon className="h-6 w-6 text-green-400" />
            <span className="ml-2 text-lg font-bold">KeyStroke-Arena</span>
          </div>
          <div className="text-gray-400 text-sm">
            © {new Date().getFullYear()} KeyStroke-Arena. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
