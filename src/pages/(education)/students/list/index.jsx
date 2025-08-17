import React, { useState } from 'react'
import CommonTable from '../../../../components/CommonTable'
import { FaEye, FaPrint, FaEdit, FaMoneyBillWave, FaFileAlt } from 'react-icons/fa'
import Layout from '../../../../components/education/Layout'

const StudentList = () => {
  const [sortColumn, setSortColumn] = useState(null)
  const [sortDirection, setSortDirection] = useState('asc')

  // Table headers configuration
  const headers = [
    { key: 'sr', label: 'Sr.', sortable: false },
    { key: 'id', label: 'ID', sortable: true },
    { key: 'regNo', label: 'Reg.No.', sortable: true },
    { key: 'name', label: 'Name', sortable: true },
    { key: 'fatherName', label: 'Father Name', sortable: true },
    { key: 'class', label: 'Class', sortable: true },
    { key: 'section', label: 'Section', sortable: true },
    { key: 'gender', label: 'Gender', sortable: true },
    { key: 'mobile', label: 'Mobile', sortable: true },
    { key: 'actions', label: 'Action', sortable: false }
  ]

  // Sample data
  const studentData = [
    {
      id: 265,
      regNo: '1002445',
      name: 'RAMESH KUMAR',
      fatherName: 'DEMO',
      class: 'Nursery',
      section: 'A',
      gender: 'M',
      mobile: '9554833028'
    },
    {
      id: 264,
      regNo: '10245',
      name: 'T N SHUKLA',
      fatherName: 'DR',
      class: 'Nursery',
      section: 'A',
      gender: 'M',
      mobile: '7991963843'
    },
    {
      id: 263,
      regNo: '',
      name: 'DIPAK SINGH',
      fatherName: 'DE',
      class: 'Nursery',
      section: 'A',
      gender: 'M',
      mobile: '6394127036'
    },
    {
      id: 262,
      regNo: '',
      name: 'ANJALI PASWAN',
      fatherName: 'sam',
      class: 'Nursery',
      section: 'A',
      gender: 'F',
      mobile: '9876543210'
    },
    {
      id: 261,
      regNo: '',
      name: 'PUJA PASWAN',
      fatherName: 'PUNIT PASWAN',
      class: 'Nursery',
      section: 'A',
      gender: 'F',
      mobile: '8765432109'
    },
    {
      id: 265,
      regNo: '1002445',
      name: 'RAMESH KUMAR',
      fatherName: 'DEMO',
      class: 'Nursery',
      section: 'A',
      gender: 'M',
      mobile: '9554833028'
    },
    {
      id: 264,
      regNo: '10245',
      name: 'T N SHUKLA',
      fatherName: 'DR',
      class: 'Nursery',
      section: 'A',
      gender: 'M',
      mobile: '7991963843'
    },
    {
      id: 263,
      regNo: '',
      name: 'DIPAK SINGH',
      fatherName: 'DE',
      class: 'Nursery',
      section: 'A',
      gender: 'M',
      mobile: '6394127036'
    },
    {
      id: 262,
      regNo: '',
      name: 'ANJALI PASWAN',
      fatherName: 'sam',
      class: 'Nursery',
      section: 'A',
      gender: 'F',
      mobile: '9876543210'
    },
    {
      id: 261,
      regNo: '',
      name: 'PUJA PASWAN',
      fatherName: 'PUNIT PASWAN',
      class: 'Nursery',
      section: 'A',
      gender: 'F',
      mobile: '8765432109'
    }
  ]

  // Sample row design - this is what you'll customize for different tables
  const SampleRow = ({ data, index }) => (
    <>
      <td className="px-4 py-3 text-sm text-gray-900 font-medium">
        {index + 1}
      </td>
      <td className="px-4 py-3 text-sm text-gray-900">
        {data.id}
      </td>
      <td className="px-4 py-3 text-sm text-gray-900">
        {data.regNo || '-'}
      </td>
      <td className="px-4 py-3 text-sm text-gray-900 font-medium">
        {data.name}
      </td>
      <td className="px-4 py-3 text-sm text-gray-900">
        {data.fatherName}
      </td>
      <td className="px-4 py-3 text-sm text-gray-900">
        {data.class}
      </td>
      <td className="px-4 py-3 text-sm text-gray-900">
        {data.section}
      </td>
      <td className="px-4 py-3 text-sm text-gray-900">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          data.gender === 'M' ? 'bg-blue-100 text-blue-800' : 'bg-pink-100 text-pink-800'
        }`}>
          {data.gender === 'M' ? 'Male' : 'Female'}
        </span>
      </td>
      <td className="px-4 py-3 text-sm text-gray-900">
        {data.mobile}
      </td>
      <td className="px-4 py-3 text-sm text-gray-900">
        <div className="flex items-center space-x-1">
          {/* View Button - Blue */}
          <button className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-2 py-1 rounded transition-colors duration-150 cursor-pointer">
            View
          </button>
          
          {/* Print Button - Green */}
          <button className="bg-green-500 hover:bg-green-600 text-white text-xs px-2 py-1 rounded transition-colors duration-150 cursor-pointer">
            Print
          </button>
          
          {/* Print 1 Button - Green
          <button className="bg-green-500 hover:bg-green-600 text-white text-xs px-2 py-1 rounded transition-colors duration-150 cursor-pointer">
            P1
          </button> */}
          
          {/* Edit Button - Orange */}
          <button className="bg-green-500 hover:bg-green-600 text-white text-xs px-2 py-1 rounded transition-colors duration-150 cursor-pointer">
            Edit
          </button>
          
          {/* Fee Button - Green */}
          <button className="bg-green-500 hover:bg-green-600 text-white text-xs px-2 py-1 rounded transition-colors duration-150 cursor-pointer">
            Fee
          </button>
        </div>
      </td>
    </>
  )

  // Handle sorting
  const handleSort = (columnKey) => {
    if (sortColumn === columnKey) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(columnKey)
      setSortDirection('asc')
    }
  }

  // Sort data
  const sortedData = [...studentData].sort((a, b) => {
    if (!sortColumn) return 0
    
    const aValue = a[sortColumn] || ''
    const bValue = b[sortColumn] || ''
    
    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })

  return (
    <Layout>
    <div className="p-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Students List</h1>
          </div>
              <CommonTable
          headers={headers}
          data={sortedData}
          sampleRow={<SampleRow />}
          onSort={handleSort}
          sortColumn={sortColumn}
          sortDirection={sortDirection}
          className="w-full"
        />
      </div>
    </Layout>
  )
}

export default StudentList 