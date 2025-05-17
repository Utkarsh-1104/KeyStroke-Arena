"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { KeyboardIcon, UserIcon, LockIcon, MailIcon } from "lucide-react"
import axios from "axios"

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  })
  const router = useRouter()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (isLogin) {
      try {
        const response = await axios.post("http://localhost:4000/login", {
          email: formData.email,
          password: formData.password,
        })

        if (response.data.status !== 200) {
          alert(response.data.message)
          return
        }

        localStorage.setItem("token", response.data.token)
        localStorage.setItem("user", JSON.stringify(response.data.user))

        alert("Login successful")
        router.push(`/test/?`)
      } catch (error) {
        alert("Error logging in")
      }
    } else {
      try {
        const response = await axios.post("http://localhost:4000/signup", {
          email: formData.email,
          username: formData.username,
          password: formData.password,
        })

        if (response.data.status !== 200) {
          alert(response.data.message)
          return
        }

        localStorage.setItem("token", response.data.token)
        localStorage.setItem("user", JSON.stringify(response.data.user))

        alert("Account created successfully")
        router.push("/test")

      } catch (error) {
        alert("Error creating account")
      }

    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center px-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-center mb-6">
          <KeyboardIcon className="h-12 w-12 text-green-400" />
        </div>

        <h1 className="text-2xl font-bold text-center text-white mb-6">
          {isLogin ? "Login to Your Account" : "Create an Account"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MailIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="bg-gray-700 text-white pl-10 block w-full rounded-md border-gray-600 focus:border-green-500 focus:ring-green-500 py-2"
                placeholder="you@example.com"
              />
            </div>
          </div>

          {!isLogin && (
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  className="bg-gray-700 text-white pl-10 block w-full rounded-md border-gray-600 focus:border-green-500 focus:ring-green-500 py-2"
                  placeholder="speedtyper123"
                />
              </div>
            </div>
          )}

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="bg-gray-700 text-white pl-10 block w-full rounded-md border-gray-600 focus:border-green-500 focus:ring-green-500 py-2"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer bg-green-500 hover:bg-green-900 text-white font-medium py-2 px-4 rounded-md transition-colors"
          >
            {isLogin ? "Sign In" : "Sign Up"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button onClick={() => setIsLogin(!isLogin)} className="text-green-400 hover:text-green-200 cursor-pointer text-sm">
            {isLogin ? "Need an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>

        <div className="mt-4 text-center">
          <Link href="/" className="text-gray-400 hover:text-gray-300 text-sm">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
