import ApexChart from '@/components/ApexChart'
import React from 'react'

const BottomChartSection = () => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4'>
        <div className='flex flex-col items-center p-4 rounded shadow bg-white'>
          <div className='text-lg sm:text-2xl font-bold text-gray-700 mb-2'>Total Students</div>
          <div className='text-3xl sm:text-4xl font-bold text-gray-700 mb-4'>1000</div>
                      <div className="w-full max-w-[300px] sm:max-w-[280px]">
              <ApexChart series={[12, 38, 55, 42, 78,24,34,73,73,23,43,54,65,76,87,98,100]} />
            </div>
        </div>
        
        <div className='flex flex-col items-center p-4 rounded shadow bg-white'>
          <div className='text-lg sm:text-2xl font-bold text-gray-700 mb-2'>Total Students</div>
          <div className='text-3xl sm:text-4xl font-bold text-gray-700 mb-4'>1000</div>
          <div className="w-full max-w-[300px] sm:max-w-[280px]">
            <ApexChart series={[34, 23,]} />
          </div>
        </div>
        
        <div className='flex flex-col items-center p-4 rounded shadow bg-white sm:col-span-2 xl:col-span-1'>
          <div className='text-lg sm:text-2xl font-bold text-gray-700 mb-2'>Total Students</div>
          <div className='text-3xl sm:text-4xl font-bold text-gray-700 mb-4'>1000</div>
          <div className="w-full max-w-[300px] sm:max-w-[280px]">
            <ApexChart series={[78, 45, 92, 33, 67,74,24]} />
          </div>
        </div>
      </div>
  )
}

export default BottomChartSection