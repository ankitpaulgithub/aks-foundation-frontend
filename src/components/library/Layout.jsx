import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

const Layout = ({children}  ) => {
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