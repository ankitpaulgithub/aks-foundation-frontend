"use client"
import React, { useState, useEffect } from 'react'
import Layout from '../../../../components/education/Layout'

/*
  Usage Examples:
  
  // For creating a new student:
  <Admission />
  
  // For editing an existing student:
  <Admission 
    initialData={{
      firstName: 'RAMESH',
      lastName: 'KUMAR',
      asPerSSC: 'RAMESH KUMAR',
      fatherName: 'SURESH KUMAR',
      // ... other student data
    }}
    isEdit={true}
  />
*/

const Admission = ({ initialData = null, isEdit = false }) => {
  const defaultFormData = {
    // Applicant Details
    firstName: '',
    lastName: '',
    asPerSSC: '',
    fatherName: '',
    motherName: '',
    dateOfBirth: '',
    gender: '',
    bloodGroup: '',
    maritalStatus: '',
    category: '',
    aadhaarNumber: '',
    mobile1: '',
    mobile2: '',
    mobile3: '',
    emailAddress: '',
    
    // Address Details
    residentialAddress: '',
    permanentAddress: '',
    state: '',
    district: '',
    villageName: '',
    pinCode: '',
    blockNagarNigam: '',
    postOffice: '',
    
    // Academic Details
    sessionYear: '',
    courseName: '',
    
    // Bank Details
    bankName: '',
    accountNumber: '',
    branchName: '',
    ifscCode: '',
    
    // Documents
    studentImage: '',
    tenthCertificate: '',
    twelfthCertificate: '',
    counselorSignature: '',
    applicantSignature: '',
    
    // Additional fields
    otherCourseName: ''
  }

  const [formData, setFormData] = useState(initialData || defaultFormData)

  // Update form data when initialData prop changes
  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
    }
  }, [initialData])

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validate conditional requirements
    if (formData.courseName === 'Other' && !formData.otherCourseName?.trim()) {
      alert('Please specify the course name when selecting "Other"')
      return
    }
    
    if (isEdit) {
      console.log('Student updated:', formData)
      // Handle update logic here
    } else {
      console.log('New student admission:', formData)
      // Handle create logic here
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
                {/* First Name */}
                <div className="bg-orange-50 p-3 rounded">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none focus:border-transparent"
                    placeholder="Enter first name"
                  />
                </div>

                {/* Last Name */}
                <div className="bg-orange-50 p-3 rounded">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none focus:border-transparent"
                    placeholder="Enter last name"
                  />
                </div>

                {/* As per SSC */}
                <div className="bg-orange-50 p-3 rounded">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    As per SSC <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.asPerSSC}
                    onChange={(e) => handleInputChange('asPerSSC', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none focus:border-transparent"
                    placeholder="Enter name as per SSC certificate"
                  />
                </div>

                {/* Father's Name */}
                <div className="bg-orange-50 p-3 rounded">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Father's Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fatherName}
                    onChange={(e) => handleInputChange('fatherName', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none focus:border-transparent"
                    placeholder="Enter father's full name"
                  />
                </div>

                {/* Mother's Name */}
                <div className="bg-orange-50 p-3 rounded">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mother's Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.motherName}
                    onChange={(e) => handleInputChange('motherName', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none focus:border-transparent"
                    placeholder="Enter mother's full name"
                  />
                </div>

                {/* Date of Birth */}
                <div className="bg-orange-50 p-3 rounded">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date of Birth <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none focus:border-transparent"
                  />
                </div>

                {/* Gender */}
                <div className="bg-orange-50 p-3 rounded">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gender <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-4 mt-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value="Male"
                        required
                        checked={formData.gender === 'Male'}
                        onChange={(e) => handleInputChange('gender', e.target.value)}
                        className="mr-2"
                      />
                      Male
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value="Female"
                        required
                        checked={formData.gender === 'Female'}
                        onChange={(e) => handleInputChange('gender', e.target.value)}
                        className="mr-2"
                      />
                      Female
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value="Other"
                        required
                        checked={formData.gender === 'Other'}
                        onChange={(e) => handleInputChange('gender', e.target.value)}
                        className="mr-2"
                      />
                      Other
                    </label>
                  </div>
                </div>

                {/* Blood Group */}
                <div className="bg-orange-50 p-3 rounded">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
                  <select
                    value={formData.bloodGroup}
                    onChange={(e) => handleInputChange('bloodGroup', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none focus:border-transparent"
                  >
                    <option value="">Select Blood Group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>

                {/* Marital Status */}
                <div className="bg-orange-50 p-3 rounded">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Marital Status</label>
                  <select
                    value={formData.maritalStatus}
                    onChange={(e) => handleInputChange('maritalStatus', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none focus:border-transparent"
                  >
                    <option value="">Select Marital Status</option>
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                    <option value="Divorced">Divorced</option>
                    <option value="Widowed">Widowed</option>
                  </select>
                </div>

                {/* Category */}
                <div className="bg-orange-50 p-3 rounded">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none focus:border-transparent"
                  >
                    <option value="">Select Category</option>
                    <option value="General">General</option>
                    <option value="OBC">OBC</option>
                    <option value="SC">SC</option>
                    <option value="ST">ST</option>
                    <option value="EWS">EWS</option>
                  </select>
                </div>

                {/* Aadhaar Number */}
                <div className="bg-orange-50 p-3 rounded">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Aadhaar Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    pattern="[0-9]{12}"
                    maxLength="12"
                    value={formData.aadhaarNumber}
                    onChange={(e) => handleInputChange('aadhaarNumber', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none focus:border-transparent"
                    placeholder="12 digit Aadhaar number"
                  />
                </div>

                {/* Mobile 1 */}
                <div className="bg-orange-50 p-3 rounded">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mobile Number 1 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    pattern="[0-9]{10}"
                    maxLength="10"
                    value={formData.mobile1}
                    onChange={(e) => handleInputChange('mobile1', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none focus:border-transparent"
                    placeholder="10 digit mobile number"
                  />
                </div>

                {/* Mobile 2 */}
                <div className="bg-orange-50 p-3 rounded">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number 2</label>
                  <input
                    type="tel"
                    pattern="[0-9]{10}"
                    maxLength="10"
                    value={formData.mobile2}
                    onChange={(e) => handleInputChange('mobile2', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none focus:border-transparent"
                    placeholder="10 digit mobile number"
                  />
                </div>

                {/* Mobile 3 */}
                <div className="bg-orange-50 p-3 rounded">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number 3</label>
                  <input
                    type="tel"
                    pattern="[0-9]{10}"
                    maxLength="10"
                    value={formData.mobile3}
                    onChange={(e) => handleInputChange('mobile3', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none focus:border-transparent"
                    placeholder="10 digit mobile number"
                  />
                </div>

                {/* Email Address */}
                <div className="bg-orange-50 p-3 rounded">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.emailAddress}
                    onChange={(e) => handleInputChange('emailAddress', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none focus:border-transparent"
                    placeholder="Enter email address"
                  />
                </div>
              </div>
            </div>

            {/* Address Details */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b-2 border-orange-200 pb-2">
                Address Details
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Residential Address */}
                <div className="bg-orange-50 p-3 rounded">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Residential Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows="3"
                    value={formData.residentialAddress}
                    onChange={(e) => handleInputChange('residentialAddress', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none focus:border-transparent"
                    placeholder="Enter your current residential address"
                  />
                </div>

                {/* Permanent Address */}
                <div className="bg-orange-50 p-3 rounded">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Permanent Address</label>
                  <textarea
                    rows="3"
                    value={formData.permanentAddress}
                    onChange={(e) => handleInputChange('permanentAddress', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none focus:border-transparent"
                    placeholder="Enter your permanent address (if different from residential)"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {/* State */}
                <div className="bg-orange-50 p-3 rounded">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none focus:border-transparent"
                    placeholder="Enter state name"
                  />
                </div>

                {/* District */}
                <div className="bg-orange-50 p-3 rounded">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    District <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.district}
                    onChange={(e) => handleInputChange('district', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none focus:border-transparent"
                    placeholder="Enter district name"
                  />
                </div>

                {/* Village Name */}
                <div className="bg-orange-50 p-3 rounded">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Village Name</label>
                  <input
                    type="text"
                    value={formData.villageName}
                    onChange={(e) => handleInputChange('villageName', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none focus:border-transparent"
                    placeholder="Enter village/town name"
                  />
                </div>

                {/* Pin Code */}
                <div className="bg-orange-50 p-3 rounded">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pin Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    pattern="[0-9]{6}"
                    maxLength="6"
                    value={formData.pinCode}
                    onChange={(e) => handleInputChange('pinCode', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none focus:border-transparent"
                    placeholder="6 digit pin code"
                  />
                </div>

                {/* Block / Nagar Nigam / Nagar Parishad / Panchayat */}
                <div className="bg-orange-50 p-3 rounded">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Block / Nagar Nigam / Nagar Parishad / Panchayat</label>
                  <input
                    type="text"
                    value={formData.blockNagarNigam}
                    onChange={(e) => handleInputChange('blockNagarNigam', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none focus:border-transparent"
                    placeholder="Enter block/nagar nigam/nagar parishad/panchayat"
                  />
                </div>

                {/* Post Office */}
                <div className="bg-orange-50 p-3 rounded">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Post Office</label>
                  <input
                    type="text"
                    value={formData.postOffice}
                    onChange={(e) => handleInputChange('postOffice', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-500 outline-none focus:border-transparent"
                    placeholder="Enter post office name"
                  />
                </div>
              </div>
            </div>

            {/* Academic Details */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b-2 border-orange-200 pb-2">
                Academic Details
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Session Year */}
                <div className="bg-orange-50 p-3 rounded">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Session Year <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={formData.sessionYear}
                    onChange={(e) => handleInputChange('sessionYear', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none focus:border-transparent"
                  >
                    <option value="">Select Session Year</option>
                    <option value="2024-25">2024-25</option>
                    <option value="2025-26">2025-26</option>
                    <option value="2026-27">2026-27</option>
                  </select>
                </div>

                {/* Course Name */}
                <div className="bg-orange-50 p-3 rounded">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Course Name <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={formData.courseName}
                    onChange={(e) => handleInputChange('courseName', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none focus:border-transparent"
                  >
                    <option value="">Select Course</option>
                    <option value="10th">10th</option>
                    <option value="12th - Science">12th - Science</option>
                    <option value="12th - Commerce">12th - Commerce</option>
                    <option value="12th - Arts">12th - Arts</option>
                    <option value="B.Tech / B.E.">B.Tech / B.E.</option>
                    <option value="MBBS">MBBS</option>
                    <option value="B.Pharm">B.Pharm</option>
                    <option value="BDS">BDS</option>
                    <option value="B.Sc">B.Sc</option>
                    <option value="BCA">BCA</option>
                    <option value="B.Com">B.Com</option>
                    <option value="BBA">BBA</option>
                    <option value="CA">CA</option>
                    <option value="CS">CS</option>
                    <option value="CMA">CMA</option>
                    <option value="BHM">BHM</option>
                    <option value="BA">BA</option>
                    <option value="BFA">BFA</option>
                    <option value="Paramedical">Paramedical</option>
                    <option value="B.Arch">B.Arch</option>
                    <option value="Other">Other</option>
                  </select>
                  
                  {/* Manual Course Name Input for "Other" option */}
                  {formData.courseName === 'Other' && (
                    <div className="mt-3">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Specify Course Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.otherCourseName || ''}
                        onChange={(e) => handleInputChange('otherCourseName', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none focus:border-transparent"
                        placeholder="Enter course name"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Bank Details */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b-2 border-orange-200 pb-2">
                Bank Details
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Bank Name */}
                <div className="bg-orange-50 p-3 rounded">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name</label>
                  <input
                    type="text"
                    value={formData.bankName}
                    onChange={(e) => handleInputChange('bankName', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none focus:border-transparent"
                    placeholder="Enter bank name"
                  />
                </div>

                {/* Account Number */}
                <div className="bg-orange-50 p-3 rounded">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
                  <input
                    type="text"
                    value={formData.accountNumber}
                    onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none focus:border-transparent"
                    placeholder="Enter account number"
                  />
                </div>

                {/* Branch Name */}
                <div className="bg-orange-50 p-3 rounded">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Branch Name</label>
                  <input
                    type="text"
                    value={formData.branchName}
                    onChange={(e) => handleInputChange('branchName', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none focus:border-transparent"
                    placeholder="Enter branch name"
                  />
                </div>

                {/* IFSC Code */}
                <div className="bg-orange-50 p-3 rounded">
                  <label className="block text-sm font-medium text-gray-700 mb-1">IFSC Code</label>
                  <input
                    type="text"
                    value={formData.ifscCode}
                    onChange={(e) => handleInputChange('ifscCode', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none focus:border-transparent"
                    placeholder="Enter IFSC code"
                  />
                </div>
              </div>
            </div>

            {/* Documents & Attachments */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b-2 border-orange-200 pb-2">
                Documents & Attachments
              </h2>
              
              {/* Certificate Requirements Info */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <h3 className="text-sm font-medium text-blue-800 mb-2">📋 Certificate Requirements:</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• <strong>10th Course:</strong> No certificates required</li>
                  <li>• <strong>12th Courses:</strong> 10th certificate required</li>
                  <li>• <strong>Other Courses:</strong> Both 10th and 12th certificates required</li>
                </ul>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Student Image */}
                <div className="bg-orange-50 p-3 rounded">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Student Image <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    required
                    accept="image/*"
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none focus:border-transparent"
                  />
                </div>

                {/* 10th Certificate - Required for 12th and other courses, not for 10th */}
                {formData.courseName && formData.courseName !== '10th' && (
                  <div className="bg-orange-50 p-3 rounded">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      10th Certificate <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="file"
                      required
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none focus:border-transparent"
                    />
                  </div>
                )}

                {/* 12th Certificate - Required for courses other than 10th and 12th */}
                {formData.courseName && formData.courseName !== '10th' && !formData.courseName.startsWith('12th') && (
                  <div className="bg-orange-50 p-3 rounded">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      12th Certificate <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="file"
                      required
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none focus:border-transparent"
                    />
                  </div>
                )}

                {/* Counselor Signature */}
                <div className="bg-orange-50 p-3 rounded">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Counselor Signature</label>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none focus:border-transparent"
                  />
                </div>

                {/* Applicant Signature */}
                <div className="bg-orange-50 p-3 rounded">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Applicant Signature</label>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none focus:border-transparent"
                  />
                </div>
              </div>
            </div>

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