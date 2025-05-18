"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { KeyboardIcon, TrendingUpIcon, BarChart2Icon, CalendarIcon, CheckCircleIcon } from "lucide-react"
import axios from "axios"

export default function ProfilePage() {
  const [currentUser, setCurrentUser] = useState(null)
  const [testHistory, setTestHistory] = useState([])
  const [averageWpm, setAverageWpm] = useState(0)
  const [averageAccuracy, setAverageAccuracy] = useState(0)
  const [bestWpm, setBestWpm] = useState(0)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem("user"))
    if (!user) {
      router.push("/login")
      return
    }

    setCurrentUser(user)

    async function fetchTestResults(id) {

      const res = await axios.post("http://localhost:4000/getresults", {
        userId: id,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })

      if (res.data.status === 200) {
        const results = res.data.results
        setTestHistory(results)
      } else {
        alert("Error fetching test results:")
      }

      const history = res.data.results || []
      const sortedHistory = [...history].sort((a, b) => new Date(b.date) - new Date(a.date))
      setTestHistory(sortedHistory)
  
      // Calculate statistics
      if (history.length > 0) {
        const totalWpm = history.reduce((sum, test) => sum + test.wpm, 0)
        const totalAccuracy = history.reduce((sum, test) => sum + test.accuracy, 0)
        const highestWpm = Math.max(...history.map((test) => test.wpm))
  
        setAverageWpm(Math.round(totalWpm / history.length))
        setAverageAccuracy(Math.round(totalAccuracy / history.length))
        setBestWpm(highestWpm)
      }
    }
      
    fetchTestResults(user._id)

    // Get test history and sort by date (newest first)
  }, [router])

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    router.push("/")
  }

  if (!testHistory || !currentUser) {
    return <div className="min-h-screen bg-gray-900 flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <KeyboardIcon className="h-8 w-8 text-green-400" />
            <span className="ml-2 text-xl font-bold">KeyStroke-Arena</span>
          </Link>

          <div className="flex items-center space-x-6">
            <Link href="/test" className="hover:text-green-400 transition-colors">
              Take Test
            </Link>
            <button
              onClick={handleLogout}
              className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        {/* User profile header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">{currentUser.username}'s Profile</h1>
          <p className="text-gray-300">{currentUser.email}</p>
        </div>

        {/* Stats overview */}
        <div className="max-w-4xl mx-auto mb-10">
          <h2 className="text-2xl font-bold mb-6">Your Statistics</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-800 rounded-lg p-6 flex flex-col items-center">
              <div className="bg-green-500 p-3 rounded-full mb-4">
                <BarChart2Icon className="h-6 w-6" />
              </div>
              <div className="text-3xl font-bold mb-1">{averageWpm}</div>
              <div className="text-gray-300">Average WPM</div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 flex flex-col items-center">
              <div className="bg-green-500 p-3 rounded-full mb-4">
                <TrendingUpIcon className="h-6 w-6" />
              </div>
              <div className="text-3xl font-bold mb-1">{bestWpm}</div>
              <div className="text-gray-300">Best WPM</div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 flex flex-col items-center">
              <div className="bg-green-500 p-3 rounded-full mb-4">
                <CheckCircleIcon className="h-6 w-6" />
              </div>
              <div className="text-3xl font-bold mb-1">{averageAccuracy}%</div>
              <div className="text-gray-300">Average Accuracy</div>
            </div>
          </div>
        </div>

        {/* Test history */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Test History</h2>

          {testHistory.length === 0 ? (
            <div className="bg-gray-800 rounded-lg p-8 text-center">
              <p className="text-gray-300 mb-4">You haven't taken any tests yet.</p>
              <Link
                href="/test"
                className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-6 rounded-md transition-colors inline-block"
              >
                Take Your First Test
              </Link>
            </div>
          ) : (
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-700">
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        WPM
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Accuracy
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Duration
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {testHistory.map((test) => (
                      <tr key={test._id} className="hover:bg-gray-700">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <CalendarIcon className="h-4 w-4 text-gray-400 mr-2" />
                            <span>{formatDate(test.date)}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-green-400 font-medium">{test.wpm}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={
                              test.accuracy >= 90
                                ? "text-green-400"
                                : test.accuracy >= 70
                                  ? "text-yellow-400"
                                  : "text-red-400"
                            }
                          >
                            {test.accuracy}%
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">30 s</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {testHistory.length > 0 && (
            <div className="mt-6 text-center">
              <Link
                href="/test"
                className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-6 rounded-md transition-colors inline-block"
              >
                Take Another Test
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
