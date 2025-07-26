"use client"
import React from 'react'
import Layout from '../../../components/education/Layout'
import { FaCog, FaBirthdayCake, FaCommentDots, FaWhatsapp } from 'react-icons/fa';
import ApexChart from '../../../components/ApexChart';

const dashboardCards = [
  {
    icon: <FaCog className="text-2xl md:text-3xl text-white" />,
    label: "SESSION",
    value: <span className="text-xl md:text-2xl font-bold text-red-700">2025-26</span>,
    bg: "bg-sky-500",
    labelClass: "text-xs font-semibold text-white",
  },
  {
    icon: <FaBirthdayCake className="text-2xl md:text-3xl text-white" />,
    label: "TODAY'S BIRTHDAY",
    value: <span className="text-xl md:text-2xl font-bold text-white">0</span>,
    bg: "bg-red-400",
    labelClass: "text-xs font-semibold text-white",
  },
  {
    icon: <FaCommentDots className="text-2xl md:text-3xl text-white" />,
    label: "PENDING ENQUIRY",
    value: <span className="text-xl md:text-2xl font-bold text-yellow-900">10</span>,
    bg: "bg-yellow-400",
    labelClass: "text-xs font-semibold text-white",
  },
  {
    icon: <FaWhatsapp className="text-2xl md:text-3xl text-white" />,
    label: <span className="text-sm md:text-lg font-bold text-white">WA Bal.: 7252</span>,
    value: (
      <span className="block text-xs font-semibold text-white">
        WA BALANCE VALIDITY:<br />07 MAR 2026
      </span>
    ),
    bg: "bg-green-600",
    labelClass: "",
  },
];

const Dashboard = () => (
  <Layout>
    <div className="bg-gray-100 min-h-screen p-2 sm:p-4">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4 gap-2">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <h1 className="text-base sm:text-lg lg:text-xl font-semibold">
            Top School Management System in India
            <span className="ml-2 text-xs text-gray-500 font-normal">
              Digital School ERP Software 
            </span>
          </h1>
        </div>
      </div>

      {/* Top Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        {dashboardCards.map((card, idx) => (
          <div
            key={idx}
            className={`flex flex-row items-center p-3 sm:p-4 rounded shadow ${card.bg} min-h-[80px] sm:min-h-[100px]`}
          >
            <div className="mr-3 sm:mr-4">{card.icon}</div>
            <div className="flex-1">
              <div className={card.labelClass || "text-xs font-semibold text-gray-700"}>
                {card.label}
              </div>
              <div>{card.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Middle Section */}
      <div className='flex flex-col lg:flex-row gap-4 mb-6'>
        {/* Left side - Fee Collection Cards */}
        <div className='w-full lg:w-1/2'> 
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-2 sm:gap-4">
            {dashboardCards.map((card, idx) => (
              <div
                key={idx}
                className={`flex flex-col items-center text-center gap-2 p-3 sm:p-4 rounded shadow ${card.bg} min-h-[100px] sm:min-h-[120px]`}
              >
                <div className=""><FaBirthdayCake className="text-2xl sm:text-3xl text-white" /></div>
                <div>
                  <div className="text-xs font-semibold text-white">
                    Fee Collection
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {dashboardCards.map((card, idx) => (
              <div
                key={idx}
                className={`flex flex-col items-center text-center gap-2 p-3 sm:p-4 rounded shadow ${card.bg} min-h-[100px] sm:min-h-[120px]`}
              >
                <div className=""><FaBirthdayCake className="text-2xl sm:text-3xl text-white" /></div>
                <div>
                  <div className="text-xs font-semibold text-white">
                    Fee Collection
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right side - Chart */}
        <div className='w-full lg:w-1/2'>
          <div className='flex flex-col items-center p-4 rounded shadow bg-white'>
            <div className='text-lg sm:text-2xl font-bold text-gray-700 mb-2'>Total Students</div>
            <div className='text-3xl sm:text-4xl font-bold text-gray-700 mb-4'>1000</div>
            <div className="w-full max-w-[300px] sm:max-w-[330px]">
              <ApexChart />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Charts Section */}
      <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4'>
        <div className='flex flex-col items-center p-4 rounded shadow bg-white'>
          <div className='text-lg sm:text-2xl font-bold text-gray-700 mb-2'>Total Students</div>
          <div className='text-3xl sm:text-4xl font-bold text-gray-700 mb-4'>1000</div>
          <div className="w-full max-w-[300px] sm:max-w-[280px]">
            <ApexChart />
          </div>
        </div>
        
        <div className='flex flex-col items-center p-4 rounded shadow bg-white'>
          <div className='text-lg sm:text-2xl font-bold text-gray-700 mb-2'>Total Students</div>
          <div className='text-3xl sm:text-4xl font-bold text-gray-700 mb-4'>1000</div>
          <div className="w-full max-w-[300px] sm:max-w-[280px]">
            <ApexChart />
          </div>
        </div>
        
        <div className='flex flex-col items-center p-4 rounded shadow bg-white sm:col-span-2 xl:col-span-1'>
          <div className='text-lg sm:text-2xl font-bold text-gray-700 mb-2'>Total Students</div>
          <div className='text-3xl sm:text-4xl font-bold text-gray-700 mb-4'>1000</div>
          <div className="w-full max-w-[300px] sm:max-w-[280px]">
            <ApexChart />
          </div>
        </div>
      </div>
    </div>
  </Layout>
);

export default Dashboard;