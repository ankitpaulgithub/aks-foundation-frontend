"use client"
import React from 'react'
import Layout from '../../../components/education/Layout'
import { FaCog, FaBirthdayCake, FaCommentDots, FaWhatsapp, FaUser } from 'react-icons/fa';
import { FaIndianRupeeSign } from "react-icons/fa6";
import { LiaSearchDollarSolid } from "react-icons/lia";
import { PiStudentFill } from "react-icons/pi";


import ApexChart from '../../../components/ApexChart';
import BottomChartSection from '../../../components/education/dashboard/BottomChartSection';
import { useRouter } from 'next/navigation';

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

const sutudentCards1 = [
  {
    icon: <FaUser className="text-2xl md:text-3xl text-white" />,
    label: "New Admission",
    route: "/(education)/students/admission",
    bg: "bg-gray-700",
  },
  {
    icon: <FaIndianRupeeSign className="text-2xl md:text-3xl text-white" />,
    label: "Fee by ID",
    route: "/(education)/fee/search",
    bg: "bg-purple-700",
  },
  {
    icon: <LiaSearchDollarSolid className="text-2xl md:text-3xl text-white" />,
    label: "Fee by Search",
    route: "/(education)/fee/search",
    bg: "bg-cyan-700",
  },
  {
    icon: <PiStudentFill className="text-2xl md:text-3xl text-white" />,
    label: "Student Details",
    route: "/(education)/students/details",
    bg: "bg-indigo-700",
  },
];
const sutudentCards2 = [
  {
    icon: <PiStudentFill className="text-2xl md:text-3xl text-white" />,
    label: "Student List",
    route: "/(education)/students/list",
    bg: "bg-blue-400",
  },
  {
    icon: <FaUser className="text-2xl md:text-3xl text-white" />,
    label: "Fee Receipt",
    route: "/(education)/fee/receipt",
    bg: "bg-green-400",
  },
  {
    icon: <FaIndianRupeeSign className="text-2xl md:text-3xl text-white" />,
    label: "Fee Pending",
    route: "/(education)/fee/pending",
    bg: "bg-yellow-400",
  },
  {
    icon: <LiaSearchDollarSolid className="text-2xl md:text-3xl text-white" />,
    label: "Fee Demand",
    route: "/(education)/fee/demand",
    bg: "bg-red-400", 
  },
];

const Dashboard = () => {
  const router = useRouter();
  return (
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
           
            className={`flex flex-row items-center p-3 sm:p-4 rounded shadow ${card.bg} min-h-[80px] sm:min-h-[100px] cursor-pointer hover:shadow-lg transition-all duration-300`}
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

          <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <div className="flex items-center">
              {/* Left side - Green square with rupee symbol */}
              <div className="bg-green-500 w-12 h-12 rounded-lg flex items-center justify-center mr-4">
                <FaIndianRupeeSign className="text-2xl text-white" />
              </div>

              {/* Right side - Cash details */}
              <div className="flex-1">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-green-600 font-semibold">Cash</span>
                  <span className="text-green-600 font-bold">₹ 1000</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-green-600 font-semibold">UPI</span>
                  <span className="text-green-600 font-bold">₹ 120000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-red-600 font-semibold">Total Collection</span>
                  <span className="text-red-600 font-bold">₹ 121000</span>
                </div>
              </div>
            </div>
          </div>


          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-2 sm:gap-4">
            {sutudentCards2.map((card, idx) => (
              <div
                key={idx}
                onClick={() => router.push(card.route)}
                className={`flex flex-col items-center text-center gap-2 p-3 sm:p-4 rounded shadow ${card.bg} h-[100px] sm:min-h-[80px] cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105`}
              >
                <div className="">{card.icon}</div>
                <div>
                  <div className="text-xs font-semibold text-white">
                    {card.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {sutudentCards1.map((card, idx) => (
              <div
                key={idx}
                onClick={() => router.push(card.route)}
                className={`flex flex-col items-center text-center gap-2 p-3 sm:p-4 rounded shadow ${card.bg} h-[100px] sm:min-h-[80px] cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105`}
              >
                <div className="">{card.icon}</div>
                <div>
                  <div className="text-xs font-semibold text-white">
                    {card.label}
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
              <ApexChart series={[25, 45, 32, 67, 89]} />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Charts Section */}
      <BottomChartSection />
    </div>
  </Layout>
  );
};

export default Dashboard;