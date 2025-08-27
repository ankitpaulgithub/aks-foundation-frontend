"use client"
import React, { useState, useEffect } from 'react'
import Layout from '../../../../components/education/Layout'
import axios from 'axios'

const Admission = ({ initialData = null, isEdit = false }) => {
  const [stateData, setStateData] = useState({})
  const [districtData, setDistrictData] = useState({})
  // Configuration objects for form fields
  const bloodGroupOptions = [
    { value: 'A+', label: 'A+' }, { value: 'A-', label: 'A-' },
    { value: 'B+', label: 'B+' }, { value: 'B-', label: 'B-' },
    { value: 'AB+', label: 'AB+' }, { value: 'AB-', label: 'AB-' },
    { value: 'O+', label: 'O+' }, { value: 'O-', label: 'O-' }
  ]

  const maritalStatusOptions = [
    { value: 'Single', label: 'Single' }, { value: 'Married', label: 'Married' },
    { value: 'Divorced', label: 'Divorced' }, { value: 'Widowed', label: 'Widowed' }
  ]

  const categoryOptions = [
    { value: 'General', label: 'General' }, { value: 'OBC', label: 'OBC' },
    { value: 'EBC', label: 'EBC' }, { value: 'SC', label: 'SC' },
    { value: 'ST', label: 'ST' }, { value: 'EWS', label: 'EWS' }
  ]

  const areaOptions = [
    { value: 'Rural', label: 'Rural' }, { value: 'Urban', label: 'Urban' }
  ]

  const genderOptions = ['Male', 'Female', 'Other']

  const courseOptions = [
    { value: '10th', label: '10th' }, { value: '12th', label: '12th' },
    { value: 'Graduation', label: 'Graduation' }, { value: 'Post Graduation', label: 'Post Graduation' },
    { value: 'Other', label: 'Other Qualification' }
  ]

  const otherCourseOptions = [
    { value: 'DCA', label: 'DCA' }, { value: 'ADCA', label: 'ADCA' }
  ]

  const programOptions = [
    { value: 'KYP', label: 'KYP' }, { value: 'SHA', label: 'SHA' }
  ]

  const bankOptions = [
    { value: 'AirTel Money', label: 'AirTel Money' }, { value: 'Allahabad Bank', label: 'Allahabad Bank' },
    { value: 'Andhra Bank', label: 'Andhra Bank' }, { value: 'AXIS Bank', label: 'AXIS Bank' },
    { value: 'Bandhan Bank', label: 'Bandhan Bank' }, { value: 'Bank of Baroda', label: 'Bank of Baroda' },
    { value: 'Bank of India', label: 'Bank of India' }, { value: 'Bank of Maharastra', label: 'Bank of Maharastra' },
    { value: 'Bharatiya Mahila Bank', label: 'Bharatiya Mahila Bank' }, { value: 'Bihar Gramin Bank', label: 'Bihar Gramin Bank' },
    { value: 'BIHAR KSHETRIYA GRAMIN BANK', label: 'BIHAR KSHETRIYA GRAMIN BANK' }, { value: 'Bihar State CO-OP Bank LTD.', label: 'Bihar State CO-OP Bank LTD.' },
    { value: 'Canara Bank', label: 'Canara Bank' }, { value: 'Central Bank of India', label: 'Central Bank of India' },
    { value: 'Corporation Bank', label: 'Corporation Bank' }, { value: 'DCB Bank Limited', label: 'DCB Bank Limited' },
    { value: 'Dena Bank', label: 'Dena Bank' }, { value: 'Federal Bank', label: 'Federal Bank' },
    { value: 'FINO Payments Bank LTD.', label: 'FINO Payments Bank LTD.' }, { value: 'HDFC Bank', label: 'HDFC Bank' },
    { value: 'ICICI Bank', label: 'ICICI Bank' }, { value: 'IDBI Bank', label: 'IDBI Bank' },
    { value: 'IDFC Bank', label: 'IDFC Bank' }, { value: 'Indian Bank', label: 'Indian Bank' },
    { value: 'Indian Overseas Bank', label: 'Indian Overseas Bank' }, { value: 'Indian Post Bank', label: 'Indian Post Bank' },
    { value: 'Indusind Bank LTD.', label: 'Indusind Bank LTD.' }, { value: 'ING Vysya Bank', label: 'ING Vysya Bank' },
    { value: 'JANA Small Finance Bank LTD', label: 'JANA Small Finance Bank LTD' }, { value: 'JK Bank', label: 'JK Bank' },
    { value: 'Karnataka Bank', label: 'Karnataka Bank' }, { value: 'Karur VYSYA Bank', label: 'Karur VYSYA Bank' },
    { value: 'Kotak Mahindra Bank LTD.', label: 'Kotak Mahindra Bank LTD.' }, { value: 'Madhya Bihar Gramin Bank', label: 'Madhya Bihar Gramin Bank' },
    { value: 'Oriental Bank of Comm.', label: 'Oriental Bank of Comm.' }, { value: 'PAYTM Payments Bank LTD.', label: 'PAYTM Payments Bank LTD.' },
    { value: 'Punjab & Sind Bank', label: 'Punjab & Sind Bank' }, { value: 'Punjab National Bank', label: 'Punjab National Bank' },
    { value: 'RESERVE BANK OF INDIA, PAD', label: 'RESERVE BANK OF INDIA, PAD' }, { value: 'Samastipur Kshetriya Gramin Bank', label: 'Samastipur Kshetriya Gramin Bank' },
    { value: 'South Indian Bank', label: 'South Indian Bank' }, { value: 'Standard Chartered Bank LTD.', label: 'Standard Chartered Bank LTD.' },
    { value: 'State Bank of Hyderabad', label: 'State Bank of Hyderabad' }, { value: 'State Bank of India (SBI)', label: 'State Bank of India (SBI)' },
    { value: 'State Bank of Mysore', label: 'State Bank of Mysore' }, { value: 'State Bank of Patiala', label: 'State Bank of Patiala' },
    { value: 'State Bank of Travancore', label: 'State Bank of Travancore' }, { value: 'Syndicate Bank', label: 'Syndicate Bank' },
    { value: 'UCO Bank', label: 'UCO Bank' }, { value: 'Ujjivan Small Finance Bank Limited', label: 'Ujjivan Small Finance Bank Limited' },
    { value: 'Union Bank of India', label: 'Union Bank of India' }, { value: 'United Bank of India', label: 'United Bank of India' },
    { value: 'Utkarsh Small Finance Bank', label: 'Utkarsh Small Finance Bank' }, { value: 'Uttar Bihar Gramin Bank', label: 'Uttar Bihar Gramin Bank' },
    { value: 'Vijaya Bank', label: 'Vijaya Bank' }, { value: 'YES Bank', label: 'YES Bank' }
  ]

  const documentFields = [
    { name: 'studentImage', label: 'Student Image', required: true, accept: 'image/*' },
    { name: 'bankPasbook', label: 'Bank Pasbook', required: true, accept: 'image/*' },
    { name: 'residentialCertificate', label: 'Residential Certificate', required: true, accept: 'image/*' },
    { name: 'provisionalCertificate', label: 'Provisional Certificate', required: true, accept: 'image/*' },
    { name: 'aadhaarFront', label: 'Aadhaar Card Front', required: true, accept: 'image/*' },
    { name: 'aadhaarBack', label: 'Aadhar Card Back', required: true, accept: 'image/*' },
    { name: 'drccReceipt', label: 'DRCC Receipt', required: true, accept: 'image/*' },
    { name: 'counselorSignature', label: 'Counselor Signature', required: false, accept: '.pdf,.jpg,.jpeg,.png' },
    { name: 'applicantSignature', label: 'Applicant Signature', required: false, accept: '.pdf,.jpg,.jpeg,.png' }
  ]

  // Form field configurations
  const personalDetailsFields = [
    { name: 'firstName', label: 'First Name', required: true, type: 'text', placeholder: 'Enter first name' },
    { name: 'middleName', label: 'Middle Name', required: false, type: 'text', placeholder: 'Enter middle name' },
    { name: 'lastName', label: 'Last Name', required: true, type: 'text', placeholder: 'Enter last name' },
    { name: 'fatherName', label: 'Father\'s Name', required: true, type: 'text', placeholder: 'Enter father\'s full name' },
    { name: 'motherName', label: 'Mother\'s Name', required: true, type: 'text', placeholder: 'Enter mother\'s full name' },
    { name: 'dateOfBirth', label: 'Date of Birth', required: true, type: 'date' }
  ]

  const addressFields = [
    { name: 'villageName', label: 'Village Name', required: false, type: 'text', placeholder: 'Enter village/town name' },
    { name: 'pinCode', label: 'Pin Code', required: true, type: 'text', placeholder: '6 digit pin code', pattern: '[0-9]{6}', maxLength: '6' },
    { name: 'blockNagarNigam', label: 'Block / Nagar Nigam / Nagar Parishad / Panchayat', required: false, type: 'text', placeholder: 'Enter block/nagar nigam/nagar parishad/panchayat' },
    { name: 'postOffice', label: 'Post Office', required: false, type: 'text', placeholder: 'Enter post office name' }
  ]

  const mobileFields = [
    { name: 'mobile1', label: 'Mobile Number 1', required: true },
    { name: 'mobile2', label: 'Mobile Number 2', required: false },
    { name: 'mobile3', label: 'Mobile Number 3', required: false },
    { name: 'whatsapp', label: 'WhatsApp Number', required: false }
  ]

  const bankDetailFields = [
    { name: 'accountNumber', label: 'Account Number', placeholder: 'Enter account number' },
    { name: 'branchName', label: 'Branch Name', placeholder: 'Enter branch name' },
    { name: 'ifscCode', label: 'IFSC Code', placeholder: 'Enter IFSC code' }
  ]

  const addressTextareaFields = [
    { name: 'residentialAddress', label: 'Residential Address', required: true, placeholder: 'Enter your current residential address' },
    { name: 'permanentAddress', label: 'Permanent Address', required: false, placeholder: 'Enter your permanent address (if different from residential)' }
  ]

  const personalSelectFields = [
    { name: 'bloodGroup', label: 'Blood Group', required: false, options: bloodGroupOptions, placeholder: 'Select Blood Group' },
    { name: 'maritalStatus', label: 'Marital Status', required: false, options: maritalStatusOptions, placeholder: 'Select Marital Status' },
    { name: 'category', label: 'Category', required: true, options: categoryOptions, placeholder: 'Select Category' }
  ]

  const conditionalCertificates = [
    {
      show: (courseName) => courseName && courseName !== '10th',
      label: '10th Certificate'
    },
    {
      show: (courseName) => courseName && courseName !== '10th' && !courseName.startsWith('12th'),
      label: '12th Certificate'
    }
  ]

  const academicLevels = [
    {
      key: 'class10', title: 'Class 10th Information', alwaysRequired: true, fields: [
        { name: 'class10SessionYear', label: 'Session Year', placeholder: 'e.g., 2020-2021' },
        { name: 'class10RollNo', label: 'Roll No.', placeholder: 'e.g., 0000000' },
        { name: 'class10SchoolName', label: 'School Name', placeholder: 'School name' }
      ]
    },
    {
      key: 'class12', title: 'Class 12th Information', requiredFor: ['12th', 'Graduation', 'Post Graduation'], fields: [
        { name: 'class12SessionYear', label: 'Session Year', placeholder: 'e.g., 2022-2023' },
        { name: 'class12RollNo', label: 'Roll No.', placeholder: 'e.g., 0000000' },
        { name: 'class12SchoolName', label: 'School Name', placeholder: 'School name' }
      ]
    },
    {
      key: 'graduation', title: 'Graduation Information', requiredFor: ['Graduation', 'Post Graduation'], fields: [
        { name: 'graduationSessionYear', label: 'Session Year', placeholder: 'e.g., 2021-2025' },
        { name: 'graduationRollNo', label: 'Roll No.', placeholder: 'e.g., 0000000' },
        { name: 'graduationSchoolName', label: 'College/University Name', placeholder: 'College/University name' }
      ]
    },
    {
      key: 'postGraduation', title: 'Post Graduation Information', requiredFor: ['Post Graduation'], fields: [
        { name: 'postGraduationSessionYear', label: 'Session Year', placeholder: 'e.g., 2025-2027' },
        { name: 'postGraduationRollNo', label: 'Roll No.', placeholder: 'e.g., 0000000' },
        { name: 'postGraduationSchoolName', label: 'College/University Name', placeholder: 'College/University name' }
      ]
    }
  ]

  const officeUseOnlyFields = [
    { name: 'regNo', label: 'Reg. No.', type: 'text', placeholder: 'Enter registration number' },
    { name: 'regDate', label: 'Date', type: 'date' },
    { name: 'program', label: 'Program', type: 'text', placeholder: 'Enter program name' },
    { name: 'payment', label: 'Payment', type: 'text', placeholder: 'Enter payment amount' },
    { name: 'paymentDate', label: 'Payment Date', type: 'date' },
    { name: 'drccVerificationDate', label: 'DRCC Verification Date', type: 'date' },
    { name: 'learnerCode', label: 'Learner Code', type: 'text', placeholder: 'Enter learner code' },
    { name: 'batchStartDate', label: 'Batch Start Date', type: 'date' },
    { name: 'batch', label: 'Batch', type: 'text', placeholder: 'Enter batch name' },
    { name: 'batchCode', label: 'Batch Code', type: 'text', placeholder: 'Enter batch code' },
    { name: 'batchTime1', label: 'Batch Time 1', type: 'time' },
    { name: 'batchTime2', label: 'Batch Time 2', type: 'time' }
  ]

  const officeUseOnly2Fields = [
    { name: 'enrollmentNo', label: 'Enrollment No.', type: 'text', placeholder: 'Enter enrollment number' },
    { name: 'enrollmentDate', label: 'Enrollment Date', type: 'date' },
    { name: 'program2', label: 'Program', type: 'text', placeholder: 'Enter program name' },
    { name: 'courseDuration', label: 'Course Duration', type: 'text', placeholder: 'e.g., 6 months, 1 year' },
    { name: 'batchName', label: 'Batch Name', type: 'text', placeholder: 'Enter batch name' },
    { name: 'batchTime', label: 'Batch Time', type: 'time' },
    { name: 'certificateNo', label: 'Certificate No.', type: 'text', placeholder: 'Enter certificate number' },
    { name: 'dateOfIssue', label: 'Date of Issue', type: 'date' }
  ]

  const defaultFormData = {
    // Applicant Details
    firstName: '', middleName: '', lastName: '', asPerSSC: '',
    fatherName: '', motherName: '', dateOfBirth: '', gender: '',
    bloodGroup: '', maritalStatus: '', category: '', aadhaarNumber: '',
    mobile1: '', mobile2: '', mobile3: '', whatsapp: '', emailAddress: '',

    // Address Details
    residentialAddress: '', permanentAddress: '', state: '', area: '', district: '',
    villageName: '', pinCode: '', blockNagarNigam: '', postOffice: '',

    // Academic Details
    sessionYear: '', courseName: '', studentProgram: '',

    // Class Details
    class10SessionYear: '', class10RollNo: '', class10SchoolName: '',
    class12SessionYear: '', class12RollNo: '', class12SchoolName: '',
    graduationSessionYear: '', graduationRollNo: '', graduationSchoolName: '',
    postGraduationSessionYear: '', postGraduationRollNo: '', postGraduationSchoolName: '',

    // Bank Details
    bankName: '', accountNumber: '', branchName: '', ifscCode: '',

    // Documents
    studentImage: '', tenthCertificate: '', twelfthCertificate: '',
    counselorSignature: '', applicantSignature: '',

    // Additional fields
    otherCourseName: '',

    // Office Use Only fields
    regNo: '', regDate: '', program: '', payment: '', paymentDate: '',
    drccVerificationDate: '', learnerCode: '', batchStartDate: '', batch: '',
    batchCode: '', batchTime1: '', batchTime2: '', remarks: '',

    // Office Use Only 2 fields
    enrollmentNo: '', enrollmentDate: '', program2: '', courseDuration: '',
    batchName: '', batchTime: '', certificateNo: '', dateOfIssue: '', remarks2: ''
  }

  const [formData, setFormData] = useState(initialData || defaultFormData)
  const fetchDistrictData = async (stateName) => {
    try {
      const response = await axios.post('https://countriesnow.space/api/v0.1/countries/state/cities', {
        country: 'India',
        state: stateName
    })
      setDistrictData(response?.data)
    } catch (error) {
      console.error('Failed to fetch states', error)
    }
  }

  useEffect(() => {
    const fetchStateData = async () => {
      try {
        const response = await axios.post('https://countriesnow.space/api/v0.1/countries/states', {
          country: 'India'
        })
        setStateData(response.data)
      } catch (error) {
        console.error('Failed to fetch states', error)
      }
    }

    fetchStateData();

  }, [])
  useEffect(() => {
    if (initialData) setFormData(initialData)
  }, [initialData])

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  // Helper function to render select options
  const renderSelectOptions = (options, placeholder = 'Select option') => (
    <>
      <option value="">{placeholder}</option>
      {options.map(option => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </>
  )

  // Helper function to render input field
  const renderInputField = (field, required = false, type = 'text', pattern = null, maxLength = null) => (
    <div className="bg-orange-50 p-3 rounded">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {field.label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        required={required}
        pattern={pattern}
        maxLength={maxLength}
        value={formData[field.name] || ''}
        onChange={(e) => handleInputChange(field.name, e.target.value)}
        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none focus:border-transparent"
        placeholder={field.placeholder}
      />
    </div>
  )

  // Helper function to render select field
  const renderSelectField = (field, options, placeholder) => (
    <div className="bg-orange-50 p-3 rounded">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {field.label} {field.required && <span className="text-red-500">*</span>}
      </label>
      <select
        required={field.required}
        value={formData[field.name]}
        onChange={(e) => handleInputChange(field.name, e.target.value)}
        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none focus:border-transparent"
      >
        {renderSelectOptions(options, placeholder)}
      </select>
    </div>
  )

  // Helper function to render academic section
  const renderAcademicSection = (level) => {
    const shouldShow = level.alwaysRequired ||
      (level.requiredFor && level.requiredFor.includes(formData.courseName))

    if (!shouldShow) return null

    return (
      <div className="mt-6">
        <h3 className="text-lg font-medium text-gray-800 ml-3">{level.title}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {level.fields.map(field => (
            <div key={field.name} className="bg-orange-50 p-3 rounded">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.label} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData[field.name] || ''}
                onChange={(e) => handleInputChange(field.name, e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none focus:border-transparent"
                placeholder={field.placeholder}
              />
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Helper function to render office use only section
  const renderOfficeUseOnly = (fields, title, remarksField) => (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b-2 border-orange-200 pb-2">
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map(field => (
          <div key={field.name} className="bg-orange-50 p-3 rounded">
            <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
            <input
              type={field.type}
              value={formData[field.name] || ''}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none focus:border-transparent"
              placeholder={field.placeholder}
            />
          </div>
        ))}
      </div>
      <div className="mt-4">
        <div className="bg-orange-50 p-3 rounded">
          <label className="block text-sm font-medium text-gray-700 mb-1">Remarks</label>
          <textarea
            rows="3"
            value={formData[remarksField] || ''}
            onChange={(e) => handleInputChange(remarksField, e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none focus:border-transparent"
            placeholder="Enter any remarks or notes"
          />
        </div>
      </div>
    </div>
  )

  // Comprehensive validation function
  const validateForm = () => {
    const errors = []
    const requiredFields = [
      { field: 'firstName', label: 'First Name' }, { field: 'lastName', label: 'Last Name' },
      { field: 'fatherName', label: 'Father\'s Name' }, { field: 'motherName', label: 'Mother\'s Name' },
      { field: 'dateOfBirth', label: 'Date of Birth' }, { field: 'gender', label: 'Gender' },
      { field: 'category', label: 'Category' }, { field: 'aadhaarNumber', label: 'Aadhaar Number' },
      { field: 'mobile1', label: 'Mobile Number 1' }, { field: 'emailAddress', label: 'Email Address' },
      { field: 'area', label: 'Rural/Urban Area' }, { field: 'state', label: 'State' },
      { field: 'district', label: 'District' }, { field: 'pinCode', label: 'Pin Code' },
      { field: 'residentialAddress', label: 'Residential Address' }, { field: 'courseName', label: 'Course Name' }
    ]

    requiredFields.forEach(({ field, label }) => {
      if (!formData[field]?.trim()) errors.push(`${label} is required`)
    })

    // Validation patterns
    const validations = [
      { field: 'aadhaarNumber', pattern: /^[0-9]{12}$/, message: 'Aadhaar Number must be exactly 12 digits' },
      { field: 'mobile1', pattern: /^[0-9]{10}$/, message: 'Mobile Number 1 must be exactly 10 digits' },
      { field: 'mobile2', pattern: /^[0-9]{10}$/, message: 'Mobile Number 2 must be exactly 10 digits' },
      { field: 'mobile3', pattern: /^[0-9]{10}$/, message: 'Mobile Number 3 must be exactly 10 digits' },
      { field: 'whatsapp', pattern: /^[0-9]{10}$/, message: 'WhatsApp Number must be exactly 10 digits' },
      { field: 'pinCode', pattern: /^[0-9]{6}$/, message: 'Pin Code must be exactly 6 digits' },
      { field: 'emailAddress', pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Please enter a valid email address' }
    ]

    validations.forEach(({ field, pattern, message }) => {
      if (formData[field] && !pattern.test(formData[field])) errors.push(message)
    })

    // Course-specific validation
    if (formData.courseName === 'Other' && !formData.otherCourseName?.trim()) {
      errors.push('Please specify the course name when selecting "Other"')
    }

    // Academic validation
    academicLevels.forEach(level => {
      if (level.alwaysRequired || (level.requiredFor && level.requiredFor.includes(formData.courseName))) {
        level.fields.forEach(field => {
          if (!formData[field.name]?.trim()) {
            errors.push(`${field.label} is required`)
          }
        })
      }
    })

    return errors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validateForm()
    if (validationErrors.length > 0) {
      alert('Please fix the following errors:\n' + validationErrors.join('\n'))
      return
    }

    if (isEdit) {
      console.log('Student updated:', formData)
    } else {
      console.log('New student admission:', formData)
    }

    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('admissionForm', JSON.stringify(formData))
      }
    } catch (err) {
      console.error('Failed to persist admission form to localStorage', err)
    }
  }

  return (
    <Layout>
      <div className="bg-gray-100 min-h-screen p-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              {isEdit ? 'Edit Student Details' : 'New Student Admission'}
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
            {/* Applicant Personal Details */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b-2 border-orange-200 pb-2">
                Applicant Personal Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Personal Details Fields */}
                {personalDetailsFields.map(field => (
                  <div key={field.name} className="bg-orange-50 p-3 rounded">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {field.label} {field.required && <span className="text-red-500">*</span>}
                    </label>
                    <input
                      type={field.type}
                      required={field.required}
                      value={formData[field.name]}
                      onChange={(e) => handleInputChange(field.name, e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none focus:border-transparent"
                      placeholder={field.placeholder}
                    />
                  </div>
                ))}

                {/* As per SSC - Auto-generated */}
                <div className="bg-orange-50 p-3 rounded">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    As per SSC <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    disabled
                    value={`${formData.firstName} ${formData.middleName} ${formData.lastName}`}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none focus:border-transparent"
                    placeholder="Name as per SSC certificate"
                  />
                </div>

                {/* Gender */}
                <div className="bg-orange-50 p-3 rounded">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gender <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-4 mt-2">
                    {genderOptions.map(gender => (
                      <label key={gender} className="flex items-center">
                        <input
                          type="radio"
                          name="gender"
                          value={gender}
                          required
                          checked={formData.gender === gender}
                          onChange={(e) => handleInputChange('gender', e.target.value)}
                          className="mr-2"
                        />
                        {gender}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Select Fields */}
                {personalSelectFields.map(field => renderSelectField(field, field.options, field.placeholder))}

                {/* Aadhaar Number */}
                {renderInputField(
                  { name: 'aadhaarNumber', label: 'Aadhaar Number', placeholder: '12 digit Aadhaar number' },
                  true, 'text', '[0-9]{12}', '12'
                )}

                {/* Mobile Numbers */}
                {mobileFields.map(field => (
                  <div key={field.name} className="bg-orange-50 p-3 rounded">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {field.label} {field.required && <span className="text-red-500">*</span>}
                    </label>
                    <input
                      type="tel"
                      required={field.required}
                      pattern="[0-9]{10}"
                      maxLength="10"
                      value={formData[field.name]}
                      onChange={(e) => handleInputChange(field.name, e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none focus:border-transparent"
                      placeholder="10 digit mobile number"
                    />
                  </div>
                ))}

                {/* Email Address */}
                {renderInputField(
                  { name: 'emailAddress', label: 'Email Address', placeholder: 'Enter email address' },
                  true, 'email'
                )}
              </div>
            </div>

            {/* Address Details */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b-2 border-orange-200 pb-2">
                Address Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {/* Rural or urban */}
                {renderSelectField(
                  { name: 'area', label: 'Rural/Urban Area', required: true },
                  areaOptions, 'Select Area'
                )}

                {/* Address Fields */}
                <div className="bg-orange-50 p-3 rounded">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State  <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={formData.state}
                    onChange={(e) => {
                      const selectedState = e.target.value
                      handleInputChange('state', selectedState)
                      handleInputChange('district', '')
                      if (selectedState) {
                        fetchDistrictData(selectedState)
                      } else {
                        setDistrictData({})
                      }
                    }}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none focus:border-transparent"
                  >
                    <option value="">Select State</option>
                    {stateData && stateData?.data?.states && stateData?.data?.states?.length > 0 && stateData?.data?.states?.map((item) => (
                      <option key={item.name} value={item.name}>{item.name}</option>)
                    )}
                  </select>
                </div>

                <div className="bg-orange-50 p-3 rounded">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    District  <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={formData.district}
                    onChange={(e) => handleInputChange('district', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none focus:border-transparent"
                  >
                    <option value="">Select District</option>
                    {districtData && districtData?.data && districtData?.data?.length > 0 && districtData?.data?.map((item) => (
                      <option key={item} value={item}>{item}</option>)
                    )}
                  </select>
                </div>

                {addressFields.map(field => (
                  <div key={field.name} className="bg-orange-50 p-3 rounded">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {field.label} {field.required && <span className="text-red-500">*</span>}
                    </label>
                    <input
                      type={field.type}
                      required={field.required}
                      pattern={field.pattern}
                      maxLength={field.maxLength}
                      value={formData[field.name]}
                      onChange={(e) => handleInputChange(field.name, e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none focus:border-transparent"
                      placeholder={field.placeholder}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Address Textareas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-0">
              {addressTextareaFields.map(field => (
                <div key={field.name} className="bg-orange-50 p-3 rounded">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {field.label} {field.required && <span className="text-red-500">*</span>}
                  </label>
                  <textarea
                    required={field.required}
                    rows="3"
                    value={formData[field.name]}
                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none focus:border-transparent"
                    placeholder={field.placeholder}
                  />
                </div>
              ))}
            </div>

            {/* Academic Details */}
            <div className="mb-8 mt-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b-2 border-orange-200 pb-2">
                Academic Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Course Name */}
                {renderSelectField(
                  { name: 'courseName', label: 'Course Name', required: true },
                  courseOptions, 'Select Course'
                )}

                {/* Program */}
                {renderSelectField(
                  { name: 'studentProgram', label: 'Program', required: true },
                  programOptions, 'Select Program'
                )}

                {/* Manual Course Name Input for "Other" option */}
                {formData.courseName === 'Other' && (
                  renderSelectField(
                    { name: 'otherCourseName', label: 'Specify Course Name', required: true },
                    otherCourseOptions, 'Select Course'
                  )
                )}
              </div>

              {/* Academic Sections */}
              {academicLevels.map(level => renderAcademicSection(level))}
            </div>

            {/* Bank Details */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b-2 border-orange-200 pb-2">
                Bank Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Bank Name */}
                {renderSelectField(
                  { name: 'bankName', label: 'Bank Name', required: false },
                  bankOptions, 'Select Bank'
                )}

                {/* Bank Fields */}
                {bankDetailFields.map(field => (
                  <div key={field.name} className="bg-orange-50 p-3 rounded">
                    <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                    <input
                      type="text"
                      value={formData[field.name]}
                      onChange={(e) => handleInputChange(field.name, e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none focus:border-transparent"
                      placeholder={field.placeholder}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Documents & Attachments */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b-2 border-orange-200 pb-2">
                Documents & Attachments
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Document Fields */}
                {documentFields.map(field => (
                  <div key={field.name} className="bg-orange-50 p-3 rounded">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {field.label} {field.required && <span className="text-red-500">*</span>}
                    </label>
                    <input
                      type="file"
                      required={field.required}
                      accept={field.accept}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none focus:border-transparent"
                    />
                  </div>
                ))}

                {/* Conditional Certificates */}
                {conditionalCertificates.map((cert, index) => cert.show(formData.courseName) && (
                  <div key={index} className="bg-orange-50 p-3 rounded">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {cert.label} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="file"
                      required
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none focus:border-transparent"
                    />
                  </div>
                ))}

                {/* Password Field */}
                <div className="bg-orange-50 p-3 rounded">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input
                    type="text"
                    value={formData.ifscCode}
                    onChange={(e) => handleInputChange('ifscCode', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none focus:border-transparent"
                    placeholder="Enter password"
                  />
                </div>
              </div>
            </div>

            {/* Office Use Only - Conditional Rendering */}
            {formData.studentProgram === 'KYP' && renderOfficeUseOnly(officeUseOnlyFields, 'Office Use Only', 'remarks')}
            {formData.studentProgram === 'SHA' && renderOfficeUseOnly(officeUseOnly2Fields, 'Office Use Only', 'remarks2')}

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setFormData(defaultFormData)}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none cursor-pointer focus:ring-2 focus:ring-blue-500 outline-none"
              >
                Reset
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none cursor-pointer focus:ring-2 focus:ring-blue-500 outline-none"
              >
                {isEdit ? 'Update Student' : 'Submit Admission'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default Admission