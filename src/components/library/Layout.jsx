import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

const Layout = ({children}) => {
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check auth and role from localStorage
    const token = localStorage.getItem('accessToken')
    const userRole = localStorage.getItem('userRole')?.toLowerCase()

    if (!token) {
      // Not authenticated - redirect to login
      router.replace('/login')
      return
    }

    if (userRole !== 'library') {
      // User doesn't have library role - redirect to their dashboard
      if (userRole) {
        router.replace(`/(${userRole})/dashboard`)
      } else {
        router.replace('/login')
      }
      return
    }

    setIsAuthorized(true)
    setIsLoading(false)
  }, [router])

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Only render if authorized
  if (!isAuthorized) {
    return null
  }

  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="bg-gray-100 rounded-tl-2xl p-2 md:p-3 pt-5 sm:pt-3 w-full lg:w-[calc(100%-230px)]">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Layout