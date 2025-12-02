import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CommonTable from '../../../../components/CommonTable'
import { FaEye, FaPrint, FaEdit, FaMoneyBillWave, FaFileAlt } from 'react-icons/fa'
import Layout from '../../../../components/education/Layout'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import {
  fetchStudents,
  selectStudents,
  selectPagination,
  selectListLoading,
  selectListError
} from '../../../../slices/studentSlice'

// Search field options
const searchFieldOptions = [
  { value: 'firstName', label: 'Name', type: 'string' },
  { value: 'email', label: 'Email', type: 'string' },
  { value: 'mobileNo1', label: 'Mobile No', type: 'number' },
  { value: 'fathersName', label: "Father's Name", type: 'string' },
  { value: 'registrationNo', label: 'Registration No', type: 'string' },
  { value: 'aadhaarNo', label: 'Aadhaar No', type: 'number' },
  { value: 'batchName', label: 'Batch', type: 'string' },
]

const StudentList = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  
  // Redux state with safe defaults
  const students = useSelector(selectStudents) || []
  const pagination = useSelector(selectPagination) || {
    currentPage: 1,
    pageCount: 1,
    itemCount: 0,
    perPage: 10
  }
  const loading = useSelector(selectListLoading) || false
  const error = useSelector(selectListError)
  
  const [sortColumn, setSortColumn] = useState(null)
  const [sortDirection, setSortDirection] = useState('asc')
  
  // Search state
  const [searchField, setSearchField] = useState('firstName')
  const [searchValue, setSearchValue] = useState('')
  const [activeQuery, setActiveQuery] = useState({})

  // Fetch students on mount
  useEffect(() => {
    try {
      dispatch(fetchStudents({ page: 1, limit: pagination?.perPage || 10, query: activeQuery }))
    } catch (err) {
      console.error('Failed to dispatch fetchStudents:', err)
      toast.error('Failed to load students')
    }
  }, [dispatch, activeQuery])

  // Show error toast when error occurs
  useEffect(() => {
    if (error) {
      toast.error(error || 'Failed to load students')
    }
  }, [error])

  // Handle page change
  const handlePageChange = (newPage) => {
    try {
      dispatch(fetchStudents({ page: newPage, limit: pagination?.perPage || 10, query: activeQuery }))
    } catch (err) {
      console.error('Failed to change page:', err)
      toast.error('Failed to load students')
    }
  }

  // Handle search
  const handleSearch = () => {
    if (!searchValue?.trim()) {
      // Clear search if empty
      setActiveQuery({})
      return
    }
    
    // Get the field type
    const fieldOption = searchFieldOptions?.find(o => o?.value === searchField)
    const fieldType = fieldOption?.type || 'string'
    
    let query = {}
    
    if (fieldType === 'number') {
      // For number fields, validate and use exact match
      const numValue = Number(searchValue?.trim())
      if (isNaN(numValue)) {
        toast.error(`Please enter a valid number for ${fieldOption?.label}`)
        return
      }
      query = {
        [searchField]: numValue
      }
    } else {
      // For string fields, use regex for partial matching
      query = {
        [searchField]: { $regex: searchValue?.trim(), $options: 'i' }
      }
    }
    
    setActiveQuery(query)
  }

  // Handle search on Enter key
  const handleKeyPress = (e) => {
    if (e?.key === 'Enter') {
      handleSearch()
    }
  }

  // Clear search
  const handleClearSearch = () => {
    setSearchValue('')
    setActiveQuery({})
  }

  // Map API data to table format with safe access
  const studentData = Array.isArray(students) ? students?.map(student => ({
    id: student?.id || '',
    regNo: student?.registrationNo || '',
    name: [student?.firstName, student?.middleName, student?.lastName]?.filter(Boolean)?.join(' ') || '',
    fatherName: student?.fathersName || '',
    batch: student?.batchName || '',
    gender: student?.gender === 'Boy' || student?.gender === 'Male' ? 'M' : 'F',
    mobile: student?.mobileNo1 || '',
    email: student?.email || '',
    aadhaarNo: student?.aadhaarNo || ''
  })) : []

  // Table headers configuration
  const headers = [
    { key: 'sr', label: 'Sr.', sortable: false },
    { key: 'regNo', label: 'Reg.No.', sortable: true },
    { key: 'name', label: 'Name', sortable: true },
    { key: 'fatherName', label: 'Father Name', sortable: true },
    { key: 'batch', label: 'Batch', sortable: true },
    { key: 'gender', label: 'Gender', sortable: true },
    { key: 'mobile', label: 'Mobile', sortable: true },
    { key: 'actions', label: 'Action', sortable: false }
  ]

  // Handle view student
  const handleView = (student) => {
    try {
      if (!student) {
        toast.error('Student data not available')
        return
      }
      const nameParts = student?.name?.split(' ') || []
      localStorage?.setItem('admissionForm', JSON.stringify({
        ...student,
        firstName: nameParts?.[0] || '',
        lastName: nameParts?.slice(-1)?.[0] || ''
      }))
      console.log('Viewing student:', student)
      router?.push(`/(education)/students/details/${student?.id}`)
    } catch (err) {
      console.error('Failed to view student:', err)
      toast.error('Failed to open student details')
    }
  }

  // Handle edit student
  const handleEdit = (student) => {
    try {
      if (!student) {
        toast.error('Student data not available')
        return
      }
      localStorage?.setItem('student', JSON.stringify(student))
      router?.push(`/(education)/students/${student?.id}`)
    } catch (err) {
      console.error('Failed to edit student:', err)
      toast.error('Failed to open edit form')
    }
  }

  // Sample row design - this is what you'll customize for different tables
  const SampleRow = ({ data, index }) => {
    if (!data) return null
    
    const currentPage = pagination?.currentPage || 1
    const perPage = pagination?.perPage || 10
    const serialNumber = (currentPage - 1) * perPage + (index || 0) + 1
    
    return (
    <>
      <td className="px-4 py-3 text-sm text-gray-900 font-medium">
        {serialNumber}
      </td>
      <td className="px-4 py-3 text-sm text-gray-900">
        {data?.regNo || '-'}
      </td>
      <td className="px-4 py-3 text-sm text-gray-900 font-medium">
        {data?.name || '-'}
      </td>
      <td className="px-4 py-3 text-sm text-gray-900">
        {data?.fatherName || '-'}
      </td>
      <td className="px-4 py-3 text-sm text-gray-900">
        {data?.batch || '-'}
      </td>
      <td className="px-4 py-3 text-sm text-gray-900">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          data?.gender === 'M' ? 'bg-blue-100 text-blue-800' : 'bg-pink-100 text-pink-800'
        }`}>
          {data?.gender === 'M' ? 'Male' : 'Female'}
        </span>
      </td>
      <td className="px-4 py-3 text-sm text-gray-900">
        {data?.mobile || '-'}
      </td>
      <td className="px-4 py-3 text-sm text-gray-900">
        <div className="flex items-center space-x-1">
          {/* View Button - Blue */}
          <button 
            onClick={() => {router?.push(`/(education)/students/details/${data?.id}`)}}
            className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-2 py-1 rounded transition-colors duration-150 cursor-pointer"
          >
            View
          </button>
          
          {/* Print Button - Green */}
          <button className="bg-green-500 hover:bg-green-600 text-white text-xs px-2 py-1 rounded transition-colors duration-150 cursor-pointer">
            Print
          </button>
          
          {/* Edit Button - Orange */}
          <button 
            onClick={() => handleEdit(data)}
            className="bg-orange-500 hover:bg-orange-600 text-white text-xs px-2 py-1 rounded transition-colors duration-150 cursor-pointer"
          >
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
  }

  // Handle sorting
  const handleSort = (columnKey) => {
    if (!columnKey) return
    
    if (sortColumn === columnKey) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(columnKey)
      setSortDirection('asc')
    }
  }

  // Sort data with safe access
  const sortedData = [...(studentData || [])]?.sort((a, b) => {
    if (!sortColumn) return 0
    
    const aValue = a?.[sortColumn] || ''
    const bValue = b?.[sortColumn] || ''
    
    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  }) || []

  // Calculate pagination values safely
  const currentPage = pagination?.currentPage || 1
  const perPage = pagination?.perPage || 10
  const itemCount = pagination?.itemCount || 0
  const pageCount = pagination?.pageCount || 1
  const showingFrom = itemCount > 0 ? (currentPage - 1) * perPage + 1 : 0
  const showingTo = Math.min(currentPage * perPage, itemCount)

  return (
    <Layout>
    <div className="p-6">
      
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Students List</h1>
        <p className="text-gray-600 mt-1">Total Students: {itemCount}</p>

        <div className='flex flex-wrap w-full mx-auto justify-center my-3 gap-2'>
          {/* Search Field Dropdown */}
          <select 
            value={searchField}
            onChange={(e) => setSearchField(e?.target?.value)}
            className='bg-gray-200 rounded-full p-3 px-4 outline-blue-300 cursor-pointer min-w-[150px]'
          >
            {searchFieldOptions?.map((option) => (
              <option key={option?.value} value={option?.value}>
                {option?.label}
              </option>
            ))}
          </select>
          
          {/* Search Input */}
          <input 
            type="text" 
            placeholder={`Search by ${searchFieldOptions?.find(o => o?.value === searchField)?.label || 'field'}...`}
            value={searchValue}
            onChange={(e) => setSearchValue(e?.target?.value)}
            onKeyPress={handleKeyPress}
            className='bg-gray-200 rounded-full p-3 px-6 w-full sm:max-w-md outline-blue-300' 
          />
          
          {/* Search Button */}
          <button 
            onClick={handleSearch}
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full flex items-center gap-2 cursor-pointer hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Search
          </button>
          
          {/* Clear Button - Show only when search is active */}
          {Object.keys(activeQuery)?.length > 0 && (
            <button 
              onClick={handleClearSearch}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-full flex items-center gap-2 cursor-pointer hover:scale-105 transition-all duration-300"
            >
              Clear
            </button>
          )}
        </div>
        
        {/* Active Search Indicator */}
        {Object.keys(activeQuery)?.length > 0 && (
          <div className="text-center text-sm text-gray-600 mt-2">
            Searching by <span className="font-semibold">{searchFieldOptions?.find(o => o?.value === searchField)?.label}</span>: 
            <span className="font-semibold text-blue-600 ml-1">"{searchValue}"</span>
          </div>
        )}
      </div>
      
      
      {loading ? (
        <div className="bg-white rounded-lg shadow-md p-12 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <p className="mt-4 text-gray-600">Loading students...</p>
          </div>
        </div>
      ) : error ? (
        <div className="bg-white rounded-lg shadow-md p-12 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600 text-lg">Error: {error}</p>
            <button 
              onClick={() => dispatch(fetchStudents({ page: 1, limit: perPage, query: activeQuery }))}
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Try Again
            </button>
          </div>
        </div>
      ) : !studentData?.length ? (
        <div className="bg-white rounded-lg shadow-md p-12 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600 text-lg">No students found</p>
            <button 
              onClick={() => router?.push('/(education)/students/admission')}
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Add New Student
            </button>
          </div>
        </div>
      ) : (
        <>
          <CommonTable
            headers={headers}
            data={sortedData}
            sampleRow={<SampleRow />}
            onSort={handleSort}
            sortColumn={sortColumn}
            sortDirection={sortDirection}
            className="w-full"
          />
          
          {/* Pagination */}
          {pageCount > 1 && (
            <div className="bg-white rounded-lg shadow-md p-4 mt-4 flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Showing {showingFrom} to {showingTo} of {itemCount} students
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded ${
                    currentPage === 1
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                >
                  Previous
                </button>
                <span className="text-gray-600">
                  Page {currentPage} of {pageCount}
                </span>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === pageCount}
                  className={`px-3 py-1 rounded ${
                    currentPage === pageCount
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}
      </div>
    </Layout>
  )
}

export default StudentList 