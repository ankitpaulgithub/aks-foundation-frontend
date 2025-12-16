"use client"
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from '../../../../components/education/Layout'
import axios from 'axios'
import toast from 'react-hot-toast'
import { bankOptions , documentFields, occupationOptions, areaOptions, bloodGroupOptions, categoryOptions , maritalStatusOptions, addressFields, personalDetailsFields, officeUseOnly2Fields, officeUseOnlyFields,bankDetailFields,courseOptions, genderOptions, mobileFields, otherCourseOptions, programOptions, boardOptions } from '../../../../constants/BankOptions'
import { studentapi } from '../../../../mocks/student'


const Admission = ({ initialData = null }) => {
  const router = useRouter()
  const { edit: editId } = router?.query || {}
  
  const [isEditMode, setIsEditMode] = useState(false)
  const [loadingStudent, setLoadingStudent] = useState(false)
  const [stateData, setStateData] = useState([])
  const [districtData, setDistrictData] = useState([])
  const [loadingStates, setLoadingStates] = useState(false)
  const [loadingDistricts, setLoadingDistricts] = useState(false)
  const [pendingDistrict, setPendingDistrict] = useState(null) // To store district value while loading

  const batchMonths = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ]
  const batchYears = [ 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030 ]


  const paymentFields = [
    { 
      name: 'paymentAmount', 
      label: 'Payment Amount (₹)', 
      placeholder: 'Enter payment amount (max 4 digits)', 
      type: 'text', 
      pattern: '[0-9]{1,4}',
      maxLength: '4'
    },
    { 
      name: 'paymentDate', 
      label: 'Payment Date', 
      type: 'date', 
      disabled: true
    }
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
      name: 'tenthCertificate',
      // 10th certificate required for all qualifications (10th, 12th, Graduation, Post Graduation)
      show: (courseName) => courseName && ['10th', '12th', 'Graduation', 'Post Graduation'].includes(courseName),
      label: '10th Certificate'
    },
    {
      name: 'twelfthCertificate',
      // 12th certificate required for 12th, Graduation, Post Graduation
      show: (courseName) => courseName && ['12th', 'Graduation', 'Post Graduation'].includes(courseName),
      label: '12th Certificate'
    },
    {
      name: 'graduationCertificate',
      // Graduation certificate required for Graduation, Post Graduation
      show: (courseName) => courseName && ['Graduation', 'Post Graduation'].includes(courseName),
      label: 'Graduation Certificate'
    },
    {
      name: 'postGraduationCertificate',
      // Post Graduation certificate required for Post Graduation only
      show: (courseName) => courseName && courseName === 'Post Graduation',
      label: 'Post Graduation Certificate'
    }
  ]

  const academicLevels = [
    {
      key: 'class10', title: 'Class 10th Information', alwaysRequired: true, fields: [
        { name: 'class10PassingYear', label: 'Passing Year', placeholder: 'e.g., 2020',pattern: '[0-9]{4}', maxLength: '4', type: 'number' },
        { name: 'class10RollNo', label: 'Roll No.', placeholder: 'e.g., 0000000', pattern: '[0-9]{7}', maxLength: '7', type: 'number' },
        { name: 'class10RollCode', label: 'Roll Code', placeholder: 'e.g., 00000', pattern: '[0-9]{5}', maxLength: '5', type: 'number' },
        { name: 'class10Board', label: 'Board', type: 'select' },
        { name: 'class10Marks', label: 'Marks/Division', placeholder: 'e.g., 90', type: 'number', pattern: '[0-9]{1,3}', maxLength: '3' },
        { name: 'class10TotalMarks', label: 'Total Marks', placeholder: 'e.g., 90', type: 'number', pattern: '[0-9]{1,3}', maxLength: '3' },
        { name: 'class10Percentage', label: 'Percentage', placeholder: 'e.g., 90' },
        { name: 'class10SchoolName', label: 'School Name', placeholder: 'School name' },
        { name: 'class10SchoolAddress', label: 'School Address', placeholder: 'School Address' },
      ]
    },
    {
      key: 'class12', title: 'Class 12th Information', requiredFor: ['12th', 'Graduation', 'Post Graduation'], fields: [
        { name: 'class12PassingYear', label: 'Passing Year', placeholder: 'e.g., 2022', pattern: '[0-9]{4}', maxLength: '4', type: 'number' },
        { name: 'class12RollNo', label: 'Roll No.', placeholder: 'e.g., 00000000', pattern: '[0-9]{8}', maxLength: '8', type: 'number' },
        { name: 'class12SchoolName', label: 'School Name', placeholder: 'School name' },
        { name: 'class12SchoolAddress', label: 'School Address', placeholder: 'School Address' },
        { name: 'class12Marks', label: 'Marks/Division', placeholder: 'e.g., 90', type: 'number', pattern: '[0-9]{1,3}', maxLength: '3' },
        { name: 'class12TotalMarks', label: 'Total Marks', placeholder: 'e.g., 90' , type: 'number', pattern: '[0-9]{1,3}', maxLength: '3' },
        { name: 'class12Percentage', label: 'Percentage', placeholder: 'e.g., 90' },
        { name: 'class12Board', label: 'Board', type: 'select' },
        { name: 'class12RollCode', label: 'Roll Code', placeholder: 'e.g., 00000', pattern: '[0-9]{5}', maxLength: '5', type: 'number' }
      ]
    },
    {
      key: 'graduation', title: 'Graduation Information', requiredFor: ['Graduation', 'Post Graduation'], fields: [
        { name: 'graduationSessionYear', label: 'Passing Year', placeholder: 'e.g., 2021', pattern: '[0-9]{4}', maxLength: '4', type: 'number' },
        { name: 'graduationRollNo', label: 'Roll No.', placeholder: 'e.g., 0000000', pattern: '[0-9]{7}', maxLength: '7', type: 'number' },
        { name: 'graduationRollCode', label: 'Roll Code', placeholder: 'e.g., 00000', pattern: '[0-9]{5}', maxLength: '5', type: 'number' },
        { name: 'graduationMarks', label: 'Marks/Division', placeholder: 'e.g., 90', type: 'number', pattern: '[0-9]{1,3}', maxLength: '3' },
        { name: 'graduationTotalMarks', label: 'Total Marks', placeholder: 'e.g., 90' , type: 'number', pattern: '[0-9]{1,3}', maxLength: '3' },
        { name: 'graduationPercentage', label: 'Percentage', placeholder: 'e.g., 90' },
        { name: 'graduationBoard', label: 'Board', type: 'select' },
        { name: 'graduationSchoolName', label: 'College/University Name', placeholder: 'College/University name' },
        { name: 'graduationSchoolAddress', label: 'College/University Address', placeholder: 'College/University Address' }
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



  const defaultFormData = {
    // Applicant Details
    firstName: '', middleName: '', lastName: '', nameAsSSC: '',
    fatherName: '', fatherOccupation: '', fatherOccupationOther: '', motherName: '', dateOfBirth: '', gender: '',
    bloodGroup: '', maritalStatus: '', category: '', aadhaarNumber: '',
    mobile1: '', mobile2: '', mobile3: '', whatsapp: '', emailAddress: '',
    isPwD: false, disabilityType: '', disabilityCertificate: '',

    // Address Details
    residentialAddress: '', permanentAddress: '', state: '', stateCode: '', area: '', district: '',
    villageName: '', pinCode: '', blockNagarNigam: '', postOffice: '',

    // Academic Details
    sessionYear: '', courseName: '', studentProgram: '',

    // Class Details
    class10PassingYear: '', class10RollNo: '', class10RollCode: '', class10SchoolName: '',class10SchoolAddress:'', class10Marks: '', class10TotalMarks: '', class10Percentage: '', class10Board: '',
    class12PassingYear: '', class12RollNo: '', class12RollCode: '', class12SchoolName: '',class12SchoolAddress:'', class12Marks: '', class12TotalMarks: '', class12Percentage: '', class12Board: '',
    graduationSessionYear: '', graduationRollNo: '', graduationRollCode: '', graduationMarks: '', graduationTotalMarks: '', graduationPercentage: '', graduationBoard: '', graduationSchoolName: '',graduationSchoolAddress:'',
    postGraduationSessionYear: '', postGraduationRollNo: '', postGraduationSchoolName: '',

    // Bank Details
    bankName: '', bankNameOther: '', accountNumber: '', branchName: '', ifscCode: '',

    // Documents
  studentImage: '', bankPasbook: '', residentialCertificate: '', provisionalCertificate: '', aadhaarFront: '', aadhaarBack: '', drccReceipt: '', tenthCertificate: '', twelfthCertificate: '', graduationCertificate: '', postGraduationCertificate: '',
    counselorSignature: '', applicantSignature: '',

    // Additional fields
    otherCourseName: '',

    // Office Use Only fields
    regNo: '', regDate: '', program: '',
    drccVerificationDate: '', learnerCode: '', batchStartDate: '', batch: '',
    batchEndDate: '', batchTime1: '', batchTime2: '', remarks: '',

    // Office Use Only 2 fields
    enrollmentNo: '', enrollmentDate: '', program2: '', courseDuration: '',
    batchName: '', batchMonth: '', batchYear: '', batchTime: '', certificateNo: '', dateOfIssue: '', remarks2: '',password: '',

    // Payment Details
    paymentAmount: '', paymentDate: new Date().toISOString().split('T')[0]
  }

  const [formData, setFormData] = useState(initialData || defaultFormData)
  const [isSameAddress, setIsSameAddress] = useState(false)
  const [additionalAcademicLevels, setAdditionalAcademicLevels] = useState([])
  const [passwordEdited, setPasswordEdited] = useState(false)
  
  // Field validation errors state
  const [fieldErrors, setFieldErrors] = useState({
    aadhaarNumber: '',
    mobile1: '',
    emailAddress: '',
    regNo: ''
  })
  const [validatingFields, setValidatingFields] = useState({
    aadhaarNumber: false,
    mobile1: false,
    emailAddress: false,
    regNo: false
  })

  // Debounce timer refs
  const validationTimers = React.useRef({})

  /**
   * Validate a field against the backend to check if it already exists
   * @param {string} formField - Frontend field name (aadhaarNumber, mobile1, emailAddress, regNo)
   * @param {string} value - Value to validate
   */
  const validateFieldAsync = async (formField, value) => {
    // Map frontend field names to backend field names
    const fieldMapping = {
      'aadhaarNumber': 'aadhaarNo',
      'mobile1': 'mobileNo1',
      'emailAddress': 'email',
      'regNo': 'registrationNo'
    }

    const backendField = fieldMapping[formField]
    if (!backendField) return

    // Minimum length validation before API call
    const minLengths = {
      'aadhaarNumber': 12,
      'mobile1': 10,
      'emailAddress': 5,
      'regNo': 8
    }

    if (!value || value.length < minLengths[formField]) {
      setFieldErrors(prev => ({ ...prev, [formField]: '' }))
      return
    }

    // Set validating state
    setValidatingFields(prev => ({ ...prev, [formField]: true }))

    try {
      const result = await studentapi.validateField(backendField, value)
      
      if (result.exists) {
        setFieldErrors(prev => ({ ...prev, [formField]: result.message }))
      } else {
        setFieldErrors(prev => ({ ...prev, [formField]: '' }))
      }
    } catch (error) {
      console.error('Validation error:', error)
      setFieldErrors(prev => ({ ...prev, [formField]: '' }))
    } finally {
      setValidatingFields(prev => ({ ...prev, [formField]: false }))
    }
  }

  /**
   * Debounced validation - waits 500ms after user stops typing
   */
  const debouncedValidate = (formField, value) => {
    // Clear existing timer for this field
    if (validationTimers.current[formField]) {
      clearTimeout(validationTimers.current[formField])
    }

    // Set new timer
    validationTimers.current[formField] = setTimeout(() => {
      validateFieldAsync(formField, value)
    }, 500)
  }

  // Fetch states from API
  const fetchStateData = async () => {
    setLoadingStates(true)
    try {
      const response = await axios.get('https://www.india-location-hub.in/api/states')
      if (response.data?.success && response.data?.states) {
        setStateData(response.data.states)
      }
    } catch (error) {
      console.error('Failed to fetch states', error)
      toast.error('Failed to fetch states. Please try again.')
    } finally {
      setLoadingStates(false)
    }
  }

  // Fetch districts from API based on state code
  const fetchDistrictData = async (stateCode) => {
    setLoadingDistricts(true)
    try {
      const response = await axios.get(`https://www.india-location-hub.in/api/districts?state_code=${stateCode}`)
      if (response.data?.success && response.data?.districts) {
        const sortedDistricts = response.data.districts.sort((a, b) => a.name.localeCompare(b.name))
        setDistrictData(sortedDistricts)
        return sortedDistricts
      }
      return []
    } catch (error) {
      console.error('Failed to fetch districts', error)
      toast.error('Failed to fetch districts. Please try again.')
      return []
    } finally {
      setLoadingDistricts(false)
    }
  }

  // Fetch states on component mount
  useEffect(() => {
    fetchStateData()
  }, [])

  // Fetch student data when in edit mode
  useEffect(() => {
    const fetchStudentForEdit = async () => {
      if (!editId) {
        setIsEditMode(false)
        return
      }
      
      setIsEditMode(true)
      setLoadingStudent(true)
      
      try {
        // Try to get from localStorage first (set from details page)
        let studentData = null
        if (typeof window !== 'undefined') {
          const storedStudent = localStorage.getItem('student')
          if (storedStudent) {
            try {
              studentData = JSON.parse(storedStudent)
              // Clear after reading
              localStorage.removeItem('student')
            } catch (e) {
              console.error('Failed to parse stored student data:', e)
            }
          }
        }
        
        // If no stored data or ID doesn't match, fetch from API
        if (!studentData || (studentData._id !== editId && studentData.id !== editId)) {
          studentData = await studentapi.getStudentById(editId)
        }
        
        if (!studentData) {
          toast.error('Student not found')
          router.push('/(education)/students/list')
          return
        }
        
        // Map API data to form data structure
        const mappedFormData = mapApiDataToFormData(studentData)
        
        // If state is present, fetch districts first, then set form data with district
        if (studentData.stateCode || studentData.state) {
          let stateCode = studentData.stateCode
          
          // If we only have state name, find the code from stateData
          if (!stateCode && studentData.state) {
            const stateOption = stateData.find(s => s.name === studentData.state)
            stateCode = stateOption?.code
          }
          
          if (stateCode) {
            // Fetch districts and wait for completion
            const districts = await fetchDistrictData(stateCode)
            
            // Now set form data - district value will be available since districtData is loaded
            setFormData({
              ...mappedFormData,
              district: studentData.district || ''
            })
          } else {
            setFormData(mappedFormData)
          }
        } else {
          setFormData(mappedFormData)
        }
        
        toast.success('Student data loaded for editing')
      } catch (error) {
        console.error('Failed to fetch student for edit:', error)
        toast.error('Failed to load student data: ' + (error.message || 'Unknown error'))
      } finally {
        setLoadingStudent(false)
      }
    }
    
    if (router.isReady) {
      fetchStudentForEdit()
    }
  }, [editId, router.isReady, stateData])

  /**
   * Map API response data to form data structure
   * @param {Object} apiData - API response data
   * @returns {Object} - Mapped form data
   */
  const mapApiDataToFormData = (apiData) => {
    const a = apiData || {}
    
    // Extract registration number parts
    const regNo = a.registrationNo || ''
    const PREFIX = "CM7RKYP-"
    const PREFIX2 = "CM7RSHA-"
    
    // Extract numeric part from registration number (remove any prefix like CM7RKYP- or CM7RSHA-)
    let numericPart = ''
    if (regNo) {
      // Remove prefix pattern CM7R followed by 3 letters and a hyphen
      numericPart = regNo.replace(/^CM7R[A-Z]{3}-/, '')
    }
    
    // Format both regNo and enrollmentNo with their respective prefixes
    const formattedRegNo = numericPart ? PREFIX + numericPart : PREFIX
    const formattedEnrollmentNo = numericPart ? PREFIX2 + numericPart : PREFIX2
    
    return {
      // Applicant Details
      firstName: a.firstName || '',
      middleName: a.middleName || '',
      lastName: a.lastName || '',
      nameAsSSC: a.nameAsSSC || '',
      fatherName: a.fathersName || '',
      fatherOccupation: a.fatherOccupation || '',
      fatherOccupationOther: a.fatherOccupationOther || '',
      motherName: a.mothersName || '',
      dateOfBirth: a.dateOfBirth ? a.dateOfBirth.split('T')[0] : '',
      gender: a.gender || '',
      bloodGroup: a.bloodGroup || '',
      maritalStatus: a.maritalStatus || '',
      category: a.category || '',
      aadhaarNumber: a.aadhaarNo || '',
      mobile1: a.mobileNo1 || '',
      mobile2: a.mobileNo2 || '',
      mobile3: a.mobileNo3 || '',
      whatsapp: a.whatsappNo1 || '',
      emailAddress: a.email || '',
      isPwD: a.isPwD || false,
      disabilityType: a.disabilityType || '',
      disabilityCertificate: a.disabilityCertificate || '',

      // Address Details
      residentialAddress: a.address || '',
      permanentAddress: a.permanentAddress || '',
      state: a.state || '',
      stateCode: a.stateCode || '',
      area: a.area || '',
      district: a.district || '',
      villageName: a.villageName || '',
      pinCode: a.pincode || '',
      blockNagarNigam: a.blockNagarNigam || '',
      postOffice: a.postOffice || '',

      // Academic Details
      sessionYear: a.sessionYear || '',
      courseName: a.qualification || '',
      studentProgram: a.program || '',
      otherCourseName: a.specificCourseName || '',

      // Class 10th Details
      class10PassingYear: a.class10PassingYear || '',
      class10RollNo: a.class10RollNo || '',
      class10RollCode: a.class10RollCode || '',
      class10SchoolName: a.class10SchoolName || '',
      class10SchoolAddress: a.class10SchoolAddress || '',
      class10Marks: a.class10Marks || '',
      class10TotalMarks: a.class10TotalMarks || '',
      class10Percentage: a.class10Percentage || '',
      class10Board: a.class10Board || '',

      // Class 12th Details
      class12PassingYear: a.class12PassingYear || '',
      class12RollNo: a.class12RollNo || '',
      class12RollCode: a.class12RollCode || '',
      class12SchoolName: a.class12SchoolName || '',
      class12SchoolAddress: a.class12SchoolAddress || '',
      class12Marks: a.class12Marks || '',
      class12TotalMarks: a.class12TotalMarks || '',
      class12Percentage: a.class12Percentage || '',
      class12Board: a.class12Board || '',

      // Graduation Details
      graduationSessionYear: a.graduationSessionYear || '',
      graduationRollNo: a.graduationRollNo || '',
      graduationRollCode: a.graduationRollCode || '',
      graduationMarks: a.graduationMarks || '',
      graduationTotalMarks: a.graduationTotalMarks || '',
      graduationPercentage: a.graduationPercentage || '',
      graduationBoard: a.graduationBoard || '',
      graduationSchoolName: a.graduationSchoolName || '',
      graduationSchoolAddress: a.graduationSchoolAddress || '',

      // Post Graduation Details
      postGraduationSessionYear: a.postGraduationSessionYear || '',
      postGraduationRollNo: a.postGraduationRollNo || '',
      postGraduationSchoolName: a.postGraduationSchoolName || '',

      // Bank Details
      bankName: a.bankName || '',
      bankNameOther: a.bankNameOther || '',
      accountNumber: a.accountNumber || '',
      branchName: a.branchName || '',
      ifscCode: a.ifscCode || '',

      // Documents - store URLs for display (actual file upload will be handled separately)
      studentImage: a.files?.studentImage || '',
      bankPasbook: a.files?.bankPasbook || '',
      residentialCertificate: a.files?.residentialCertificate || '',
      provisionalCertificate: a.files?.provisionalCertificate || '',
      aadhaarFront: a.files?.aadhaarFront || '',
      aadhaarBack: a.files?.aadhaarBack || '',
      drccReceipt: a.files?.drccReceipt || '',
      tenthCertificate: a.files?.tenthCertificate || '',
      twelfthCertificate: a.files?.twelfthCertificate || '',
      graduationCertificate: a.files?.graduationCertificate || '',
      postGraduationCertificate: a.files?.postGraduationCertificate || '',
      counselorSignature: a.files?.counselorSignature || '',
      applicantSignature: a.files?.applicantSignature || '',

      // Office Use Only fields
      regNo: formattedRegNo,
      enrollmentNo: formattedEnrollmentNo,
      regDate: a.regDate || '',
      program: a.program || '',
      payment: a.payment || '',
      paymentDate: a.paymentDate || new Date().toISOString().split('T')[0],
      drccVerificationDate: a.drccVerificationDate || '',
      learnerCode: a.learnerCode || '',
      batchStartDate: a.batchStartDate || '',
      batch: a.batch || '',
      batchEndDate: a.batchEndDate || '',
      batchTime1: a.batchTime1 || '',
      batchTime2: a.batchTime2 || '',
      remarks: a.remarks || '',

      // Office Use Only 2 fields
      enrollmentDate: a.enrollmentDate || '',
      program2: a.program2 || '',
      courseDuration: a.courseDuration || '',
      batchName: a.batchName || '',
      batchMonth: a.batchMonth || '',
      batchYear: a.batchYear || '',
      batchTime: a.batchTime || '',
      certificateNo: a.certificateNo || '',
      dateOfIssue: a.dateOfIssue || '',
      remarks2: a.remarks2 || '',
      password: a.password || '',

      // Payment Details (not from existing payments, for new payment entry)
      paymentAmount: '',
      
      // Store the original ID for update
      _id: a._id || a.id || ''
    }
  }

  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
    } else {
      // Set payment date to today if not provided
      setFormData(prev => ({
        ...prev,
        paymentDate: prev.paymentDate || new Date().toISOString().split('T')[0],
        password: prev?.password || `${prev?.mobile1 || ''}@${prev?.firstName?.charAt(0)?.toUpperCase() || ''}`
      }))
    }
  }, [initialData])

  // Keep default password in sync with mobile1 and firstName until user edits password
  useEffect(() => {
    if (passwordEdited) return
    setFormData(prev => ({
      ...prev,
      password: `${prev.mobile1 || ''}@${prev?.firstName?.charAt(0)?.toUpperCase() || ''}`
    }))
  }, [formData.firstName, formData.mobile1, passwordEdited])

  const handleInputChange = (field, value) => {
    if (field === 'password') setPasswordEdited(true)
    setFormData(prev => {
      // sanitize specific fields before updating
      let sanitizedValue = value
      
      // Fields that should NOT be converted to uppercase
      const noUppercaseFields = [
        'emailAddress', 'password', 'paymentDate', 'dateOfBirth', 'regDate', 
        'drccVerificationDate', 'batchStartDate', 'batchEndDate', 'enrollmentDate', 
        'dateOfIssue', 'batchTime', 'batchTime1', 'batchTime2'
      ]
      
      // Convert to uppercase for text fields (except excluded ones)
      if (typeof value === 'string' && !noUppercaseFields.includes(field) && 
          !field.includes('Certificate') && !field.includes('Image') && !field.includes('Signature')) {
        sanitizedValue = value.toUpperCase()
      }
      
      if (field === 'ifscCode') {
        // Enforce IFSC format progressively: first 4 letters (A-Z), then up to 7 digits
        sanitizedValue = String(value || '').toUpperCase().replace(/[^A-Z0-9]/g, '')
        const letters = sanitizedValue.slice(0, 4).replace(/[^A-Z]/g, '')
        const digits = sanitizedValue.slice(4).replace(/[^0-9]/g, '').slice(0, 7)
        sanitizedValue = (letters + digits).slice(0, 11)
      }
      if (field === 'pinCode') {
        sanitizedValue = String(value || '').replace(/\D/g, '').slice(0, 6)
      }
      if (field === 'mobile1' || field === 'mobile2' || field === 'mobile3' || field === 'whatsapp') {
        sanitizedValue = String(value || '').replace(/\D/g, '').slice(0, 10)
      }

      const updated = { ...prev, [field]: sanitizedValue }
      // If checkbox is checked, sync both addresses bidirectionally
      if (isSameAddress) {
        if (field === 'permanentAddress') {
          updated.residentialAddress = value
        } else if (field === 'residentialAddress') {
          updated.permanentAddress = value
        }
      }
      
      // Auto-calculate percentage when marks or total marks change
      if (field === 'class10Marks' || field === 'class10TotalMarks') {
        const marks = parseFloat(field === 'class10Marks' ? value : prev.class10Marks) || 0
        const totalMarks = parseFloat(field === 'class10TotalMarks' ? value : prev.class10TotalMarks) || 0
        if (totalMarks > 0 && !isNaN(marks) && !isNaN(totalMarks)) {
          updated.class10Percentage = ((marks / totalMarks) * 100).toFixed(2)
        } else {
          updated.class10Percentage = ''
        }
      }
      const PREFIX = "CM7RKYP-"; // fixed prefix
      const PREFIX2 = "CM7RSHA-"; // fixed prefix

      if(field === 'regNo' || field === 'enrollmentNo'){
          // Prevent deleting the prefix
          if (!value.startsWith( field === 'regNo' ? PREFIX : PREFIX2)) {
            value = field === 'regNo' ? PREFIX : PREFIX2;
          }
          let numericPart = value.slice(7);
          numericPart = numericPart.replace(/\D/g, "");
          numericPart = numericPart.slice(0, 15);
          const finalValue =  (field === 'regNo' ? PREFIX : PREFIX2) + numericPart;
          field === 'regNo' ? updated.regNo = finalValue : updated.enrollmentNo = finalValue;
          
          // Sync enrollmentNo with regNo - when enrollmentNo is changed, also update regNo
          if (field === 'enrollmentNo') {
            // Extract just the numeric part and apply to regNo with its prefix
            updated.regNo = PREFIX + numericPart;
          }
          // Sync regNo with enrollmentNo - when regNo is changed, also update enrollmentNo
          if (field === 'regNo') {
            updated.enrollmentNo = PREFIX2 + numericPart;
          }
      }
      
      if (field === 'class12Marks' || field === 'class12TotalMarks') {
        const marks = parseFloat(field === 'class12Marks' ? value : prev.class12Marks) || 0
        const totalMarks = parseFloat(field === 'class12TotalMarks' ? value : prev.class12TotalMarks) || 0
        if (totalMarks > 0 && !isNaN(marks) && !isNaN(totalMarks)) {
          updated.class12Percentage = ((marks / totalMarks) * 100).toFixed(2)
        } else {
          updated.class12Percentage = ''
        }
      }
      
      if (field === 'graduationMarks' || field === 'graduationTotalMarks') {
        const marks = parseFloat(field === 'graduationMarks' ? value : prev.graduationMarks) || 0
        const totalMarks = parseFloat(field === 'graduationTotalMarks' ? value : prev.graduationTotalMarks) || 0
        if (totalMarks > 0 && !isNaN(marks) && !isNaN(totalMarks)) {
          updated.graduationPercentage = ((marks / totalMarks) * 100).toFixed(2)
        } else {
          updated.graduationPercentage = ''
        }
      }
      
      // Auto-calculate percentage for additional academic levels
      if (field.endsWith('Marks') || field.endsWith('TotalMarks')) {
        const levelKey = field.replace(/Marks$/, '').replace(/TotalMarks$/, '')
        if (levelKey.startsWith('additional_')) {
          const marksField = `${levelKey}Marks`
          const totalMarksField = `${levelKey}TotalMarks`
          const percentageField = `${levelKey}Percentage`
          
          const marks = parseFloat(field === marksField ? value : (prev[marksField] || 0)) || 0
          const totalMarks = parseFloat(field === totalMarksField ? value : (prev[totalMarksField] || 0)) || 0
          
          if (totalMarks > 0 && !isNaN(marks) && !isNaN(totalMarks)) {
            updated[percentageField] = ((marks / totalMarks) * 100).toFixed(2)
          } else {
            updated[percentageField] = ''
          }
        }
      }
      
      return updated
    })
  }

  const handleCheckboxChange = (e) => {
    const checked = e.target.checked
    setIsSameAddress(checked)
    if (checked) {
      // Copy permanent address to residential address (or vice versa if residential has value)
      setFormData(prev => {
        const addressToUse = prev.permanentAddress || prev.residentialAddress
        return {
          ...prev,
          permanentAddress: addressToUse,
          residentialAddress: addressToUse
        }
      })
    }
  }

  const handlePwDCheckboxChange = (e) => {
    const checked = e.target.checked
    setFormData(prev => ({
      ...prev,
      isPwD: checked,
      // Clear disability fields if unchecked
      disabilityType: checked ? prev.disabilityType : '',
      disabilityCertificate: checked ? prev.disabilityCertificate : ''
    }))
  }

  // Handler to update batch month/year and compute `batchName` (e.g., "Jan-2025")
  const handleBatchChange = (field, value) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: value }
      const month = field === 'batchMonth' ? value : (prev.batchMonth || '')
      const year = field === 'batchYear' ? value : (prev.batchYear || '')
      if (month && year) {
        updated.batchName = `${month}-${year}`
      } else {
        updated.batchName = ''
      }
      return updated
    })
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
  const renderInputField = (field, required = false, type = 'text', pattern = null, maxLength = null, inputMode = null) => (
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
        inputMode={inputMode}
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

  // Helper function to calculate percentage
  const calculatePercentage = (levelKey) => {
    const marksField = `${levelKey}Marks`
    const totalMarksField = `${levelKey}TotalMarks`
    const marks = parseFloat(formData[marksField]) || 0
    const totalMarks = parseFloat(formData[totalMarksField]) || 0
    
    if (totalMarks === 0 || isNaN(marks) || isNaN(totalMarks)) {
      return ''
    }
    
    const percentage = ((marks / totalMarks) * 100).toFixed(2)
    return percentage
  }

  // Function to add a new academic level
  const handleAddAcademicLevel = () => {
    const newLevelId = `additional_${Date.now()}`
    const newLevel = {
      key: newLevelId,
      title: 'Additional Academic Information',
      alwaysRequired: false,
      fields: [
        { name: `${newLevelId}Title`, label: 'Qualification Title', placeholder: 'e.g., Diploma, Certificate, etc.' },
        { name: `${newLevelId}PassingYear`, label: 'Passing Year', placeholder: 'e.g., 2020' },
        { name: `${newLevelId}RollNo`, label: 'Roll No.', placeholder: 'e.g., 0000000' },
        { name: `${newLevelId}RollCode`, label: 'Roll Code', placeholder: 'e.g., 0000000' },
        { name: `${newLevelId}Board`, label: 'Board/University', placeholder: 'e.g., CBSE, ICSE, University name etc.' },
        { name: `${newLevelId}Marks`, label: 'Marks/Division', placeholder: 'e.g., 90' },
        { name: `${newLevelId}TotalMarks`, label: 'Total Marks', placeholder: 'e.g., 100' },
        { name: `${newLevelId}Percentage`, label: 'Percentage', placeholder: 'e.g., 90' },
        { name: `${newLevelId}SchoolName`, label: 'School/College Name', placeholder: 'School/College name' }
      ]
    }
    
    setAdditionalAcademicLevels(prev => [...prev, newLevel])
    
    // Initialize form data for new level
    const newFormData = { ...formData }
    newLevel.fields.forEach(field => {
      newFormData[field.name] = ''
    })
    setFormData(newFormData)
  }

  // Function to remove an additional academic level
  const handleRemoveAcademicLevel = (levelKey) => {
    setAdditionalAcademicLevels(prev => prev.filter(level => level.key !== levelKey))
    
    // Remove form data for this level
    const updatedFormData = { ...formData }
    const levelToRemove = additionalAcademicLevels.find(l => l.key === levelKey)
    if (levelToRemove) {
      levelToRemove.fields.forEach(field => {
        delete updatedFormData[field.name]
      })
    }
    setFormData(updatedFormData)
  }

  // Helper function to render academic section
  const renderAcademicSection = (level, isAdditional = false) => {
    const shouldShow = isAdditional || level.alwaysRequired ||
      (level.requiredFor && level.requiredFor.includes(formData.courseName))

    if (!shouldShow) return null

    const isPercentageField = (fieldName) => fieldName.includes('Percentage')

    return (
      <div className="mt-6 bg-orange-50 p-1">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-medium text-gray-800 ml-2">{level.title}</h3>
          {isAdditional && (
            <button
              type="button"
              onClick={() => handleRemoveAcademicLevel(level.key)}
              className="bg-red-500 cursor-pointer text-white px-3 py-1 rounded hover:bg-red-600 text-sm mr-2"
            >
              Remove
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1 p-1">
            {level.fields.map(field => {
            const isPercentage = isPercentageField(field.name)
            const isSelectField = field.type === 'select'
            // Use stored percentage value, or calculate if not available
            const percentageValue = isPercentage 
              ? (formData[field.name] || calculatePercentage(level.key))
              : null
            
            return (
              <div key={field.name} className="bg-orange-50 p-1 rounded">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {field.label} <span className="text-red-500">*</span>
                </label>
                {isSelectField ? (
                  <select
                    required
                    value={formData[field.name] || ''}
                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none focus:border-transparent"
                  >
                    <option value="">Select Board</option>
                    {boardOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    required={!isPercentage}
                    disabled={isPercentage}
                    readOnly={isPercentage}
                    maxLength={field.maxLength}
                    pattern={field.pattern}
                    value={isPercentage ? percentageValue : (formData[field.name] || '')}
                    onChange={(e) => {
                      if (isPercentage) return
                      let value = e.target.value || ''
                      // If pattern expects digits only, strip non-digits
                      if (field.pattern && field.pattern.includes('0-9')) {
                        value = value.replace(/\D/g, '')
                      }
                      // If pattern expects uppercase letters (like IFSC), uppercase and strip invalid chars
                      if (field.pattern && field.pattern.includes('A-Z')) {
                        value = value.toUpperCase().replace(/[^A-Z0-9]/g, '')
                      }
                      if (field.maxLength) value = value.slice(0, field.maxLength)
                      handleInputChange(field.name, value)
                    }}
                    className={`w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none focus:border-transparent ${
                      isPercentage ? 'bg-gray-100 cursor-not-allowed' : ''
                    }`}
                    placeholder={field.placeholder}
                  />
                )}
              </div>
            )
          })}
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
            {
              field.type === 'checkbox' ? (
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="mr-2"
                    value={formData[field.name] || ''}
                    onChange={(e) => handleInputChange(field.name, e.target.checked)}
                    checked={formData[field.name] || false}
                  />
                  {field.label}
                </label>
              ) : field.name === 'regNo' ? (
                // Special handling for Registration Number with validation
                <>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                  <div className="relative">
                    <input
                      type={field.type}
                      value={formData[field.name] || ''}
                      maxLength={field?.maxLength}
                      onChange={(e) => {
                        handleInputChange(field.name, e.target.value)
                        debouncedValidate('regNo', e.target.value)
                      }}
                      onBlur={(e) => {
                        if (e.target.value && e.target.value.length >= 8) {
                          validateFieldAsync('regNo', e.target.value)
                        }
                      }}
                      className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none focus:border-transparent ${
                        fieldErrors.regNo ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder={field.placeholder}
                    />
                    {validatingFields.regNo && (
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                        Checking...
                      </span>
                    )}
                  </div>
                  {fieldErrors.regNo && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {fieldErrors.regNo}
                    </p>
                  )}
                </>
              ) : (
                <>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                  <input
                    type={field.type}
                    value={formData[field.name] || ''}
                    maxLength={field?.maxLength}
                    pattern={field?.pattern}
                    onChange={(e) => {
                      // For learnerCode, only allow digits and max 16 characters
                      if (field.name === 'learnerCode') {
                        const value = e.target.value.replace(/\D/g, '').slice(0, 16)
                        handleInputChange(field.name, value)
                      } else {
                        handleInputChange(field.name, e.target.value)
                      }
                    }}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none focus:border-transparent"
                    placeholder={field.placeholder}
                    inputMode={field.name === 'learnerCode' ? 'numeric' : undefined}
                  />
                </>
              )
            }
            
          </div>
        ))}
            <div className='bg-green-100 p-2'>
              <label className="block text-sm font-medium text-green-700 mb-1">Batch Name</label>
              <div className="flex items-center gap-2">
                <select
                  value={formData.batchMonth || ''}
                  onChange={(e) => handleBatchChange('batchMonth', e.target.value)}
                  className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="">Month</option>
                  {batchMonths.map(m => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>

                <select
                  value={formData.batchYear || ''}
                  onChange={(e) => handleBatchChange('batchYear', e.target.value)}
                  className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="">Year</option>
                  {batchYears.map(y => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>

                <input
                  type="text"
                  readOnly
                  value={formData.batchName || ''}
                  placeholder="Batch (auto)"
                  className="ml-2 p-2 border border-gray-300 rounded bg-gray-50"
                />
              </div>
            </div>
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
      { field: 'residentialAddress', label: 'Residential Address' }, { field: 'courseName', label: 'Course Name' },
      { field: 'studentProgram', label: 'Program' }, { field: 'regNo', label: 'Registration Number' }
    ]

    requiredFields.forEach(({ field, label }) => {
      const value = formData[field]
      if (!value || (typeof value === 'string' && !value.trim())) errors.push(`${label} is required`)
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

    // PwD validation
    if (formData.isPwD) {
      if (!formData.disabilityType?.trim()) {
        errors.push('Please specify the disability type')
      }
      if (!formData.disabilityCertificate) {
        errors.push('Disability Certificate is required')
      }
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Check for field validation errors (duplicate mobile, email, aadhaar)
    const hasFieldErrors = Object.values(fieldErrors).some(error => error !== '')
    if (hasFieldErrors) {
      const errorMessages = Object.entries(fieldErrors)
        .filter(([, error]) => error !== '')
        .map(([, error]) => error)
      toast.error('Please fix the following errors:\n' + errorMessages.join('\n'))
      return
    }

    // Check if any validation is still in progress
    const isValidating = Object.values(validatingFields).some(v => v)
    if (isValidating) {
      toast.error('Please wait, validation is in progress...')
      return
    }

    const validationErrors = validateForm()
    if (validationErrors.length > 0) {
      toast.error('Please fix the following errors:\n' + validationErrors.join('\n'))
      return
    }

    // Build multipart/form-data payload
    const fd = new FormData()

    // Map formData keys to expected backend schema keys
    const mapping = {
      firstName: 'firstName',
      middleName: 'middleName',
      lastName: 'lastName',
      motherName: 'mothersName',
      fatherName: 'fathersName',
      dateOfBirth: 'dateOfBirth',
      bloodGroup: 'bloodGroup',
      maritalStatus: 'maritalStatus',
      category: 'category',
      aadhaarNumber: 'aadhaarNo',
      mobile1: 'mobileNo1',
      mobile2: 'mobileNo2',
      mobile3: 'mobileNo3',
      whatsapp: 'whatsappNo1',
      emailAddress: 'email',
      area: 'area',
      state: 'state',
      district: 'district',
      pinCode: 'pincode',
      residentialAddress: 'address',
      courseName: 'qualification',
      otherCourseName: 'specificCourseName',
      batchName: 'batchName',
      batchMonth: 'batchMonth',
      batchYear: 'batchYear'
    }

    // Track which backend keys have been added to avoid duplicates
    const addedKeys = new Set()

    // Append mapped scalar fields
    Object.keys(mapping).forEach(k => {
      const value = formData[k]
      const backendKey = mapping[k]
      if (value !== undefined && value !== null && value !== '' && !addedKeys.has(backendKey)) {
        fd.append(backendKey, String(value))
        addedKeys.add(backendKey)
      }
    })

    // Add registrationNo (use regNo first, fallback to enrollmentNo - both have same numeric part)
    // Extract the full registration number from whichever field has value
    let registrationNo = ''
    if (formData.regNo && formData.regNo.length > 8) {
      registrationNo = formData.regNo
    } else if (formData.enrollmentNo && formData.enrollmentNo.length > 8) {
      // If only enrollmentNo has value, convert it to regNo format
      const numericPart = formData.enrollmentNo.replace(/^CM7R[A-Z]{3}-/, '')
      registrationNo = 'CM7RKYP-' + numericPart
    }
    if (registrationNo && !addedKeys.has('registrationNo')) {
      fd.append('registrationNo', String(registrationNo))
      addedKeys.add('registrationNo')
    }

    // Add program (use studentProgram)
    const program = formData.studentProgram || ''
    if (program && !addedKeys.has('program')) {
      fd.append('program', String(program))
      addedKeys.add('program')
    }

    // Auto-generate nameAsSSC from name parts
    const nameAsSSC = `${formData.firstName || ''} ${formData.middleName || ''} ${formData.lastName || ''}`.trim().replace(/\s+/g, ' ')
    if (nameAsSSC && !addedKeys.has('nameAsSSC')) {
      fd.append('nameAsSSC', nameAsSSC)
      addedKeys.add('nameAsSSC')
    }

    // Payments: if paymentAmount provided, include as payments array
    if (formData.paymentAmount) {
      const payments = [{ amount: Number(formData.paymentAmount), date: formData.paymentDate || '' }]
      fd.append('payments', JSON.stringify(payments))
    }

    // Append all file fields (if File object present) using their field names
    const fileFieldNames = ['studentImage','bankPasbook','residentialCertificate','provisionalCertificate','aadhaarFront','aadhaarBack','drccReceipt','tenthCertificate','twelfthCertificate','graduationCertificate','postGraduationCertificate','disabilityCertificate','counselorSignature','applicantSignature']
    
    // Add additional academic level certificate fields
    additionalAcademicLevels.forEach(level => {
      fileFieldNames.push(`${level.key}Certificate`)
    })
    
    fileFieldNames.forEach(name => {
      const file = formData[name]
      if (file) {
        // If it's an object with .name and .size, treat as File
        if (file instanceof File) {
          fd.append(name, file, file.name)
        } else if (typeof file === 'string') {
          // If only filename stored, append filename as metadata
          fd.append(name, file)
        }
      }
    })

    // Fields to exclude from the "remaining fields" loop (already handled above)
    const excludeFromRemaining = ['regNo', 'enrollmentNo', 'studentProgram', 'paymentAmount', 'paymentDate']

    // Append remaining fields that aren't files or previously mapped
    Object.entries(formData).forEach(([k, v]) => {
      if (!Object.keys(mapping).includes(k) && !fileFieldNames.includes(k) && !excludeFromRemaining.includes(k)) {
        if (v === null || v === undefined || v === '') return
        // Skip if this backend key was already added
        if (addedKeys.has(k)) return
        if (typeof v === 'object') {
          // stringify arrays/objects
          try { fd.append(k, JSON.stringify(v)) } catch { /* ignore */ }
        } else {
          fd.append(k, String(v))
        }
        addedKeys.add(k)
      }
    })

    // Build a plain payload object for inspection (no network calls)
    const payload = {}

    // Mapped scalar fields
    Object.keys(mapping).forEach(k => {
      const value = formData[k]
      if (value !== undefined && value !== null && value !== '') payload[mapping[k]] = value
    })

    // Include remaining scalar/primitive fields
    Object.entries(formData).forEach(([k, v]) => {
      if (!Object.keys(mapping).includes(k) && !fileFieldNames.includes(k) && !excludeFromRemaining.includes(k)) {
        payload[k] = v
      }
    })

    // Payments
    if (formData.paymentAmount) {
      payload.payments = [{ amount: Number(formData.paymentAmount), date: formData.paymentDate || '' }]
    }

    // Files metadata
    payload.files = {}
    fileFieldNames.forEach(name => {
      const file = formData[name]
      if (file) {
        if (typeof File !== 'undefined' && file instanceof File) {
          payload.files[name] = { fileName: file.name, size: file.size, type: file.type }
        } else if (typeof file === 'object' && file.name) {
          payload.files[name] = { fileName: file.name, size: file.size || null, type: file.type || null }
        } else {
          payload.files[name] = file
        }
      }
    })

    // Add special fields to payload for logging
    payload.nameAsSSC = nameAsSSC
    payload.registrationNo = registrationNo
    payload.program = program

    // Console log all data being submitted
    console.log('='.repeat(60))
    console.log('📋 FORM SUBMISSION DATA')
    console.log('='.repeat(60))
    
    // Log required fields check
    const requiredFieldsCheck = {
      firstName: payload.firstName,
      lastName: payload.lastName,
      nameAsSSC: payload.nameAsSSC,
      mothersName: payload.mothersName,
      fathersName: payload.fathersName,
      dateOfBirth: payload.dateOfBirth,
      category: payload.category,
      aadhaarNo: payload.aadhaarNo,
      mobileNo1: payload.mobileNo1,
      email: payload.email,
      registrationNo: payload.registrationNo,
      area: payload.area,
      state: payload.state,
      district: payload.district,
      pincode: payload.pincode,
      address: payload.address,
      qualification: payload.qualification,
      program: payload.program
    }
    
    console.log('📌 Required Fields:')
    Object.entries(requiredFieldsCheck).forEach(([key, value]) => {
      const status = value ? '✅' : '❌'
      console.log(`  ${status} ${key}: ${value || 'MISSING'}`)
    })
    
    console.log('\n📌 All Payload Fields:')
    console.table(payload)
    
    console.log('\n📁 Files attached:')
    console.table(payload.files)
    
    console.log('\n📦 Full payload object:', payload)
    console.log('='.repeat(60))

    // Save to localStorage for persistence
    if (typeof window !== 'undefined') {
      try { 
        localStorage.setItem('admissionForm', JSON.stringify(formData))
        localStorage.setItem('admissionFormPayload', JSON.stringify(payload)) 
      } catch(e) { /* ignore */ }
    }

    // Send to backend API using FormData (for file upload support)
    try {
      let response
      
      if (isEditMode && (formData._id || editId)) {
        // Update existing student
        const studentId = formData._id || editId
        response = await studentapi.updateStudent(studentId, fd)
        console.log('✅ Update response:', response)
        
        if (response?.status === 'SUCCESS') {
          toast.success('Student details updated successfully!')
          
          // Clear localStorage
          if (typeof window !== 'undefined') {
            localStorage.removeItem('admissionForm')
            localStorage.removeItem('admissionFormPayload')
            localStorage.removeItem('student')
          }
          
          // Redirect to student details page
          router.push(`/(education)/students/details/${studentId}`)
        } else {
          toast.error('Update failed. Check console for details.')
        }
      } else {
        // Create new student
        response = await studentapi.createStudent(fd)
        console.log('✅ Submission response:', response)
        
        if (response?.status === 'SUCCESS') {
          toast.success('Student admission submitted successfully!')
          
          // Clear localStorage
          if (typeof window !== 'undefined') {
            localStorage.removeItem('admissionForm')
            localStorage.removeItem('admissionFormPayload')
          }
          
          // Reset form to default values
          setFormData(defaultFormData)
          setIsSameAddress(false)
          setAdditionalAcademicLevels([])
          setPasswordEdited(false)
          setFieldErrors({
            aadhaarNumber: '',
            mobile1: '',
            emailAddress: '',
            regNo: ''
          })
          
          // Redirect to student details page with the new student ID
          const studentId = response?.data?.id || response?.data?._id
          if (studentId) {
            router.push(`/(education)/students/details/${studentId}`)
          } else {
            // Fallback to student list if no ID returned
            router.push('/(education)/students/list')
          }
        } else {
          toast.error('Submission failed. Check console for details.')
        }
      }
    } catch (err) {
      console.error('❌ Failed to submit:', err)
      toast.error(`Failed to ${isEditMode ? 'update' : 'submit'}: ` + (err.message || 'Unknown error'))
    }
  }

  return (
    <Layout>
      <div className="bg-gray-100 min-h-screen p-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              {isEditMode ? 'Edit Student Details' : 'New Student Admission'}
            </h1>
          </div>

          {/* Loading state for edit mode */}
          {loadingStudent ? (
            <div className="bg-white rounded-lg shadow-md p-12 flex items-center justify-center">
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                <p className="mt-4 text-gray-600">Loading student data...</p>
              </div>
            </div>
          ) : (
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
                      className="w-full p-2 uppercase border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none focus:border-transparent"
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
                    id='nameAsSSC'
                    name='nameAsSSC'
                    value={`${formData.firstName} ${formData.middleName} ${formData.lastName}`}
                    className="w-full p-2 border uppercase text-gray-500 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none focus:border-transparent"
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
                {personalSelectFields.map(field => (
                  <div key={field.name}>
                    {renderSelectField(field, field.options, field.placeholder)}
                  </div>
                ))}

                {/* Aadhaar Number */}
                <div className="bg-orange-50 p-3 rounded">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Aadhaar Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      pattern="[0-9]{12}"
                      maxLength="12"
                      value={formData.aadhaarNumber || ''}
                      onChange={(e) => {
                        // Only allow numeric characters and limit to 12 digits
                        const value = e.target.value.replace(/\D/g, '').slice(0, 12);
                        handleInputChange('aadhaarNumber', value);
                        // Trigger validation after typing
                        debouncedValidate('aadhaarNumber', value);
                      }}
                      onBlur={(e) => {
                        // Validate on blur as well
                        if (e.target.value.length === 12) {
                          validateFieldAsync('aadhaarNumber', e.target.value);
                        }
                      }}
                      className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none focus:border-transparent ${
                        fieldErrors.aadhaarNumber ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder="12 digit Aadhaar number"
                      inputMode="numeric"
                    />
                    {validatingFields.aadhaarNumber && (
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                        Checking...
                      </span>
                    )}
                  </div>
                  {fieldErrors.aadhaarNumber && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {fieldErrors.aadhaarNumber}
                    </p>
                  )}
                </div>

                {/* Mobile Numbers */}
                {mobileFields.map(field => (
                  <div key={field.name} className="bg-orange-50 p-3 rounded">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {field.label} {field.required && <span className="text-red-500">*</span>}
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        inputMode="numeric"
                        required={field.required}
                        pattern="[0-9]{10}"
                        maxLength="10"
                        value={formData[field.name] || ''}
                        onChange={(e) => {
                          const raw = e.target.value || '';
                          const digits = raw.replace(/\D/g, '').slice(0, 10);
                          handleInputChange(field.name, digits);
                          // Only validate mobile1 (primary mobile)
                          if (field.name === 'mobile1') {
                            debouncedValidate('mobile1', digits);
                          }
                        }}
                        onBlur={(e) => {
                          // Validate on blur for mobile1
                          if (field.name === 'mobile1' && e.target.value.length === 10) {
                            validateFieldAsync('mobile1', e.target.value);
                          }
                        }}
                        className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none focus:border-transparent ${
                          field.name === 'mobile1' && fieldErrors.mobile1 ? 'border-red-500 bg-red-50' : 'border-gray-300'
                        }`}
                        placeholder="10 digit mobile number"
                      />
                      {field.name === 'mobile1' && validatingFields.mobile1 && (
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                          Checking...
                        </span>
                      )}
                    </div>
                    {field.name === 'mobile1' && fieldErrors.mobile1 && (
                      <p className="text-red-500 text-sm mt-1 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {fieldErrors.mobile1}
                      </p>
                    )}
                  </div>
                ))}

                {/* Email Address */}
                <div className="bg-orange-50 p-3 rounded">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={formData.emailAddress || ''}
                      onChange={(e) => {
                        handleInputChange('emailAddress', e.target.value);
                        debouncedValidate('emailAddress', e.target.value);
                      }}
                      onBlur={(e) => {
                        if (e.target.value && e.target.value.includes('@')) {
                          validateFieldAsync('emailAddress', e.target.value);
                        }
                      }}
                      className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none focus:border-transparent ${
                        fieldErrors.emailAddress ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder="Enter email address"
                    />
                    {validatingFields.emailAddress && (
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                        Checking...
                      </span>
                    )}
                  </div>
                  {fieldErrors.emailAddress && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {fieldErrors.emailAddress}
                    </p>
                  )}
                </div>

                {/* Father's Occupation */}
                <div className="bg-orange-50 p-3 rounded">
                  <label className="block text-sm font-medium text-gray-700 ">
                    Father's Occupation
                  </label>
                  <select
                    value={formData.fatherOccupation || ''}
                    onChange={(e) => handleInputChange('fatherOccupation', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none focus:border-transparent"
                  >
                    <option value="">Select Occupation</option>
                    {occupationOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                  {formData.fatherOccupation === 'Other' && (
                    <input
                      type="text"
                      value={formData.fatherOccupationOther || ''}
                      onChange={(e) => handleInputChange('fatherOccupationOther', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none focus:border-transparent mt-2 uppercase"
                      placeholder="Enter occupation"
                    />
                  )}
                </div>

                {/* Person with Disability (PwD) */}
                <div className="bg-orange-50 p-3 rounded">
                  <label htmlFor="pwdCheckbox" className="flex items-center cursor-pointer mb-2">
                    <input
                      type="checkbox"
                      id="pwdCheckbox"
                      checked={formData.isPwD || false}
                      onChange={handlePwDCheckboxChange}
                      className="mr-2 cursor-pointer"
                    />
                    <span className="text-sm font-medium text-gray-700">Person with Disability (PwD)</span>
                  </label>
                  {formData.isPwD && (
                    <>
                      <input
                        type="text"
                        value={formData.disabilityType || ''}
                        onChange={(e) => handleInputChange('disabilityType', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none focus:border-transparent mt-2 uppercase"
                        placeholder="Specify disability type"
                      />
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Address Details */}
            <div className="mb-4">
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
                    disabled={loadingStates}
                    value={formData.stateCode || ''}
                    onChange={(e) => {
                      const selectedOption = e.target.options[e.target.selectedIndex]
                      const selectedStateName = selectedOption.text
                      const selectedStateCode = e.target.value
                      // set state name and reset district
                      handleInputChange('state', selectedStateName === 'Select State' ? '' : selectedStateName)
                      handleInputChange('stateCode', selectedStateCode)
                      handleInputChange('district', '')
                      // fetch districts for selected state
                      if (selectedStateCode) {
                        fetchDistrictData(selectedStateCode)
                      } else {
                        setDistrictData([])
                      }
                    }}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none focus:border-transparent"
                  >
                    <option value="">{loadingStates ? 'Loading states...' : 'Select State'}</option>
                    {Array.isArray(stateData) && stateData.map((item) => (
                      <option key={item.code} value={item.code}>{item.name}</option>
                    ))}
                  </select>
                </div>

                <div className="bg-orange-50 p-3 rounded">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    District  <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    disabled={loadingDistricts || !formData.stateCode}
                    value={formData.district}
                    onChange={(e) => handleInputChange('district', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none focus:border-transparent"
                  >
                    <option value="">
                      {loadingDistricts ? 'Loading districts...' : !formData.stateCode ? 'Select state first' : 'Select District'}
                    </option>
                    {Array.isArray(districtData) && districtData.map((item) => (
                      <option key={item.code} value={item.name}>{item.name}</option>
                    ))}
                  </select>
                </div>

                {addressFields.map(field => (
                  <div key={field.name} className="bg-orange-50 p-3 rounded">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {field.label} {field.required && <span className="text-red-500">*</span>}
                    </label>
                    <input
                      type={field.type || 'text'}
                      required={field.required}
                      pattern={field.pattern}
                      maxLength={field.maxLength}
                      value={formData[field.name] || ''}
                      onChange={(e) => {
                        let value = e.target.value || ''
                        // If pattern expects digits only, strip non-digits
                        if (field.pattern && field.pattern.includes('0-9')) {
                          value = value.replace(/\D/g, '')
                        }
                        // If pattern expects uppercase letters (like IFSC), uppercase and strip invalid chars
                        if (field.pattern && field.pattern.includes('A-Z')) {
                          value = value.toUpperCase().replace(/[^A-Z0-9]/g, '')
                        }
                        if (field.maxLength) value = value.slice(0, field.maxLength)
                        handleInputChange(field.name, value)
                      }}
                      className="w-full p-2 border uppercase border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none focus:border-transparent"
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

            {/* check box for residential address */}
            <div className='mt-2 mb-6'>
              <label htmlFor="sameAddressCheckbox" className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="sameAddressCheckbox"
                  id="sameAddressCheckbox"
                  className='mr-2 cursor-pointer'
                  checked={isSameAddress}
                  onChange={handleCheckboxChange}
                />
                <span>Residential Address is same as permanent address</span>
              </label>
            </div>

            {/* Academic Details */}
            <div className="mb-8 mt-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b-2 border-orange-200 pb-2">
                Academic Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Course Name */}
                {renderSelectField(
                  { name: 'courseName', label: 'Qualification', required: true },
                  courseOptions, 'Select Course'
                )}

                {/* Program */}
                {renderSelectField(
                  { name: 'studentProgram', label: 'Program', required: true },
                  programOptions, 'Select Program'
                )}

                {/* Manual Course Name Input for "Other" option (render as radio buttons) */}
                <div className="bg-orange-50 p-3 rounded">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Specify Course Name</label>
                  <div className="flex flex-wrap gap-4 mt-2">
                    {otherCourseOptions.map(opt => (
                      <label key={opt.value} className="flex items-center">
                        <input
                          type="radio"
                          name="otherCourseName"
                          value={opt.value}
                          checked={formData.otherCourseName === opt.value}
                          onChange={(e) => handleInputChange('otherCourseName', e.target.value)}
                          className="mr-2"
                        />
                        {opt.label}
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Academic Sections */}
              {academicLevels.map(level => (
                <div key={level.key}>
                  {renderAcademicSection(level)}
                </div>
              ))}

              {/* Additional Academic Levels */}
              {additionalAcademicLevels.map(level => (
                <div key={level.key}>
                  {renderAcademicSection(level, true)}
                </div>
              ))}

              <button 
                type="button"
                onClick={handleAddAcademicLevel}
                className="bg-orange-400 cursor-pointer text-white px-4 py-2 my-2 rounded hover:bg-orange-600"
              >
                Add more academic details
              </button>
            </div>

            {/* Bank Details */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b-2 border-orange-200 pb-2">
                Bank Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Bank Name */}
                <div className="bg-orange-50 p-3 rounded">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bank Name
                  </label>
                  <select
                    value={formData.bankName || ''}
                    onChange={(e) => handleInputChange('bankName', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none focus:border-transparent"
                  >
                    <option value="">Select Bank</option>
                    {bankOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                  {formData.bankName === 'Other' && (
                    <input
                      type="text"
                      value={formData.bankNameOther || ''}
                      onChange={(e) => handleInputChange('bankNameOther', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none focus:border-transparent mt-2 uppercase"
                      placeholder="Enter bank name"
                    />
                  )}
                </div>

                {/* Bank Fields */}
                {bankDetailFields.map(field => (
                  <div key={field.name} className="bg-orange-50 p-3 rounded">
                    <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                    <input
                      type={field.type || 'text'}
                      pattern={field.pattern}
                      maxLength={field.maxLength}
                      value={formData[field.name] || ''}
                      onChange={(e) => {
                        let value = e.target.value || ''
                        // Skip generic pattern handling for ifscCode - it has special handling in handleInputChange
                        if (field.name !== 'ifscCode') {
                          if (field.pattern && field.pattern.includes('0-9') && !field.pattern.includes('A-Z')) {
                            value = value.replace(/\D/g, '')
                          }
                          if (field.pattern && field.pattern.includes('A-Z')) {
                            value = value.toUpperCase().replace(/[^A-Z0-9]/g, '')
                          }
                          if (field.maxLength) value = value.slice(0, field.maxLength)
                        }
                        handleInputChange(field.name, value);
                      }}
                      className="w-full p-2 border uppercase border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none focus:border-transparent"
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
                      accept="image/*"
                      capture="camera"
                      onChange={(e) => handleInputChange(field.name, e.target.files[0] || null)}
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
                      onChange={(e) => handleInputChange(cert.name, e.target.files[0] || null)}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none focus:border-transparent"
                    />
                  </div>
                ))}

                {/* Additional Academic Level Certificates */}
                {additionalAcademicLevels.map((level) => (
                  <div key={`cert_${level.key}`} className="bg-orange-50 p-3 rounded">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {formData[`${level.key}Title`] || 'Additional Academic'} Certificate <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="file"
                      required
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleInputChange(`${level.key}Certificate`, e.target.files[0] || null)}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none focus:border-transparent"
                    />
                  </div>
                ))}

                {/* Disability Certificate - Conditional */}
                {formData.isPwD && (
                  <div className="bg-orange-50 p-3 rounded">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Disability Certificate <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="file"
                      required
                      accept=".pdf,.jpg,.jpeg,.png,image/*"
                      onChange={(e) => handleInputChange('disabilityCertificate', e.target.files[0] || null)}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none focus:border-transparent"
                    />
                  </div>
                )}

                {/* Password Field */}
                <div className="bg-orange-50 p-3 rounded">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input
                    type="text"
                    value={formData.password || ''}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none focus:border-transparent"
                    placeholder="Enter password"
                  />
                </div>
              </div>
            </div>

            {/* Office Use Only - Conditional Rendering */}
            {formData.studentProgram === 'KYP' && renderOfficeUseOnly(officeUseOnlyFields, 'Office Use Only', 'remarks')}
            {formData.studentProgram === 'SHA' && renderOfficeUseOnly(officeUseOnly2Fields, 'Office Use Only', 'remarks2')}

            {/* Payment Details */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b-2 border-orange-200 pb-2">
                Payment Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {paymentFields.map(field => (
                  <div key={field.name} className="bg-orange-50 p-3 rounded">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      disabled={field.disabled}
                      value={field.name === 'paymentDate' 
                        ? (formData[field.name] || new Date().toISOString())
                        : (formData[field.name] || '')
                      }
                      onChange={(e) => {
                        // For paymentAmount, only allow digits and max 4 characters
                        if (field.name === 'paymentAmount') {
                          const value = e.target.value.replace(/\D/g, '').slice(0, 4)
                          handleInputChange(field.name, value)
                        } else {
                          handleInputChange(field.name, e.target.value)
                        }
                      }}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none focus:border-transparent"
                      placeholder={field.placeholder}
                      maxLength={field.maxLength}
                      pattern={field.pattern}
                      inputMode={field.name === 'paymentAmount' ? 'numeric' : undefined}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setFormData({ ...defaultFormData, paymentDate: new Date().toISOString().split('T')[0] })}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none cursor-pointer focus:ring-2 focus:ring-blue-500 outline-none"
              >
                Reset
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none cursor-pointer focus:ring-2 focus:ring-blue-500 outline-none"
              >
                {isEditMode ? 'Update Student' : 'Submit Admission'}
              </button>
            </div>
          </form>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default Admission