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
      name: 'RAMESH KUMAR',
      class: 'Nursery',
      section: 'A',
      mobile: '9554833028',
      // ... other student data
    }}
    isEdit={true}
  />
*/

const Admission = ({ initialData = null, isEdit = false }) => {
  const defaultFormData = {
    // Student Personal Details
    name: '',
    class: '',
    section: '',
    transport: '',
    address1: '',
    address2: '',
    city: '',
    mobile: '',
    gender: '',
    dateOfBirth: '',
    religion: '',
    sc: '',
    kumar: '',
    vehicle: '',
    admissionDate: '',
    registrationNo: '',
    session: '',
    
    // Received Documents
    tc: '',
    characterCertificate: '',
    reportCard: '',
    dobCertificate: '',
    
    // Previous School Details
    lastSchool: '',
    lastExam: '',
    examResult: '',
    mark: '',
    board: '',
    aadharNo: '',
    
    // Father Details
    fatherName: '',
    fatherMobile: '',
    fatherQualification: '',
    fatherOccupation: '',
    fatherDOB: '',
    fatherEmail: '',
    
    // Mother Details
    motherName: '',
    motherMobile: '',
    motherQualification: '',
    motherOccupation: '',
    motherDOB: '',
    oldBalance: ''
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
            {/* Student Personal Details */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b-2 border-pink-200 pb-2">
                Student Personal Details
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Name */}
                <div className="bg-pink-50 p-3 rounded">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Class */}
                <div className="bg-pink-50 p-3 rounded">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
                  <select
                    value={formData.class}
                    onChange={(e) => handleInputChange('class', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Nursery">Nursery</option>
                    <option value="LKG">LKG</option>
                    <option value="UKG">UKG</option>
                    <option value="1">Class 1</option>
                    <option value="2">Class 2</option>
                  </select>
                </div>

                {/* Section */}
                <div className="bg-pink-50 p-3 rounded">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Section</label>
                  <select
                    value={formData.section}
                    onChange={(e) => handleInputChange('section', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                  </select>
                </div>

                {/* Transport */}
                <div className="bg-pink-50 p-3 rounded">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Transport</label>
                  <select
                    value={formData.transport}
                    onChange={(e) => handleInputChange('transport', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="ALAWALPUR | S | Rs. 500">ALAWALPUR | S | Rs. 500</option>
                    <option value="No Transport">No Transport</option>
                  </select>
                </div>

                {/* Address 1 */}
                <div className="bg-pink-50 p-3 rounded">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address 1</label>
                  <input
                    type="text"
                    value={formData.address1}
                    onChange={(e) => handleInputChange('address1', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Address 2 */}
                <div className="bg-pink-50 p-3 rounded">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address 2</label>
                  <input
                    type="text"
                    value={formData.address2}
                    onChange={(e) => handleInputChange('address2', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* City */}
                <div className="bg-pink-50 p-3 rounded">
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Mobile */}
                <div className="bg-pink-50 p-3 rounded">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mobile</label>
                  <input
                    type="tel"
                    value={formData.mobile}
                    onChange={(e) => handleInputChange('mobile', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Gender */}
                <div className="bg-pink-50 p-3 rounded">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                  <div className="flex gap-4 mt-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value="Boy"
                        checked={formData.gender === 'Boy'}
                        onChange={(e) => handleInputChange('gender', e.target.value)}
                        className="mr-2"
                      />
                      Boy
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value="Girl"
                        checked={formData.gender === 'Girl'}
                        onChange={(e) => handleInputChange('gender', e.target.value)}
                        className="mr-2"
                      />
                      Girl
                    </label>
                  </div>
                </div>

                {/* Date of Birth */}
                <div className="bg-pink-50 p-3 rounded">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                  <input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Religion */}
                <div className="bg-pink-50 p-3 rounded">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Religion</label>
                  <select
                    value={formData.religion}
                    onChange={(e) => handleInputChange('religion', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Hindu">Hindu</option>
                    <option value="Muslim">Muslim</option>
                    <option value="Christian">Christian</option>
                    <option value="Sikh">Sikh</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* SC */}
                <div className="bg-pink-50 p-3 rounded">
                  <label className="block text-sm font-medium text-gray-700 mb-1">SC</label>
                  <select
                    value={formData.sc}
                    onChange={(e) => handleInputChange('sc', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Sc">Sc</option>
                    <option value="St">St</option>
                    <option value="Obc">Obc</option>
                    <option value="General">General</option>
                  </select>
                </div>

                {/* Kumar */}
                <div className="bg-pink-50 p-3 rounded">
                  <label className="block text-sm font-medium text-gray-700 mb-1">KUMAR</label>
                  <select
                    value={formData.kumar}
                    onChange={(e) => handleInputChange('kumar', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="KUMAR">KUMAR</option>
                    <option value="SINGH">SINGH</option>
                    <option value="VERMA">VERMA</option>
                  </select>
                </div>

                {/* Vehicle */}
                <div className="bg-pink-50 p-3 rounded">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle</label>
                  <select
                    value={formData.vehicle}
                    onChange={(e) => handleInputChange('vehicle', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Tata Bus">Tata Bus</option>
                    <option value="No Vehicle">No Vehicle</option>
                  </select>
                </div>

                {/* Admission Date */}
                <div className="bg-pink-50 p-3 rounded">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Adm. Date</label>
                  <input
                    type="date"
                    value={formData.admissionDate}
                    onChange={(e) => handleInputChange('admissionDate', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Registration Number */}
                <div className="bg-pink-50 p-3 rounded">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Reg. No.</label>
                  <input
                    type="text"
                    value={formData.registrationNo}
                    onChange={(e) => handleInputChange('registrationNo', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Photo */}
                <div className="bg-pink-50 p-3 rounded">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Photo</label>
                  <input
                    type="file"
                    accept="image/*"
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Session */}
                <div className="bg-pink-50 p-3 rounded">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Session</label>
                  <select
                    value={formData.session}
                    onChange={(e) => handleInputChange('session', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="2024-25">2024-25</option>
                    <option value="2025-26">2025-26</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Received Documents and Previous School Details */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b-2 border-pink-200 pb-2">
                Received Documents & Previous School Details
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Received Documents */}
                <div>
                  <h3 className="text-lg font-medium text-gray-700 mb-3">Received Documents</h3>
                  <div className="space-y-3">
                    {[
                      { key: 'tc', label: 'TC (Transfer Certificate)' },
                      { key: 'characterCertificate', label: 'Char. Cer. (Character Certificate)' },
                      { key: 'reportCard', label: 'Report Card' },
                      { key: 'dobCertificate', label: 'DOB Cert. (Date of Birth Certificate)' }
                    ].map((doc) => (
                      <div key={doc.key} className="bg-pink-50 p-3 rounded">
                        <label className="block text-sm font-medium text-gray-700 mb-2">{doc.label}</label>
                        <div className="flex gap-4">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name={doc.key}
                              value="Yes"
                              checked={formData[doc.key] === 'Yes'}
                              onChange={(e) => handleInputChange(doc.key, e.target.value)}
                              className="mr-2"
                            />
                            Yes
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name={doc.key}
                              value="No"
                              checked={formData[doc.key] === 'No'}
                              onChange={(e) => handleInputChange(doc.key, e.target.value)}
                              className="mr-2"
                            />
                            No
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Previous School Details */}
                <div>
                  <h3 className="text-lg font-medium text-gray-700 mb-3">Previous School Details</h3>
                  <div className="space-y-3">
                    {[
                      { key: 'lastSchool', label: 'Last School', type: 'text' },
                      { key: 'lastExam', label: 'Last Exam', type: 'text' },
                      { key: 'examResult', label: 'Exam Result', type: 'text' },
                      { key: 'mark', label: 'Mark', type: 'text' },
                      { key: 'board', label: 'Board', type: 'text' },
                      { key: 'aadharNo', label: 'Aadhar No.', type: 'text' }
                    ].map((field) => (
                      <div key={field.key} className="bg-pink-50 p-3 rounded">
                        <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                        <input
                          type={field.type}
                          value={formData[field.key]}
                          onChange={(e) => handleInputChange(field.key, e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Parent Details */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b-2 border-pink-200 pb-2">
                Parent Details
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Father Details */}
                <div>
                  <h3 className="text-lg font-medium text-gray-700 mb-3">Father</h3>
                  <div className="space-y-3">
                    {[
                      { key: 'fatherName', label: 'Name', type: 'text' },
                      { key: 'fatherMobile', label: 'Mobile', type: 'tel' },
                      { key: 'fatherQualification', label: 'Qualification', type: 'text' },
                      { key: 'fatherOccupation', label: 'Occupation', type: 'text' },
                      { key: 'fatherDOB', label: 'Father\'s DOB', type: 'date' },
                      { key: 'fatherEmail', label: 'E Mail', type: 'email' }
                    ].map((field) => (
                      <div key={field.key} className="bg-pink-50 p-3 rounded">
                        <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                        <input
                          type={field.type}
                          value={formData[field.key]}
                          onChange={(e) => handleInputChange(field.key, e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mother Details */}
                <div>
                  <h3 className="text-lg font-medium text-gray-700 mb-3">Mother</h3>
                  <div className="space-y-3">
                    {[
                      { key: 'motherName', label: 'Name', type: 'text' },
                      { key: 'motherMobile', label: 'Mobile', type: 'tel' },
                      { key: 'motherQualification', label: 'Qualification', type: 'text' },
                      { key: 'motherOccupation', label: 'Occupation', type: 'text' },
                      { key: 'motherDOB', label: 'Mother\'s DOB', type: 'date' },
                      { key: 'oldBalance', label: 'Old Balance', type: 'text' }
                    ].map((field) => (
                      <div key={field.key} className="bg-pink-50 p-3 rounded">
                        <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                        <input
                          type={field.type}
                          value={formData[field.key]}
                          onChange={(e) => handleInputChange(field.key, e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setFormData({})}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none cursor-pointer focus:ring-2 focus:ring-blue-500"
              >
                Reset
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none cursor-pointer focus:ring-2 focus:ring-blue-500"
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