import React from 'react'
import Layout from '../../../../components/education/Layout'
import { FaUser } from 'react-icons/fa'
import { useRouter } from 'next/navigation'

const FeeSearch = () => {
  const router = useRouter()
  return (
    <Layout>
      <div className="bg-gray-100 min-h-screen p-4">

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col sm:items-center sm:justify-between">
            <h1 className="text-2xl font-bold text-gray-800">Search Student</h1>
            <div className='flex w-full mx-auto justify-center my-3'>
              <input type="text" placeholder="Search by Roll no./Name/Father's Name" className='bg-gray-200 rounded-full p-3 px-6 mx-5 w-full sm:max-w-2xl outline-blue-300 ' />
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full flex items-center gap-2 cursor-pointer hover:scale-105 transition-colors duration-300">
                Search
              </button>
            </div>
          </div>
        </div>


        {/* Student Basic Info Card */}
        <div onClick={()=>router.push('/(education)/fee/1002445')} className="bg-white hover:shadow-lg cursor-pointer hover:bg-gray-300 transition-shadow duration-300 rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Student Photo */}
            <div className="lg:w-1/4">
              <div className="bg-gray-200 rounded-lg w-48 h-48 mx-auto lg:mx-0 flex items-center justify-center">
                <FaUser className="text-6xl text-gray-400" />
              </div>
              <div className="text-center lg:text-left mt-4">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium `}>
                  Male
                </span>
              </div>
            </div>

            {/* Basic information  */}
            <div className="lg:w-3/4">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b-2 border-blue-200 pb-2">
                Basic Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: 'Full Name', value: 'Rajesh Kumar' },
                  { label: 'Course Name', value: '12th' },
                  { label: 'Registration Number', value: '1002445' },
                  { label: 'Session', value: '2024-25' },
                  { label: 'Date of Birth', value: '10 October 2018' },
                  { label: 'Mobile Number', value: '9554833028' },
                  { label: 'Father\'s Name', value: 'RAJESH KUMAR' },
                  { label: 'Mother\'s Details', value: 'Priya' }
                ].map((field, index) => (
                  <div key={index}>
                    <label className="block text-sm font-medium text-gray-600">{field.label}</label>
                    <p className="text-lg font-semibold text-gray-800">{field.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default FeeSearch