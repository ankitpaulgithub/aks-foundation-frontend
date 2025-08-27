import React, { useEffect, useMemo, useState } from 'react'
import Layout from '../../../../components/education/Layout'
import { FaUser, FaMapMarkerAlt,  FaCertificate,  FaIdCard, FaEdit, FaPrint } from 'react-icons/fa'
import { useRouter } from 'next/navigation'

const StudentDetails = () => {

    const router = useRouter()
  const [admission, setAdmission] = useState(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      const raw = localStorage.getItem('admissionForm')
      if (raw) setAdmission(JSON.parse(raw))
    } catch (err) {
      console.error('Failed to read admissionForm from localStorage', err)
    }
  }, [])

  const studentData = useMemo(() => {
    const a = admission || {}
    const fullName = [a.firstName, a.middleName, a.lastName].filter(Boolean).join(' ')
    return {
      name: fullName || 'Not provided',
      class: a.courseName || 'Not provided',
      section: a.batch || 'Not provided',
      address1: a.residentialAddress || 'Not provided',
      address2: a.permanentAddress || 'Not provided',
      city: a.district || 'Not provided',
      mobile: a.mobile1 || 'Not provided',
      gender: a.gender || 'Not provided',
      dateOfBirth: a.dateOfBirth || '',
      sc: a.category || 'Not provided',
      emailAddress: a.emailAddress || 'Not provided',
      bloodGroup: a.bloodGroup || 'Not provided',
      maritalStatus: a.maritalStatus || 'Not provided',
      admissionDate: a.regDate || '',
      registrationNo: a.regNo || 'Not provided',
      session: a.sessionYear || 'Not provided',

      // Address
      area: a.area || 'Not provided',
      state: a.state || 'Not provided',
      district: a.district || 'Not provided',
      villageName: a.villageName || 'Not provided',
      pinCode: a.pinCode || 'Not provided',
      blockNagarNigam: a.blockNagarNigam || 'Not provided',
      postOffice: a.postOffice || 'Not provided',

      // Academics & Program
      courseName: a.courseName || 'Not provided',
      otherCourseName: a.otherCourseName || '',
      studentProgram: a.studentProgram || 'Not provided',
      class10SessionYear: a.class10SessionYear || '',
      class10RollNo: a.class10RollNo || '',
      class10SchoolName: a.class10SchoolName || '',
      class12SessionYear: a.class12SessionYear || '',
      class12RollNo: a.class12RollNo || '',
      class12SchoolName: a.class12SchoolName || '',
      graduationSessionYear: a.graduationSessionYear || '',
      graduationRollNo: a.graduationRollNo || '',
      graduationSchoolName: a.graduationSchoolName || '',
      postGraduationSessionYear: a.postGraduationSessionYear || '',
      postGraduationRollNo: a.postGraduationRollNo || '',
      postGraduationSchoolName: a.postGraduationSchoolName || '',

      // Bank
      bankName: a.bankName || 'Not provided',
      accountNumber: a.accountNumber || 'Not provided',
      branchName: a.branchName || 'Not provided',
      ifscCode: a.ifscCode || 'Not provided',

      // Office Use Only (KYP)
      payment: a.payment || '',
      paymentDate: a.paymentDate || '',
      drccVerificationDate: a.drccVerificationDate || '',
      learnerCode: a.learnerCode || '',
      batchStartDate: a.batchStartDate || '',
      batchCode: a.batchCode || '',
      batchTime1: a.batchTime1 || '',
      batchTime2: a.batchTime2 || '',
      remarks: a.remarks || '',

      // Office Use Only (SHA)
      enrollmentNo: a.enrollmentNo || '',
      enrollmentDate: a.enrollmentDate || '',
      program2: a.program2 || '',
      courseDuration: a.courseDuration || '',
      batchName: a.batchName || '',
      batchTime: a.batchTime || '',
      certificateNo: a.certificateNo || '',
      dateOfIssue: a.dateOfIssue || '',
      remarks2: a.remarks2 || '',

      aadharNo: a.aadhaarNumber || 'Not provided',

      fatherName: a.fatherName || 'Not provided',
      motherName: a.motherName || 'Not provided'
    }
  }, [admission])

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
    if (!gender) return 'bg-gray-100 text-gray-800'
    const g = String(gender).toLowerCase()
    if (g === 'boy' || g === 'male') return 'bg-blue-100 text-blue-800'
    if (g === 'girl' || g === 'female') return 'bg-pink-100 text-pink-800'
    return 'bg-gray-100 text-gray-800'
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
                <h1 className="text-2xl font-bold text-gray-800">Search Student</h1>
              <div className='flex w-full mx-auto justify-center my-3'>
              <input type="text" placeholder="Search by Roll no./Name/Father's Name" className='bg-gray-200 rounded-full p-3 px-6 mx-5 w-full sm:max-w-2xl outline-blue-300 ' />
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

          {/* Address & Bank Information */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b-2 border-green-200 pb-2 flex items-center gap-2">
              <FaMapMarkerAlt className="text-green-500" />
              Address & Bank
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
                <h3 className="text-lg font-medium text-gray-700 mb-3">Bank Details</h3>
                <div className="space-y-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Bank Name</label>
                    <p className="text-gray-800">{studentData.bankName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Account Number</label>
                    <p className="text-gray-800">{studentData.accountNumber}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Branch Name</label>
                    <p className="text-gray-800">{studentData.branchName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">IFSC Code</label>
                    <p className="text-gray-800">{studentData.ifscCode}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Academic & Office Use */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b-2 border-purple-200 pb-2 flex items-center gap-2">
              <FaCertificate className="text-purple-500" />
              Academic & Office Use
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-3">Academic Details</h3>
                <div className="space-y-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Course Name</label>
                    <p className="text-gray-800">{studentData.courseName}</p>
                  </div>
                  {studentData.otherCourseName && (
                    <div>
                      <label className="block text-sm font-medium text-gray-600">Other Course Name</label>
                      <p className="text-gray-800">{studentData.otherCourseName}</p>
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Program</label>
                    <p className="text-gray-800">{studentData.studentProgram}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Class 10th</label>
                    <p className="text-gray-800">{studentData.class10SessionYear} {studentData.class10RollNo && `| Roll: ${studentData.class10RollNo}`} {studentData.class10SchoolName && `| ${studentData.class10SchoolName}`}</p>
                  </div>
                  {studentData.class12SessionYear || studentData.class12RollNo || studentData.class12SchoolName ? (
                    <div>
                      <label className="block text-sm font-medium text-gray-600">Class 12th</label>
                      <p className="text-gray-800">{studentData.class12SessionYear} {studentData.class12RollNo && `| Roll: ${studentData.class12RollNo}`} {studentData.class12SchoolName && `| ${studentData.class12SchoolName}`}</p>
                    </div>
                  ) : null}
                  {studentData.graduationSessionYear || studentData.graduationRollNo || studentData.graduationSchoolName ? (
                    <div>
                      <label className="block text-sm font-medium text-gray-600">Graduation</label>
                      <p className="text-gray-800">{studentData.graduationSessionYear} {studentData.graduationRollNo && `| Roll: ${studentData.graduationRollNo}`} {studentData.graduationSchoolName && `| ${studentData.graduationSchoolName}`}</p>
                    </div>
                  ) : null}
                  {studentData.postGraduationSessionYear || studentData.postGraduationRollNo || studentData.postGraduationSchoolName ? (
                    <div>
                      <label className="block text-sm font-medium text-gray-600">Post Graduation</label>
                      <p className="text-gray-800">{studentData.postGraduationSessionYear} {studentData.postGraduationRollNo && `| Roll: ${studentData.postGraduationRollNo}`} {studentData.postGraduationSchoolName && `| ${studentData.postGraduationSchoolName}`}</p>
                    </div>
                  ) : null}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-3">Office Use Only</h3>
                <div className="space-y-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Aadhaar Number</label>
                    <p className="text-gray-800">{studentData.aadharNo}</p>
                  </div>
                  {studentData.payment && (
                    <div>
                      <label className="block text-sm font-medium text-gray-600">Payment</label>
                      <p className="text-gray-800">{studentData.payment}</p>
                    </div>
                  )}
                  {studentData.paymentDate && (
                    <div>
                      <label className="block text-sm font-medium text-gray-600">Payment Date</label>
                      <p className="text-gray-800">{formatDate(studentData.paymentDate)}</p>
                    </div>
                  )}
                  {studentData.drccVerificationDate && (
                    <div>
                      <label className="block text-sm font-medium text-gray-600">DRCC Verification Date</label>
                      <p className="text-gray-800">{formatDate(studentData.drccVerificationDate)}</p>
                    </div>
                  )}
                  {studentData.learnerCode && (
                    <div>
                      <label className="block text-sm font-medium text-gray-600">Learner Code</label>
                      <p className="text-gray-800">{studentData.learnerCode}</p>
                    </div>
                  )}
                  {studentData.batchStartDate && (
                    <div>
                      <label className="block text-sm font-medium text-gray-600">Batch Start Date</label>
                      <p className="text-gray-800">{formatDate(studentData.batchStartDate)}</p>
                    </div>
                  )}
                  {studentData.batch && (
                    <div>
                      <label className="block text-sm font-medium text-gray-600">Batch</label>
                      <p className="text-gray-800">{studentData.batch}</p>
                    </div>
                  )}
                  {studentData.batchCode && (
                    <div>
                      <label className="block text-sm font-medium text-gray-600">Batch Code</label>
                      <p className="text-gray-800">{studentData.batchCode}</p>
                    </div>
                  )}
                  {(studentData.batchTime1 || studentData.batchTime2) && (
                    <div>
                      <label className="block text-sm font-medium text-gray-600">Batch Times</label>
                      <p className="text-gray-800">{[studentData.batchTime1, studentData.batchTime2].filter(Boolean).join(' - ')}</p>
                    </div>
                  )}
                  {studentData.enrollmentNo && (
                    <div>
                      <label className="block text sm font-medium text-gray-600">Enrollment No.</label>
                      <p className="text-gray-800">{studentData.enrollmentNo}</p>
                    </div>
                  )}
                  {studentData.enrollmentDate && (
                    <div>
                      <label className="block text-sm font-medium text-gray-600">Enrollment Date</label>
                      <p className="text-gray-800">{formatDate(studentData.enrollmentDate)}</p>
                    </div>
                  )}
                  {studentData.program2 && (
                    <div>
                      <label className="block text-sm font-medium text-gray-600">Program</label>
                      <p className="text-gray-800">{studentData.program2}</p>
                    </div>
                  )}
                  {studentData.courseDuration && (
                    <div>
                      <label className="block text-sm font-medium text-gray-600">Course Duration</label>
                      <p className="text-gray-800">{studentData.courseDuration}</p>
                    </div>
                  )}
                  {studentData.batchName && (
                    <div>
                      <label className="block text-sm font-medium text-gray-600">Batch Name</label>
                      <p className="text-gray-800">{studentData.batchName}</p>
                    </div>
                  )}
                  {studentData.batchTime && (
                    <div>
                      <label className="block text-sm font-medium text-gray-600">Batch Time</label>
                      <p className="text-gray-800">{studentData.batchTime}</p>
                    </div>
                  )}
                  {studentData.certificateNo && (
                    <div>
                      <label className="block text-sm font-medium text-gray-600">Certificate No.</label>
                      <p className="text-gray-800">{studentData.certificateNo}</p>
                    </div>
                  )}
                  {studentData.dateOfIssue && (
                    <div>
                      <label className="block text-sm font-medium text-gray-600">Date of Issue</label>
                      <p className="text-gray-800">{formatDate(studentData.dateOfIssue)}</p>
                    </div>
                  )}
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
                <label className="block text-sm font-medium text-gray-600">Batch</label>
                <p className="text-gray-800">{studentData.batch}</p>
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