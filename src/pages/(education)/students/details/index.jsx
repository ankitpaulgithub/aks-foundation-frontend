import React from 'react'
import Layout from '../../../../components/education/Layout'
import { FaUser, FaMapMarkerAlt,  FaCertificate,  FaIdCard, FaEdit, FaPrint } from 'react-icons/fa'
import { useRouter } from 'next/navigation'

const StudentDetails = () => {

    const router = useRouter()
  // Sample student data - in real app, this would come from props or API
  const studentData = {
    // Student Personal Details
    name: 'RAMESH KUMAR',
    class: 'Nursery',
    section: 'A',
    transport: 'BUS | Rs. 500',
    address1: '123 Main Street',
    address2: 'Apartment 4B',
    city: 'New Delhi',
    mobile: '9554833028',
    gender: 'Boy',
    dateOfBirth: '2018-10-10',
    religion: 'Hindu',
    sc: 'Sc',
    kumar: 'KUMAR',
    vehicle: 'Tata Bus',
    admissionDate: '2025-01-30',
    registrationNo: '1002445',
    session: '2024-25',
    
    // Received Documents
    tc: 'Yes',
    characterCertificate: 'Yes',
    reportCard: 'Yes',
    dobCertificate: 'Yes',
    
    // Previous School Details
    lastSchool: 'ABC Public School',
    lastExam: 'Class UKG Final',
    examResult: 'Distinction',
    mark: '95%',
    board: 'CBSE',
    aadharNo: '1234-5678-9012',
    
    // Father Details
    fatherName: 'RAJESH KUMAR',
    fatherMobile: '9876543210',
    fatherQualification: 'B.Tech',
    fatherOccupation: 'Software Engineer',
    fatherDOB: '1985-05-15',
    fatherEmail: 'rajesh.kumar@email.com',
    
    // Mother Details
    motherName: 'PRIYA KUMARI',
    motherMobile: '8765432109',
    motherQualification: 'M.A.',
    motherOccupation: 'Teacher',
    motherDOB: '1988-08-20',
    oldBalance: '0'
  }

  const handleEdit = (data)=>{
    localStorage.setItem("student",JSON.stringify(data))
    router.push(`${data.registrationNo}`)
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'Not provided';
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }

  const getGenderColor = (gender) => {
    return gender === 'Boy' ? 'bg-blue-100 text-blue-800' : 'bg-pink-100 text-pink-800';
  }

  const getDocumentStatusColor = (status) => {
    return status === 'Yes' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  }

  const printForm = async () => {
    try {
      const res = await fetch('/api/admission-form');
      if (!res.ok) throw new Error("Failed to fetch PDF");
  
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
  
      // Create hidden iframe
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
  
        // Cleanup
        URL.revokeObjectURL(url);
        setTimeout(() => document.body.removeChild(iframe), 1000);
      };
    } catch (err) {
      console.error("Print failed:", err);
    }
  };
  

  return (
    <Layout>
      <div className="bg-gray-100 min-h-screen p-4">
        <div className="max-w-7xl mx-auto">

          {/* Search bar */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex flex-col sm:items-center sm:justify-between">
                <h1 className="text-2xl font-bold text-gray-800">Search Student by Roll No.</h1>
              <div className='flex w-full mx-auto justify-center my-3'>
              <input type="text" placeholder='Search by Roll no.' className='bg-gray-200 rounded-full p-3 px-6 mx-5 w-full sm:max-w-2xl outline-blue-300 ' />
              <button  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full flex items-center gap-2 cursor-pointer hover:scale-105 transition-colors duration-300">
                  Search
                </button>
              </div>
            </div>
          </div>


          {/* Header with Actions */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Student Details</h1>
                <p className="text-gray-600 mt-1">Registration No: {studentData.registrationNo}</p>
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
                <div className="bg-gray-200 rounded-lg w-48 h-48 mx-auto lg:mx-0 flex items-center justify-center">
                  <FaUser className="text-6xl text-gray-400" />
                </div>
                <div className="text-center lg:text-left mt-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getGenderColor(studentData.gender)}`}>
                    {studentData.gender}
                  </span>
                </div>
              </div>

              {/* Student Basic Details */}
              <div className="lg:w-3/4">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b-2 border-blue-200 pb-2">
                  Basic Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Full Name</label>
                    <p className="text-lg font-semibold text-gray-800">{studentData.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Class & Section</label>
                    <p className="text-lg font-semibold text-gray-800">{studentData.class} - {studentData.section}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Registration Number</label>
                    <p className="text-lg font-semibold text-gray-800">{studentData.registrationNo}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Session</label>
                    <p className="text-lg font-semibold text-gray-800">{studentData.session}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Date of Birth</label>
                    <p className="text-lg font-semibold text-gray-800">{formatDate(studentData.dateOfBirth)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Mobile Number</label>
                    <p className="text-lg font-semibold text-gray-800">{studentData.mobile}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Religion</label>
                    <p className="text-lg font-semibold text-gray-800">{studentData.religion}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Category</label>
                    <p className="text-lg font-semibold text-gray-800">{studentData.sc}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Address & Transport Information */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b-2 border-green-200 pb-2 flex items-center gap-2">
              <FaMapMarkerAlt className="text-green-500" />
              Address & Transport
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-3">Address Details</h3>
                <div className="space-y-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Address Line 1</label>
                    <p className="text-gray-800">{studentData.address1}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Address Line 2</label>
                    <p className="text-gray-800">{studentData.address2}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">City</label>
                    <p className="text-gray-800">{studentData.city}</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-3">Transport Details</h3>
                <div className="space-y-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Transport Service</label>
                    <p className="text-gray-800">{studentData.transport}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Vehicle Type</label>
                    <p className="text-gray-800">{studentData.vehicle}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Documents & Previous School */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b-2 border-purple-200 pb-2 flex items-center gap-2">
              <FaCertificate className="text-purple-500" />
              Documents & Previous School
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-3">Received Documents</h3>
                <div className="space-y-2">
                  {[
                    { key: 'tc', label: 'Transfer Certificate' },
                    { key: 'characterCertificate', label: 'Character Certificate' },
                    { key: 'reportCard', label: 'Report Card' },
                    { key: 'dobCertificate', label: 'Date of Birth Certificate' }
                  ].map((doc) => (
                    <div key={doc.key} className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">{doc.label}</span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDocumentStatusColor(studentData[doc.key])}`}>
                        {studentData[doc.key]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-3">Previous School Details</h3>
                <div className="space-y-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Last School</label>
                    <p className="text-gray-800">{studentData.lastSchool}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Last Exam</label>
                    <p className="text-gray-800">{studentData.lastExam}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Exam Result</label>
                    <p className="text-gray-800">{studentData.examResult}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Marks</label>
                    <p className="text-gray-800">{studentData.mark}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Board</label>
                    <p className="text-gray-800">{studentData.board}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Aadhar Number</label>
                    <p className="text-gray-800">{studentData.aadharNo}</p>
                  </div>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Father Details */}
              <div>
                <h3 className="text-lg font-medium  mb-3 text-blue-600">Father's Details</h3>
                <div className="space-y-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Name</label>
                    <p className="text-gray-800">{studentData.fatherName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Mobile</label>
                    <p className="text-gray-800">{studentData.fatherMobile}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Qualification</label>
                    <p className="text-gray-800">{studentData.fatherQualification}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Occupation</label>
                    <p className="text-gray-800">{studentData.fatherOccupation}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Date of Birth</label>
                    <p className="text-gray-800">{formatDate(studentData.fatherDOB)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Email</label>
                    <p className="text-gray-800">{studentData.fatherEmail}</p>
                  </div>
                </div>
              </div>

              {/* Mother Details */}
              <div>
                <h3 className="text-lg font-medium  mb-3 text-pink-600">Mother's Details</h3>
                <div className="space-y-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Name</label>
                    <p className="text-gray-800">{studentData.motherName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Mobile</label>
                    <p className="text-gray-800">{studentData.motherMobile}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Qualification</label>
                    <p className="text-gray-800">{studentData.motherQualification}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Occupation</label>
                    <p className="text-gray-800">{studentData.motherOccupation}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Date of Birth</label>
                    <p className="text-gray-800">{formatDate(studentData.motherDOB)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Previous Balance</label>
                    <p className="text-gray-800">₹ {studentData.oldBalance}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b-2 border-indigo-200 pb-2 flex items-center gap-2">
              <FaIdCard className="text-indigo-500" />
              Additional Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">Admission Date</label>
                <p className="text-gray-800">{formatDate(studentData.admissionDate)}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Kumar</label>
                <p className="text-gray-800">{studentData.kumar}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Status</label>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default StudentDetails