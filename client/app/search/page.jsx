'use client'

import axios from 'axios'
import { KeyboardIcon, User } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const SearchUsers = () => {

    const [username, setUsername] = React.useState("")
    const [userList, setUserList] = React.useState([])

    React.useEffect(() => {
        async function fetchUsers() {
            const res = await axios.get(`http://localhost:4000/getusers?username=${username}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })

            if (res.data.status === 200) {

                setUserList(res.data.users)
            } else {
                alert("Error fetching users.")
            }

        }
        if (username.length > 0) {
            fetchUsers()
        } else {
            setUserList([])
        }
    }, [username])

    const handleLogout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        router.push("/")
    }
    return (
    <div className='min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white'>
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

        <div className="container mx-auto px-6 py-10">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold mb-5">Search user's to see their performance!</h1>
                <form className='flex flex-col items-center justify-center gap-2' action="">
                    <input type="text" onChange={(e) => {setUsername(e.target.value)}} placeholder='Search by username' className='bg-gray-700 text-white px-4 py-2 rounded-md' />
                </form>
            </div>
        </div>

        {username === "" ? (
            <div className="bg-gray-800 rounded-lg max-w-4xl p-6 mx-auto mt-4">
                <p className="text-gray-400 text-center">Please enter a username to search.</p>
            </div>
        ) : (
            <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold">User Details</h2>

                {userList.length === 0 && (
                    <div className="bg-gray-800 rounded-lg p-6 mt-4">
                        <p className="text-gray-400 text-center">No users found.</p>
                    </div>
                )}
                <div className="bg-gray-800 rounded-lg mt-8 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                    <tbody className="divide-y divide-gray-700">
                        {userList.map((user) => (
                        <tr key={user._id} className="hover:bg-gray-700">
                            <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                                <User className="h-4 w-4 text-gray-400 mr-2" />
                                <span>{user.username}</span>
                            </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-green-400 font-medium">{user.email}</span>
                            </td>

                            <td className="py-4 flex items-center justify-center whitespace-nowrap">
                                <button className='bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-6 rounded-md transition-colors cursor-pointer'>Visit Profile</button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
                </div>
            </div>
        )
    }
        

    </div>
    )
}

export default SearchUsers