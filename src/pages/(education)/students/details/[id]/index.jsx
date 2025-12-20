import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Layout from '../../../../../components/education/Layout'
import { FaUser, FaMapMarkerAlt, FaCertificate, FaIdCard, FaEdit, FaPrint, FaMoneyBillWave, FaGraduationCap, FaFileImage, FaUniversity } from 'react-icons/fa'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import {
  fetchStudentById,
  selectCurrentStudent,
  selectStudentLoading,
  selectStudentError,
  clearCurrentStudent
} from '../../../../../slices/studentSlice'

const StudentDetails = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { id } = router?.query || {}
  const [imageModal, setImageModal] = useState({ open: false, src: '', title: '' })
  const hasFetched = React.useRef(false)
  
  // Redux state
  const student = useSelector(selectCurrentStudent)
  const loading = useSelector(selectStudentLoading)
  const error = useSelector(selectStudentError)

  // Fetch student data when id is available (runs once per id)
  useEffect(() => {
    if (id && !hasFetched.current) {
      hasFetched.current = true
      dispatch(fetchStudentById(id))
    }
    
    // Cleanup on unmount
    return () => {
      dispatch(clearCurrentStudent())
      hasFetched.current = false
    }
  }, [id, dispatch])

  // Show error toast
  useEffect(() => {
    if (error) {
      toast.error(error || 'Failed to load student details')
    }
  }, [error])

  // Map API data to display format - now passes through raw student data too
  const studentData = useMemo(() => {
    const a = student || {}
    const fullName = [a?.firstName, a?.middleName, a?.lastName]?.filter(Boolean)?.join(' ')
    return {
      // Basic Info
      firstName: a?.firstName || '',
      middleName: a?.middleName || '',
      lastName: a?.lastName || '',
      name: fullName || 'Not provided',
      nameAsSSC: a?.nameAsSSC || fullName || 'Not provided',
      mobile: a?.mobileNo1 || 'Not provided',
      mobile2: a?.mobileNo2 || '',
      mobile3: a?.mobileNo3 || '',
      whatsapp: a?.whatsappNo1 || '',
      gender: a?.gender || 'Not provided',
      dateOfBirth: a?.dateOfBirth || '',
      category: a?.category || 'Not provided',
      emailAddress: a?.email || 'Not provided',
      bloodGroup: a?.bloodGroup || 'Not provided',
      maritalStatus: a?.maritalStatus || 'Not provided',
      registrationNo: a?.registrationNo || 'Not provided',
      aadhaarNo: a?.aadhaarNo || 'Not provided',
      isPwD: a?.isPwD,
      disabilityType: a?.disabilityType || '',
      isActive: a?.isActive,

      // Address
      address: a?.address || 'Not provided',
      permanentAddress: a?.permanentAddress || 'Not provided',
      area: a?.area || 'Not provided',
      state: a?.state || 'Not provided',
      stateCode: a?.stateCode || '',
      district: a?.district || 'Not provided',
      villageName: a?.villageName || 'Not provided',
      pincode: a?.pincode || 'Not provided',
      blockNagarNigam: a?.blockNagarNigam || 'Not provided',
      postOffice: a?.postOffice || 'Not provided',

      // Program & Course
      qualification: a?.qualification || 'Not provided',
      program: a?.program || 'Not provided',
      specificCourseName: a?.specificCourseName || 'Not provided',
      sessionYear: a?.sessionYear || '',
      batchName: a?.batchName || 'Not provided',
      batchMonth: a?.batchMonth || '',
      batchYear: a?.batchYear || '',
      batchTime: a?.batchTime || '',
      batchStartDate: a?.batchStartDate || '',
      batchEndDate: a?.batchEndDate || '',
      batchTime1: a?.batchTime1 || '',
      batchTime2: a?.batchTime2 || '',

      // Class 10th Details
      class10PassingYear: a?.class10PassingYear || '',
      class10RollNo: a?.class10RollNo || '',
      class10RollCode: a?.class10RollCode || '',
      class10SchoolName: a?.class10SchoolName || '',
      class10SchoolAddress: a?.class10SchoolAddress || '',
      class10Marks: a?.class10Marks || '',
      class10TotalMarks: a?.class10TotalMarks || '',
      class10Percentage: a?.class10Percentage || '',
      class10Board: a?.class10Board || '',

      // Class 12th Details
      class12PassingYear: a?.class12PassingYear || '',
      class12RollNo: a?.class12RollNo || '',
      class12RollCode: a?.class12RollCode || '',
      class12SchoolName: a?.class12SchoolName || '',
      class12SchoolAddress: a?.class12SchoolAddress || '',
      class12Marks: a?.class12Marks || '',
      class12TotalMarks: a?.class12TotalMarks || '',
      class12Percentage: a?.class12Percentage || '',
      class12Board: a?.class12Board || '',
      class12Stream: a?.class12Stream || '',

      // Graduation Details
      graduationSessionYear: a?.graduationSessionYear || '',
      graduationRollNo: a?.graduationRollNo || '',
      graduationRollCode: a?.graduationRollCode || '',
      graduationMarks: a?.graduationMarks || '',
      graduationTotalMarks: a?.graduationTotalMarks || '',
      graduationPercentage: a?.graduationPercentage || '',
      graduationStream: a?.graduationStream || '',
      graduationCollegeName: a?.graduationCollegeName || '',
      graduationCollegeAddress: a?.graduationCollegeAddress || '',
      graduationUniversityNameAddress: a?.graduationUniversityNameAddress || '',

      // Post Graduation Details
      postGraduationSessionYear: a?.postGraduationSessionYear || '',
      postGraduationRollNo: a?.postGraduationRollNo || '',
      postGraduationRollCode: a?.postGraduationRollCode || '',
      postGraduationMarks: a?.postGraduationMarks || '',
      postGraduationTotalMarks: a?.postGraduationTotalMarks || '',
      postGraduationPercentage: a?.postGraduationPercentage || '',
      postGraduationStream: a?.postGraduationStream || '',
      postGraduationCollegeName: a?.postGraduationCollegeName || '',
      postGraduationCollegeAddress: a?.postGraduationCollegeAddress || '',
      postGraduationUniversityNameAddress: a?.postGraduationUniversityNameAddress || '',

      // Bank Details
      bankName: a?.bankName || 'Not provided',
      accountNumber: a?.accountNumber || 'Not provided',
      branchName: a?.branchName || 'Not provided',
      ifscCode: a?.ifscCode || '',

      // Parent Details
      fatherName: a?.fathersName || 'Not provided',
      motherName: a?.mothersName || 'Not provided',
      fatherOccupation: a?.fatherOccupation || 'Not provided',

      // Office Use Only
      regDate: a?.regDate || '',
      drccVerificationDate: a?.drccVerificationDate || '',
      learnerCode: a?.learnerCode || '',
      batch: a?.batch || '',
      remarks: a?.remarks || '',

      // Course Details (for DCA/ADCA)
      courseEnrollmentNo: a?.courseEnrollmentNo || '',
      program2: a?.program2 || '',
      courseDuration: a?.courseDuration || '',
      certificateNo: a?.certificateNo || '',
      dateOfIssue: a?.dateOfIssue || '',
      remarks2: a?.remarks2 || '',

      // Payment Details
      paymentMethod: a?.paymentMethod || '',
      utrNumber: a?.utrNumber || '',
      paymentDatetime: a?.paymentDatetime || '',

      // Payments
      payments: a?.payments || [],

      // Files/Documents
      files: a?.files || {},

      // Raw data for edit
      _id: a?._id || a?.id || id,
      
      // Store raw data for detecting additional fields
      _rawData: a
    }
  }, [student, id])

  // List of all known/handled field keys (to detect additional fields)
  const knownFieldKeys = useMemo(() => new Set([
    // System fields to exclude
    '_id', 'id', '__v', 'createdAt', 'updatedAt', 'isDeleted', 'addedBy', 'isAppUser', 'password',
    // Basic Info
    'firstName', 'middleName', 'lastName', 'nameAsSSC', 'mobileNo1', 'mobileNo2', 'mobileNo3', 'whatsappNo1',
    'gender', 'dateOfBirth', 'category', 'email', 'bloodGroup', 'maritalStatus', 'registrationNo', 
    'aadhaarNo', 'isPwD', 'disabilityType', 'isActive',
    // Address
    'address', 'permanentAddress', 'area', 'state', 'stateCode', 'district', 'villageName', 'pincode', 
    'blockNagarNigam', 'postOffice',
    // Program & Course
    'qualification', 'program', 'specificCourseName', 'sessionYear', 'batchName', 'batchMonth', 'batchYear',
    'batchTime', 'batchStartDate', 'batchEndDate', 'batchTime1', 'batchTime2',
    // Class 10th
    'class10PassingYear', 'class10RollNo', 'class10RollCode', 'class10SchoolName', 
    'class10SchoolAddress', 'class10Marks', 'class10TotalMarks', 'class10Percentage', 'class10Board',
    // Class 12th
    'class12PassingYear', 'class12RollNo', 'class12RollCode', 'class12SchoolName',
    'class12SchoolAddress', 'class12Marks', 'class12TotalMarks', 'class12Percentage', 'class12Board', 'class12Stream',
    // Graduation
    'graduationSessionYear', 'graduationRollNo', 'graduationRollCode', 'graduationMarks', 'graduationTotalMarks',
    'graduationPercentage', 'graduationStream', 'graduationCollegeName', 'graduationCollegeAddress', 'graduationUniversityNameAddress',
    // Post Graduation
    'postGraduationSessionYear', 'postGraduationRollNo', 'postGraduationRollCode', 'postGraduationMarks', 'postGraduationTotalMarks',
    'postGraduationPercentage', 'postGraduationStream', 'postGraduationCollegeName', 'postGraduationCollegeAddress', 'postGraduationUniversityNameAddress',
    // Bank
    'bankName', 'accountNumber', 'branchName', 'ifscCode',
    // Parent
    'fathersName', 'mothersName', 'fatherOccupation',
    // Office Use Only
    'regDate', 'drccVerificationDate', 'learnerCode', 'batch', 'remarks',
    // Course Details (DCA/ADCA)
    'courseEnrollmentNo', 'program2', 'courseDuration', 'certificateNo', 'dateOfIssue', 'remarks2',
    // Payment
    'paymentMethod', 'utrNumber', 'paymentDatetime',
    // Special
    'payments', 'files'
  ]), [])

  // Convert camelCase/snake_case to readable label
  const formatFieldLabel = (key) => {
    if (!key) return ''
    return key
      ?.replace(/([A-Z])/g, ' $1') // camelCase to spaces
      ?.replace(/_/g, ' ') // snake_case to spaces
      ?.replace(/^\w/, (c) => c?.toUpperCase()) // capitalize first letter
      ?.trim()
  }

  // Detect additional fields from API response
  const additionalFields = useMemo(() => {
    const rawData = studentData?._rawData || {}
    const extraFields = []
    
    Object.keys(rawData)?.forEach((key) => {
      if (!knownFieldKeys?.has(key)) {
        const value = rawData?.[key]
        // Skip null, undefined, empty strings, and complex nested objects/arrays
        if (value === null || value === undefined || value === '') return
        
        // Handle boolean values - convert to Yes/No
        if (typeof value === 'boolean') {
          extraFields?.push({
            key,
            label: formatFieldLabel(key),
            value: value ? 'Yes' : 'No'
          })
        }
        // Handle primitive values (string, number)
        else if (typeof value !== 'object') {
          extraFields?.push({
            key,
            label: formatFieldLabel(key),
            value: String(value)
          })
        }
        // Handle simple arrays (convert to comma-separated string)
        else if (Array.isArray(value) && value.length > 0 && typeof value[0] !== 'object') {
          extraFields?.push({
            key,
            label: formatFieldLabel(key),
            value: value.join(', ')
          })
        }
      }
    })
    
    return extraFields
  }, [studentData, knownFieldKeys])

  const handleEdit = (data) => {
    try {
      if (!data) {
        toast.error('Student data not available')
        return
      }
      localStorage?.setItem("student", JSON.stringify(student))
      router?.push(`/(education)/students/admission?edit=${data?._id}`)
    } catch (err) {
      console.error('Failed to edit student:', err)
      toast.error('Failed to open edit form')
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'Not provided';
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }

  const formatCurrency = (amount) => {
    if (!amount) return '₹0';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  }

  const getGenderColor = (gender) => {
    if (!gender) return 'bg-gray-100 text-gray-800'
    const g = String(gender).toLowerCase()
    if (g === 'boy' || g === 'male') return 'bg-blue-100 text-blue-800'
    if (g === 'girl' || g === 'female') return 'bg-pink-100 text-pink-800'
    return 'bg-gray-100 text-gray-800'
  }

  const openImageModal = (src, title) => {
    setImageModal({ open: true, src, title })
  }

  const closeImageModal = () => {
    setImageModal({ open: false, src: '', title: '' })
  }

  const printForm = async () => {
    try {
      const res = await fetch('/api/admission-form');
      if (!res.ok) throw new Error("Failed to fetch PDF");
  
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
  
      const iframe = document.createElement('iframe');
      iframe.style.position = 'fixed';
      iframe.style.right = '0';
      iframe.style.bottom = '0';
      iframe.style.width = '0';
      iframe.style.height = '0';
      iframe.style.border = 'none';
      iframe.src = url;
  
      document.body.appendChild(iframe);
  
      iframe.onload = () => {
        iframe.contentWindow.focus();
        iframe.contentWindow.print();
        URL.revokeObjectURL(url);
        setTimeout(() => document.body.removeChild(iframe), 1000);
      };
    } catch (err) {
      console.error("Print failed:", err);
      toast.error('Failed to print. Please try again.');
    }
  };

  // Document labels mapping
  const documentLabels = {
    studentImage: 'Student Photo',
    bankPasbook: 'Bank Passbook',
    residentialCertificate: 'Residential Certificate',
    provisionalCertificate: 'Provisional Certificate',
    aadhaarFront: 'Aadhaar Front',
    aadhaarBack: 'Aadhaar Back',
    drccReceipt: 'DRCC Receipt',
    tenthMarksheet: '10th Marksheet',
    tenthProvisional: '10th Provisional',
    twelfthMarksheet: '12th Marksheet',
    twelfthProvisional: '12th Provisional',
    graduationCertificate: 'Graduation Certificate',
    postGraduationCertificate: 'Post Graduation Certificate',
    disabilityCertificate: 'Disability Certificate',
    counselorSignature: 'Counselor Signature',
    applicantSignature: 'Applicant Signature',
    signature: 'Signature'
  }

  // Field configurations for reusable mapping
  const basicInfoFields = [
    { label: 'Full Name', key: 'name', bold: true },
    { label: 'Name (As per SSC)', key: 'nameAsSSC' },
    { label: 'Registration Number', key: 'registrationNo', bold: true },
    { label: 'Date of Birth', key: 'dateOfBirth', format: 'date' },
    { label: 'Mobile Number', key: 'mobile' },
    { label: 'Mobile 2', key: 'mobile2', conditional: true },
    { label: 'Mobile 3', key: 'mobile3', conditional: true },
    { label: 'WhatsApp', key: 'whatsapp', conditional: true },
    { label: 'Email', key: 'emailAddress', breakAll: true },
    { label: 'Category', key: 'category' },
    { label: 'Blood Group', key: 'bloodGroup' },
    { label: 'Marital Status', key: 'maritalStatus' },
    { label: 'Aadhaar Number', key: 'aadhaarNo' },
    { label: 'Is PwD', key: 'isPwD', format: 'boolean' },
    { label: 'Disability Type', key: 'disabilityType', conditional: true }
  ]

  const parentFields = [
    { label: "Father's Name", key: 'fatherName', bold: true },
    { label: "Father's Occupation", key: 'fatherOccupation' },
    { label: "Mother's Name", key: 'motherName', bold: true }
  ]

  const currentAddressFields = [
    { label: 'Address', key: 'address' },
    { label: 'Village Name', key: 'villageName' },
    { label: 'Post Office', key: 'postOffice' },
    { label: 'Block / Nagar Nigam', key: 'blockNagarNigam' }
  ]

  const locationFields = [
    { label: 'Area', key: 'area' },
    { label: 'District', key: 'district' },
    { label: 'State', key: 'state' },
    { label: 'Pin Code', key: 'pincode' }
  ]

  const programFields = [
    { label: 'Qualification', key: 'qualification', bold: true },
    { label: 'Program', key: 'program', bold: true },
    { label: 'Course Name', key: 'specificCourseName', bold: true },
    { label: 'Session Year', key: 'sessionYear', conditional: true },
    { label: 'Batch Name', key: 'batchName' },
    { label: 'Batch Month', key: 'batchMonth', conditional: true },
    { label: 'Batch Year', key: 'batchYear', conditional: true },
    { label: 'Batch Time', key: 'batchTime', conditional: true },
    { label: 'Batch Start Date', key: 'batchStartDate', format: 'date', conditional: true },
    { label: 'Batch End Date', key: 'batchEndDate', format: 'date', conditional: true },
    { label: 'Batch Time 1', key: 'batchTime1', conditional: true },
    { label: 'Batch Time 2', key: 'batchTime2', conditional: true }
  ]

  const class10Fields = [
    { label: 'Passing Year', key: 'class10PassingYear' },
    { label: 'Roll No', key: 'class10RollNo' },
    { label: 'Roll Code', key: 'class10RollCode' },
    { label: 'Board', key: 'class10Board' },
    { label: 'School Name', key: 'class10SchoolName' },
    { label: 'School Address', key: 'class10SchoolAddress' },
    { label: 'Marks Obtained', key: 'class10Marks', suffix: 'class10TotalMarks' },
    { label: 'Percentage', key: 'class10Percentage', format: 'percentage', bold: true }
  ]

  const class12Fields = [
    { label: 'Passing Year', key: 'class12PassingYear' },
    { label: 'Roll No', key: 'class12RollNo' },
    { label: 'Roll Code', key: 'class12RollCode' },
    { label: 'Board', key: 'class12Board' },
    { label: 'Stream', key: 'class12Stream', conditional: true },
    { label: 'School Name', key: 'class12SchoolName' },
    { label: 'School Address', key: 'class12SchoolAddress' },
    { label: 'Marks Obtained', key: 'class12Marks', suffix: 'class12TotalMarks' },
    { label: 'Percentage', key: 'class12Percentage', format: 'percentage', bold: true }
  ]

  const bankFields = [
    { label: 'Bank Name', key: 'bankName' },
    { label: 'Account Number', key: 'accountNumber' },
    { label: 'Branch Name', key: 'branchName' },
    { label: 'IFSC Code', key: 'ifscCode', conditional: true }
  ]

  const graduationFields = [
    { label: 'Session Year', key: 'graduationSessionYear' },
    { label: 'Roll No', key: 'graduationRollNo' },
    { label: 'Roll Code', key: 'graduationRollCode' },
    { label: 'Stream', key: 'graduationStream', conditional: true },
    { label: 'College Name', key: 'graduationCollegeName' },
    { label: 'College Address', key: 'graduationCollegeAddress' },
    { label: 'University Name & Address', key: 'graduationUniversityNameAddress' },
    { label: 'Marks Obtained', key: 'graduationMarks', suffix: 'graduationTotalMarks' },
    { label: 'Percentage', key: 'graduationPercentage', format: 'percentage', bold: true }
  ]

  const postGraduationFields = [
    { label: 'Session Year', key: 'postGraduationSessionYear' },
    { label: 'Roll No', key: 'postGraduationRollNo' },
    { label: 'Roll Code', key: 'postGraduationRollCode' },
    { label: 'Stream', key: 'postGraduationStream', conditional: true },
    { label: 'College Name', key: 'postGraduationCollegeName' },
    { label: 'College Address', key: 'postGraduationCollegeAddress' },
    { label: 'University Name & Address', key: 'postGraduationUniversityNameAddress' },
    { label: 'Marks Obtained', key: 'postGraduationMarks', suffix: 'postGraduationTotalMarks' },
    { label: 'Percentage', key: 'postGraduationPercentage', format: 'percentage', bold: true }
  ]

  const officeUseFields = [
    { label: 'Registration Date', key: 'regDate', format: 'date', conditional: true },
    { label: 'DRCC Verification Date', key: 'drccVerificationDate', format: 'date', conditional: true },
    { label: 'Learner Code', key: 'learnerCode', conditional: true },
    { label: 'Batch', key: 'batch', conditional: true },
    { label: 'Remarks', key: 'remarks', conditional: true }
  ]

  const courseDetailsFields = [
    { label: 'Course Enrollment No', key: 'courseEnrollmentNo', conditional: true },
    { label: 'Program', key: 'program2', conditional: true },
    { label: 'Course Duration', key: 'courseDuration', conditional: true },
    { label: 'Certificate No', key: 'certificateNo', conditional: true },
    { label: 'Date of Issue', key: 'dateOfIssue', format: 'date', conditional: true },
    { label: 'Remarks', key: 'remarks2', conditional: true }
  ]

  const paymentDetailsFields = [
    { label: 'Payment Method', key: 'paymentMethod', conditional: true },
    { label: 'UTR Number', key: 'utrNumber', conditional: true },
    { label: 'Payment Date & Time', key: 'paymentDatetime', conditional: true }
  ]

  // Reusable field renderer
  const renderField = (field, data) => {
    const value = data?.[field?.key]
    if (field?.conditional && !value && value !== false && value !== 0) return null
    
    let displayValue = value
    
    // Handle boolean values - show "Yes" or "No"
    if (field?.format === 'boolean' || typeof value === 'boolean') {
      displayValue = value === true ? 'Yes' : value === false ? 'No' : 'Not provided'
    } else if (field?.format === 'date') {
      displayValue = formatDate(value)
    } else if (field?.format === 'percentage') {
      displayValue = value ? `${value}%` : 'Not provided'
    } else if (field?.suffix) {
      displayValue = `${value || 'Not provided'} / ${data?.[field?.suffix] || '-'}`
    } else {
      displayValue = value || 'Not provided'
    }

    return (
      <div key={field?.key}>
        <label className="block text-sm font-medium text-gray-600">{field?.label}</label>
        <p className={`text-gray-800 ${field?.bold ? 'font-semibold' : ''} ${field?.breakAll ? 'break-all' : ''}`}>
          {displayValue}
        </p>
      </div>
    )
  }
  

  return (
    <Layout>
      <div className="bg-gray-100 min-h-screen p-4">
        <div className="max-w-7xl mx-auto">


          {/* Loading State */}
          {loading ? (
            <div className="bg-white rounded-lg shadow-md p-12 flex items-center justify-center">
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                <p className="mt-4 text-gray-600">Loading student details...</p>
              </div>
            </div>
          ) : error ? (
            <div className="bg-white rounded-lg shadow-md p-12 flex items-center justify-center">
              <div className="text-center">
                <p className="text-red-600 text-lg">Error: {error}</p>
                <button 
                  onClick={() => id && dispatch(fetchStudentById(id))}
                  className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                >
                  Try Again
                </button>
                <button 
                  onClick={() => router?.push('/(education)/students/list')}
                  className="mt-4 ml-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
                >
                  Back to List
                </button>
              </div>
            </div>
          ) : !student ? (
            <div className="bg-white rounded-lg shadow-md p-12 flex items-center justify-center">
              <div className="text-center">
                <p className="text-gray-600 text-lg">Student not found</p>
                <button 
                  onClick={() => router?.push('/(education)/students/list')}
                  className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                >
                  Back to List
                </button>
              </div>
            </div>
          ) : (
          <>
          {/* Header with Actions */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Student Details</h1>
                <p className="text-gray-600 mt-1">Registration No: {studentData?.registrationNo}</p>
              </div>
              <div className="flex gap-3 mt-4 sm:mt-0">
                <button onClick={()=>handleEdit(studentData)} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 cursor-pointer hover:scale-105 transition-colors duration-300">
                  <FaEdit className="text-sm" />
                  Edit
                </button>
                <button onClick={printForm} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors hover:scale-105 duration-300">
                  <FaPrint className="text-sm" />
                  Print
                </button>
              </div>
            </div>
          </div>

          {/* Student Basic Info Card */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Student Photo */}
              <div className="lg:w-1/4">
                <div 
                  className="bg-gray-200 rounded-lg w-48 h-48 mx-auto lg:mx-0 flex items-center justify-center overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => studentData?.files?.studentImage && openImageModal(studentData?.files?.studentImage, 'Student Photo')}
                >
                  {studentData?.files?.studentImage ? (
                    <img 
                      src={studentData?.files?.studentImage} 
                      alt="Student" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div className={`items-center justify-center ${studentData?.files?.studentImage ? 'hidden' : 'flex'}`}>
                    <FaUser className="text-6xl text-gray-400" />
                  </div>
                </div>
                <div className="text-center lg:text-left mt-4 space-y-2">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getGenderColor(studentData?.gender)}`}>
                    {studentData?.gender}
                  </span>
                  <div>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${studentData?.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {studentData?.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Student Basic Details */}
              <div className="lg:w-3/4">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b-2 border-blue-200 pb-2">
                  Basic Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {basicInfoFields?.map((field) => renderField(field, studentData))}
                </div>
              </div>
            </div>
          </div>

          {/* Parent Information */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b-2 border-orange-200 pb-2 flex items-center gap-2">
              <FaUser className="text-orange-500" />
              Parent Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {parentFields?.map((field) => renderField(field, studentData))}
            </div>
          </div>

          {/* Address Information */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b-2 border-green-200 pb-2 flex items-center gap-2">
              <FaMapMarkerAlt className="text-green-500" />
              Address Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-3">Current Address</h3>
                <div className="space-y-2">
                  {currentAddressFields?.map((field) => renderField(field, studentData))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-3">Location Details</h3>
                <div className="space-y-2">
                  {locationFields?.map((field) => renderField(field, studentData))}
                </div>
              </div>
            </div>
            {studentData?.permanentAddress && studentData?.permanentAddress !== 'Not provided' && (
              <div className="mt-4 pt-4 border-t">
                <label className="block text-sm font-medium text-gray-600">Permanent Address</label>
                <p className="text-gray-800">{studentData?.permanentAddress}</p>
              </div>
            )}
          </div>

          {/* Program & Course Details */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b-2 border-purple-200 pb-2 flex items-center gap-2">
              <FaGraduationCap className="text-purple-500" />
              Program & Course Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {programFields?.map((field) => renderField(field, studentData))}
            </div>
          </div>

          {/* Educational Details */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b-2 border-indigo-200 pb-2 flex items-center gap-2">
              <FaCertificate className="text-indigo-500" />
              Educational Details
            </h2>
            
            {/* Class 10th */}
            {(studentData?.class10PassingYear || studentData?.class10RollNo) && (
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-700 mb-3 bg-gray-50 p-2 rounded">Class 10th Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {class10Fields?.map((field) => renderField(field, studentData))}
                </div>
              </div>
            )}

            {/* Class 12th */}
            {(studentData?.class12PassingYear || studentData?.class12RollNo) && (
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-700 mb-3 bg-gray-50 p-2 rounded">Class 12th Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {class12Fields?.map((field) => renderField(field, studentData))}
                </div>
              </div>
            )}

            {/* Graduation */}
            {(studentData?.graduationSessionYear || studentData?.graduationRollNo || studentData?.graduationCollegeName) && (
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-700 mb-3 bg-gray-50 p-2 rounded">Graduation Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {graduationFields?.map((field) => renderField(field, studentData))}
                </div>
              </div>
            )}

            {/* Post Graduation */}
            {(studentData?.postGraduationSessionYear || studentData?.postGraduationRollNo || studentData?.postGraduationCollegeName) && (
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-700 mb-3 bg-gray-50 p-2 rounded">Post Graduation Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {postGraduationFields?.map((field) => renderField(field, studentData))}
                </div>
              </div>
            )}
          </div>

          {/* Bank Details */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b-2 border-teal-200 pb-2 flex items-center gap-2">
              <FaUniversity className="text-teal-500" />
              Bank Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {bankFields?.map((field) => renderField(field, studentData))}
            </div>
          </div>

          {/* Office Use Only Details */}
          {(studentData?.regDate || studentData?.drccVerificationDate || studentData?.learnerCode || studentData?.batch) && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b-2 border-gray-300 pb-2 flex items-center gap-2">
                <FaIdCard className="text-gray-500" />
                Office Use Only
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {officeUseFields?.map((field) => renderField(field, studentData))}
              </div>
            </div>
          )}

          {/* Course Details (DCA/ADCA) */}
          {(studentData?.courseEnrollmentNo || studentData?.program2 || studentData?.courseDuration || studentData?.certificateNo) && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b-2 border-cyan-200 pb-2 flex items-center gap-2">
                <FaCertificate className="text-cyan-500" />
                Course Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {courseDetailsFields?.map((field) => renderField(field, studentData))}
              </div>
            </div>
          )}

          {/* Payment Details */}
          {(studentData?.paymentMethod || studentData?.utrNumber || studentData?.paymentDatetime) && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b-2 border-emerald-200 pb-2 flex items-center gap-2">
                <FaMoneyBillWave className="text-emerald-500" />
                Payment Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {paymentDetailsFields?.map((field) => renderField(field, studentData))}
              </div>
            </div>
          )}

          {/* Payment History */}
          {studentData?.payments && studentData?.payments?.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b-2 border-yellow-200 pb-2 flex items-center gap-2">
                <FaMoneyBillWave className="text-yellow-500" />
                Payment History
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S.No</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {studentData?.payments?.map((payment, index) => (
                      <tr key={payment?._id || payment?.id || index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{index + 1}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">{formatCurrency(payment?.amount)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(payment?.date)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment?.id || payment?._id || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-gray-50">
                    <tr>
                      <td className="px-6 py-3 text-sm font-semibold text-gray-900">Total</td>
                      <td className="px-6 py-3 text-sm font-semibold text-green-600">
                        {formatCurrency(studentData?.payments?.reduce((sum, p) => sum + (p?.amount || 0), 0))}
                      </td>
                      <td colSpan="2"></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          )}

          {/* Documents/Files */}
          {studentData?.files && Object.keys(studentData?.files)?.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b-2 border-pink-200 pb-2 flex items-center gap-2">
                <FaFileImage className="text-pink-500" />
                Uploaded Documents
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Object.entries(studentData?.files || {})?.map(([key, url]) => {
                  if (!url) return null;
                  return (
                    <div 
                      key={key} 
                      className="border rounded-lg p-2 hover:shadow-lg transition-shadow cursor-pointer"
                      onClick={() => openImageModal(url, documentLabels?.[key] || formatFieldLabel(key))}
                    >
                      <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-2">
                        <img 
                          src={url} 
                          alt={documentLabels?.[key] || key}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = '';
                            e.target.alt = 'Image not available';
                            e.target.className = 'w-full h-full flex items-center justify-center bg-gray-200 text-gray-400 text-xs';
                          }}
                        />
                      </div>
                      <p className="text-sm text-center font-medium text-gray-700 truncate">
                        {documentLabels?.[key] || formatFieldLabel(key)}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Additional/New Fields (Auto-detected from API) */}
          {additionalFields?.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b-2 border-gray-200 pb-2 flex items-center gap-2">
                <FaIdCard className="text-gray-500" />
                Additional Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {additionalFields?.map((field) => (
                  <div key={field?.key}>
                    <label className="block text-sm font-medium text-gray-600">{field?.label}</label>
                    <p className="text-gray-800">{field?.value || 'Not provided'}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          </>
          )}
        </div>
      </div>

      {/* Image Modal */}
      {imageModal.open && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
          onClick={closeImageModal}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full">
            <button 
              onClick={closeImageModal}
              className="absolute -top-10 right-0 text-white text-xl hover:text-gray-300"
            >
              ✕ Close
            </button>
            <h3 className="text-white text-lg mb-2">{imageModal.title}</h3>
            <img 
              src={imageModal.src} 
              alt={imageModal.title}
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </Layout>
  )
}

export default StudentDetails