"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { KeyboardIcon, ClockIcon } from "lucide-react"
import axios from "axios"

// Sample paragraphs for typing test
const sampleTexts = [
  "Traversing the labyrinthine corridors of the abandoned estate required not only unwavering concentration but also a profound sense of orientation, as every shadow concealed the potential for misdirection and each creaking floorboard threatened to shatter the fragile silence that lingered like an unspoken warning. The air was thick with the scent of forgotten memories, and despite the absence of any visible danger, an intangible tension wrapped itself around every thought begin interest while public or where see time those increase interest be give end think seem small as both another a child same eye you between way do who into again good we would interest with world so order or run more open that large write turn never over open each.",

  "pressing inward with invisible weig want as while with of order child about school thing never hold find order each too between program work end you home place around while place problem end begin interest while public or where see time those increase interest be give end think seem small as both another a child same eye you between way do who into again good fact than under very head become real possible some write know however late each that with because that place nation only for each change form consider we such interest feel word right again how about system such between late want fact up problem stand new say move a lead small however large public out by eye here over so be too now off would in this course present order.",

  "Type change to from people high during people find to however into small new general it do that could old for last get another hand much eye great no work and with but good there last think can around use like number never since world need what we around part show new come seem while some and since still small these you general which seem will place come order form how about just also they with state late use both early too lead general seem there point take general seem few out like might under if ask while such interest feel word right again how about system such between late want fact up problem stand new say move a lead small however large public out by eye here over so be way use like say people work for since interest so face.",

  "Problem between long as there school do as mean to all on other good may from might call world thing life turn of he look last problem after get show want need thing old other during be again develop come from consider the now number say life interest to system only group world same state school one problem between for turn run at very against eye must go both still all a as so after play eye little be those should out after which these both much house become both school this he real and may mean time by real number other as feel at end ask plan come turn by all head increase he present increase use stand after see order lead than system here ask in under because about show face child know person large program how over could thing from out.",
]

export default function TestPage() {
  const [currentUser, setCurrentUser] = useState({})
  const [text, setText] = useState("")
  const [userInput, setUserInput] = useState("")
  const [timer, setTimer] = useState(30)
  const [isActive, setIsActive] = useState(false)
  const [isFinished, setIsFinished] = useState(false)
  const [wpm, setWpm] = useState(0)
  const [accuracy, setAccuracy] = useState(0)
  const [startTime, setStartTime] = useState(null)
  const inputRef = useRef(null)
  const router = useRouter()

  // Load user data and set random text
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    if (!user) {
      router.push("/login")
      return
    }
    setCurrentUser(user)

    // Set random text from sample texts
    const randomIndex = Math.floor(Math.random() * sampleTexts.length)
    setText(sampleTexts[randomIndex])
  }, [router])

  // Timer logic
  useEffect(() => {
    let interval = null

    if (isActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1)
      }, 1000)
    } else if (timer === 0 && isActive) {
      clearInterval(interval)
      endTest()
    }

    return () => clearInterval(interval)
  }, [isActive, timer])

  // Start the test
  const startTest = () => {
    setIsActive(true)
    setStartTime(Date.now())
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  // End the test and calculate results
  const endTest = async () => {
    setIsActive(false)
    setIsFinished(true)

    // Calculate WPM
    const timeInMinutes = (30 - timer) / 60
    const wordsTyped = userInput.trim().split(/\s+/).length
    const calculatedWpm = Math.round(wordsTyped / timeInMinutes)
    setWpm(calculatedWpm)

    // Calculate accuracy
    let correctChars = 0
    const userInputChars = userInput.split("")
    const textChars = text.substring(0, userInput.length).split("")

    userInputChars.forEach((char, index) => {
      if (index < textChars.length && char === textChars[index]) {
        correctChars++
      }
    })

    const calculatedAccuracy = Math.round((correctChars / userInput.length) * 100)
    setAccuracy(calculatedAccuracy)

    const res = await axios.post("http://localhost:4000/saveresult", {
      userId: currentUser._id,
      wpm: calculatedWpm,
      accuracy: calculatedAccuracy,
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    
    if (res.data.status !== 200) {
      alert("Error saving test result")
      return
    }
    alert("Test result saved successfully")

    // Save test results
    // if (currentUser) {
      // const testResult = {
      //   id: Date.now().toString(),
      //   date: new Date().toISOString(),
      //   wpm: calculatedWpm,
      //   accuracy: calculatedAccuracy,
      //   duration: 30 - timer,
      // }

      // const users = JSON.parse(localStorage.getItem("users") || "[]")
      // const updatedUsers = users.map((user) => {
      //   if (user.id === currentUser.id) {
      //     return {
      //       ...user,
      //       testHistory: [...(user.testHistory || []), testResult],
      //     }
      //   }
      //   return user
      // })

      //localStorage.setItem("users", JSON.stringify(updatedUsers))

      // // Update current user
      // const updatedUser = updatedUsers.find((user) => user.id === currentUser.id)
      // localStorage.setItem("currentUser", JSON.stringify(updatedUser))
      // setCurrentUser(updatedUser)
    
  }

  // Handle user input
  const handleInputChange = (e) => {
    if (!isActive && !isFinished) {
      startTest()
    }

    setUserInput(e.target.value)

    // Auto-end test if user types the entire text
    if (e.target.value === text) {
      endTest()
    }
  }

  // Reset the test
  const resetTest = () => {
    setUserInput("")
    setTimer(30)
    setIsActive(false)
    setIsFinished(false)
    setWpm(0)
    setAccuracy(0)

    // Set new random text
    const randomIndex = Math.floor(Math.random() * sampleTexts.length)
    setText(sampleTexts[randomIndex])
  }

  // Render characters with highlighting for correct/incorrect
  const renderText = () => {
    return text.split("").map((char, index) => {
      let className = ""

      if (index < userInput.length) {
        className = userInput[index] === char ? "text-green-400" : "text-red-400"
      }

      return (
        <span key={index} className={className}>
          {char}
        </span>
      )
    })
  }

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    router.push("/")
  }

  // if (!currentUser) {
  //   return <div className="min-h-screen bg-gray-900 flex items-center justify-center">Loading...</div>
  // }

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
            <Link href="/profile" className="hover:text-green-400 transition-colors">
              Profile
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
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Welcome, {currentUser.username}!</h1>
          <p className="text-gray-300">Ready to test your typing skills?</p>
        </div>

        {/* Test container */}
        <div className="max-w-3xl mx-auto bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gray-700 rounded-full px-6 py-2 flex items-center">
              <ClockIcon className="h-5 w-5 text-green-400 mr-2" />
              <span className="text-xl font-bold">{timer}s</span>
            </div>
          </div>

          {/* Text to type */}
          <div className="bg-gray-700 p-4 rounded-lg mb-6 text-lg leading-relaxed">{renderText()}</div>

          <div className="mb-6">
            <textarea
              ref={inputRef}
              value={userInput}
              onChange={handleInputChange}
              disabled={isFinished}
              className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none h-24"
              placeholder="Start typing here..."
            />
          </div>

          <div className="flex justify-center">
            {!isActive && !isFinished ? (
              <button
                onClick={startTest}
                className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-6 rounded-md transition-colors"
              >
                Start Test
              </button>
            ) : isFinished ? (
              <button
                onClick={resetTest}
                className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-6 rounded-md transition-colors"
              >
                Try Again
              </button>
            ) : (
              <button
                onClick={endTest}
                className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-6 rounded-md transition-colors"
              >
                End Test
              </button>
            )}
          </div>

          {isFinished && (
            <div className="mt-8 bg-gray-700 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-center mb-6">Your Results</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-800 p-4 rounded-lg flex flex-col items-center">
                  <div className="text-4xl font-bold text-green-400 mb-2">{wpm}</div>
                  <div className="text-gray-300">Words Per Minute</div>
                </div>

                <div className="bg-gray-800 p-4 rounded-lg flex flex-col items-center">
                  <div className="text-4xl font-bold text-green-400 mb-2">{accuracy}%</div>
                  <div className="text-gray-300">Accuracy</div>
                </div>
              </div>

              <div className="mt-6 flex justify-center">
                <Link
                  href="/profile"
                  className="bg-gray-600 hover:bg-gray-500 text-white font-medium py-2 px-6 rounded-md transition-colors"
                >
                  View History
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
