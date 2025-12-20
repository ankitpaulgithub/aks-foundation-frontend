export const bankOptions = [
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
    { value: 'Vijaya Bank', label: 'Vijaya Bank' }, { value: 'YES Bank', label: 'YES Bank' },
    { value: 'Other', label: 'Other' }
  ]

  export const documentFields = [
    { name: 'studentImage', label: 'Student Image', required: true, accept: 'image/*' },
    { name: 'drccReceipt', label: 'DRCC Receipt', required: true, accept: 'image/*' },
    { name: 'aadhaarFront', label: 'Aadhaar Card Front', required: true, accept: 'image/*' },
    { name: 'aadhaarBack', label: 'Aadhar Card Back', required: true, accept: 'image/*' },
    { name: 'residentialCertificate', label: 'Residential Certificate', required: true, accept: 'image/*' },
    { name: 'bankPasbook', label: 'Bank Pasbook', required: true, accept: 'image/*' },
    { name: 'provisionalCertificate', label: 'Provisional Certificate', required: true, accept: 'image/*' },
    { name: 'counselorSignature', label: 'Counselor Signature', required: false, accept: '.pdf,.jpg,.jpeg,.png' },
    { name: 'applicantSignature', label: 'Applicant Signature', required: false, accept: '.pdf,.jpg,.jpeg,.png' }
  ]

  export const occupationOptions = [
    { value: 'Farmer', label: 'Farmer - किसान' },
    { value: 'Teacher', label: 'Teacher' },
    { value: 'Doctor', label: 'Doctor' },
    { value: 'Engineer', label: 'Engineer' },
    { value: 'Lawyer', label: 'Lawyer' },
    { value: 'Unemployed', label: 'Unemployed' },
    { value: 'Other', label: 'Other' }
  ]

  export const bloodGroupOptions = [
    { value: 'A+', label: 'A+' }, { value: 'A-', label: 'A-' },
    { value: 'B+', label: 'B+' }, { value: 'B-', label: 'B-' },
    { value: 'AB+', label: 'AB+' }, { value: 'AB-', label: 'AB-' },
    { value: 'O+', label: 'O+' }, { value: 'O-', label: 'O-' }
  ]

  export const maritalStatusOptions = [
    { value: 'Single', label: 'Single' }, { value: 'Married', label: 'Married' },
    { value: 'Divorced', label: 'Divorced' }, { value: 'Widowed', label: 'Widowed' }
  ]

  export const categoryOptions = [
    { value: 'General', label: 'General' }, { value: 'OBC', label: 'OBC' },
    { value: 'EBC', label: 'EBC' }, { value: 'SC', label: 'SC' },
    { value: 'ST', label: 'ST' }, { value: 'EWS', label: 'EWS' }
  ]

  export const boardOptions = [
    { value: 'Andhra Pradesh Open School Society', label: 'Andhra Pradesh Open School Society' },
    { value: 'Assam State School Education Board (ASSEB)', label: 'Assam State School Education Board (ASSEB)' },
    { value: 'Bihar Board of Open Schooling & Examination (BBOSE), Patna', label: 'Bihar Board of Open Schooling & Examination (BBOSE), Patna' },
    { value: 'Bihar Sanskrit Education Board, Patna', label: 'Bihar Sanskrit Education Board, Patna' },
    { value: 'Bihar School Examination Board, Patna', label: 'Bihar School Examination Board, Patna' },
    { value: 'Bihar State Madrasa Education Board, Patna', label: 'Bihar State Madrasa Education Board, Patna' },
    { value: 'Board of Higher Secondary Education, Kerala', label: 'Board of Higher Secondary Education, Kerala' },
    { value: 'Board of Intermediate Education (BIEAP), Andhra Pradesh', label: 'Board of Intermediate Education (BIEAP), Andhra Pradesh' },
    { value: 'Board of Open Schooling and Skill Education, Sikkim', label: 'Board of Open Schooling and Skill Education, Sikkim' },
    { value: 'Board of Public Examination, Kerala', label: 'Board of Public Examination, Kerala' },
    { value: 'Board of School Education Haryana', label: 'Board of School Education Haryana' },
    { value: 'Board of Secondary Education Madhya Pradesh', label: 'Board of Secondary Education Madhya Pradesh' },
    { value: 'Board of Secondary Education, Andhra Pradesh', label: 'Board of Secondary Education, Andhra Pradesh' },
    { value: 'Board of Secondary Education, Manipur', label: 'Board of Secondary Education, Manipur' },
    { value: 'Board Of Secondary Education, Odisha', label: 'Board Of Secondary Education, Odisha' },
    { value: 'BOARD OF SECONDARY EDUCATION, RAJASTHAN, AJMER', label: 'BOARD OF SECONDARY EDUCATION, RAJASTHAN, AJMER' },
    { value: 'Board of Secondary Education, Telangana', label: 'Board of Secondary Education, Telangana' },
    { value: 'Central Board of Secondary Education (CBSE), New Delhi', label: 'Central Board of Secondary Education (CBSE), New Delhi' },
    { value: 'Chhattisgarh Board of Secondary Education, Raipur', label: 'Chhattisgarh Board of Secondary Education, Raipur' },
    { value: 'Chhattisgarh Madrasa Board', label: 'Chhattisgarh Madrasa Board' },
    { value: 'Chhattisgarh Sanskrit Vidyamandalam, Raipur', label: 'Chhattisgarh Sanskrit Vidyamandalam, Raipur' },
    { value: 'Chhattisgarh State of Open School, Raipur', label: 'Chhattisgarh State of Open School, Raipur' },
    { value: 'Council for the Indian School Certificate Examination (CISCE)', label: 'Council for the Indian School Certificate Examination (CISCE)' },
    { value: 'COUNCIL OF HIGHER SECONDARY EDUCATION, Odisha', label: 'COUNCIL OF HIGHER SECONDARY EDUCATION, Odisha' },
    { value: 'Council of Higher Secondary Education, Manipur', label: 'Council of Higher Secondary Education, Manipur' },
    { value: 'Directorate of Technical Education, Goa', label: 'Directorate of Technical Education, Goa' },
    { value: 'GOA BOARD OF SECONDARY AND HIGHER SECONDARY EDUCATION', label: 'GOA BOARD OF SECONDARY AND HIGHER SECONDARY EDUCATION' },
    { value: 'GUJARAT SECONDARY AND HIGHER SECONDARY EDUCATION BOARD', label: 'GUJARAT SECONDARY AND HIGHER SECONDARY EDUCATION BOARD' },
    { value: 'HIMACHAL PRADESH BOARD OF SCHOOL EDUCATION DHARAMSHALA', label: 'HIMACHAL PRADESH BOARD OF SCHOOL EDUCATION DHARAMSHALA' },
    { value: 'Indian Certificate of Secondary Education (ICSE)', label: 'Indian Certificate of Secondary Education (ICSE)' },
    { value: 'International Baccalaureate (IB)', label: 'International Baccalaureate (IB)' },
    { value: 'International General Certified of Secondary Education (IGCSE)', label: 'International General Certified of Secondary Education (IGCSE)' },
    { value: 'Jammu and Kashmir Board of School Education', label: 'Jammu and Kashmir Board of School Education' },
    { value: 'Jharkhand Academic Council', label: 'Jharkhand Academic Council' },
    { value: 'Karnataka Secondary Education Examination Board', label: 'Karnataka Secondary Education Examination Board' },
    { value: 'Madhya Pradesh State Open School Education Board', label: 'Madhya Pradesh State Open School Education Board' },
    { value: 'Madhyamik Shiksha Parishad, Uttar Pradesh', label: 'Madhyamik Shiksha Parishad, Uttar Pradesh' },
    { value: 'Maharashtra State Board of Open Schooling, Pune', label: 'Maharashtra State Board of Open Schooling, Pune' },
    { value: 'Maharashtra State Board of secondary and Higher Secondary Education, Pune', label: 'Maharashtra State Board of secondary and Higher Secondary Education, Pune' },
    { value: 'Meghalaya Board of School Education', label: 'Meghalaya Board of School Education' },
    { value: 'Mizoram Board of School Education, Aizwal', label: 'Mizoram Board of School Education, Aizwal' },
    { value: 'Nagaland Board Of School Education', label: 'Nagaland Board Of School Education' },
    { value: 'National Institute of Open Schooling (NIOS)', label: 'National Institute of Open Schooling (NIOS)' },
    { value: 'Odisha State Board of Madrasa Education', label: 'Odisha State Board of Madrasa Education' },
    { value: 'OTHER Board', label: 'OTHER Board' },
    { value: 'Punjab Board of Open School', label: 'Punjab Board of Open School' },
    { value: 'Punjab School Education Board (PSEB)', label: 'Punjab School Education Board (PSEB)' },
    { value: 'Rajasthan State Open School Board', label: 'Rajasthan State Open School Board' },
    { value: 'Sanskrit Board Maharishi Patanjali Sanskrit Sansthan', label: 'Sanskrit Board Maharishi Patanjali Sanskrit Sansthan' },
    { value: 'School Education Department, Tamil Nadu', label: 'School Education Department, Tamil Nadu' },
    { value: 'Telangana Board of Intermediate Education', label: 'Telangana Board of Intermediate Education' },
    { value: 'Telangana Open School Society, Hyderabad', label: 'Telangana Open School Society, Hyderabad' },
    { value: 'The West Bengal Council of Rabindra Open Schooling', label: 'The West Bengal Council of Rabindra Open Schooling' },
    { value: 'Tripura Board of Secondary Education', label: 'Tripura Board of Secondary Education' },
    { value: 'U.P. Board of Madrasa Education', label: 'U.P. Board of Madrasa Education' },
    { value: 'Uttar Pradesh Board of Secondary Sanskrit Education, Lucknow', label: 'Uttar Pradesh Board of Secondary Sanskrit Education, Lucknow' },
    { value: 'Uttarakhand Board of School Education', label: 'Uttarakhand Board of School Education' },
    { value: 'Uttarakhand Madrasa Shiksha Parishad Dehradun', label: 'Uttarakhand Madrasa Shiksha Parishad Dehradun' },
    { value: 'Uttarakhand Sanskrit Education Board Dehradun', label: 'Uttarakhand Sanskrit Education Board Dehradun' },
    { value: 'Vocational Higher Secondary Education Kerala', label: 'Vocational Higher Secondary Education Kerala' },
    { value: 'West Bengal Board of Madrasa Education', label: 'West Bengal Board of Madrasa Education' },
    { value: 'West Bengal Board of Secondary Education (WBBSE)', label: 'West Bengal Board of Secondary Education (WBBSE)' },
    { value: 'West Bengal Council of Higher Secondary Education (WBCHSE)', label: 'West Bengal Council of Higher Secondary Education (WBCHSE)' },
    { value: 'West Bengal State Council of Technical Education & Vocational Education and Skill Development', label: 'West Bengal State Council of Technical Education & Vocational Education and Skill Development' }
  ]

  export const areaOptions = [
    { value: 'Rural', label: 'Rural' }, { value: 'Urban', label: 'Urban' }
  ]

    // Form field configurations
  export const personalDetailsFields = [
    { name: 'firstName', label: 'First Name', required: true, type: 'text', placeholder: 'Enter first name' },
    { name: 'middleName', label: 'Middle Name', required: false, type: 'text', placeholder: 'Enter middle name' },
    { name: 'lastName', label: 'Last Name', required: true, type: 'text', placeholder: 'Enter last name' },
    { name: 'fatherName', label: 'Father\'s Name', required: true, type: 'text', placeholder: 'Enter father\'s full name' },
    { name: 'motherName', label: 'Mother\'s Name', required: true, type: 'text', placeholder: 'Enter mother\'s full name' },
    { name: 'dateOfBirth', label: 'Date of Birth', required: true, type: 'date' }
  ]

  export const addressFields = [
    { name: 'villageName', label: 'Village Name', required: false, type: 'text', placeholder: 'Enter village/town name' },
    { name: 'pinCode', label: 'Pin Code', required: true, type: 'text', placeholder: '6 digit pin code', pattern: '[0-9]{6}', maxLength: '6' },
    { name: 'blockNagarNigam', label: 'Block / Nagar Nigam / Nagar Parishad / Panchayat', required: false, type: 'text', placeholder: 'Enter block/nagar nigam/nagar parishad/panchayat' },
    { name: 'postOffice', label: 'Post Office', required: false, type: 'text', placeholder: 'Enter post office name' }
  ]

  export   const officeUseOnlyFields = [
    { name: 'regNo', label: 'Reg. No.', type: 'text', placeholder: 'Enter registration number',},
    { name: 'regDate', label: 'Reg. Date', type: 'date' },
    { name: 'drccVerificationDate', label: 'DRCC Verification Date', type: 'date' },
    { name: 'learnerCode', label: 'Learner Code', type: 'text', placeholder: 'Enter 16 digit learner code', pattern: '[0-9]{16}', maxLength: '16' },
    { name: 'batchStartDate', label: 'Batch Start Date', type: 'date' },
    { name: 'batchEndDate', label: 'Batch End Date', type: 'date' },
    { name: 'allocation', label: 'Allocation', type: 'checkbox', placeholder: 'Enter allocation' },
    { name: 'convert', label: 'Convert', type: 'checkbox', placeholder: 'Enter convert' },
    { name: 'batchTime1', label: 'Batch Time 1', type: 'time' },
    { name: 'batchTime2', label: 'Batch Time 2', type: 'time' }
  ]

  export const officeUseOnly2Fields = [
    { name: 'enrollmentNo', label: 'Enrollment No.', type: 'text', placeholder: 'Enter enrollment number' },
    { name: 'enrollmentDate', label: 'Enrollment Date', type: 'date' },
    { name: 'courseDuration', label: 'Course Duration', type: 'text', placeholder: 'e.g., 6 months, 1 year' },
    { name: 'batchTime', label: 'Batch Time', type: 'time' },
    { name: 'certificateNo', label: 'Certificate No.', type: 'text', placeholder: 'Enter certificate number' },
    { name: 'dateOfIssue', label: 'Date of Issue', type: 'date' }
  ]

  export   const genderOptions = ['Male', 'Female', 'Other']
  
  export const streamOptions = [
      { value: 'Arts', label: 'Arts' },
      { value: 'Humanities', label: 'Humanities' },
      { value: 'Commerce', label: 'Commerce' },
      { value: 'Science PCM', label: 'Science PCM' },
      { value: 'Science PCB', label: 'Science PCB' },
      { value: 'Science PCMB (1st Maths)', label: 'Science PCMB (1st Maths)' },
      { value: 'Science PCBM (1st Bio)', label: 'Science PCBM (1st Bio)' },
    ]

  export const graduationStreamOptions = [
      { value: 'B.A. (Bachelor of Arts)', label: 'B.A. (Bachelor of Arts)' },
      { value: 'B.Sc. (Bachelor of Science)', label: 'B.Sc. (Bachelor of Science)' },
      { value: 'B.Tech/B.E. (Bachelor of Technology/Engineering)', label: 'B.Tech/B.E. (Bachelor of Technology/Engineering)' },
      { value: 'BCA (Bachelor of Computer Applications)', label: 'BCA (Bachelor of Computer Applications)' },
      { value: 'B.Com (Bachelor of Commerce)', label: 'B.Com (Bachelor of Commerce)' },
      { value: 'BBA (Bachelor of Business Administration)', label: 'BBA (Bachelor of Business Administration)' },
      { value: 'B.A. LL.B', label: 'B.A. LL.B' },
      { value: 'B.B.A. LL.B. ', label: 'B.B.A. LL.B. ' },
      { value: ' B.Des.', label: ' B.Des.' },
      { value: 'B.Ed. ', label: 'B.Ed. ' },
      { value: 'MBBS', label: 'MBBS' },
    ]

  export  const courseOptions = [
      { value: '10th', label: '10th' }, { value: '12th', label: '12th' },
      { value: 'Graduation', label: 'Graduation' }, { value: 'Post Graduation', label: 'Post Graduation' }
    ]
  
  export const otherCourseOptions = [
      { value: 'DCA', label: 'DCA' }, { value: 'ADCA', label: 'ADCA' }
    ]
  
  export  const programOptions = [
      { value: 'KYP', label: 'KYP' }, { value: 'SHA', label: 'SHA' }
    ]
  
  export  const mobileFields = [
      { name: 'mobile1', label: 'Mobile Number 1', required: true },
      { name: 'mobile2', label: 'Mobile Number 2', required: false },
      { name: 'mobile3', label: 'Mobile Number 3', required: false },
      { name: 'whatsapp', label: 'WhatsApp Number', required: false }
    ]
  
  export  const bankDetailFields = [
      { name: 'accountNumber', label: 'Account Number', placeholder: 'Enter account number', type: 'number', pattern: '[0-9]{17}', maxLength: '17' },
      { name: 'branchName', label: 'Branch Name', placeholder: 'Enter branch name', type: 'text' },
      { name: 'ifscCode', label: 'IFSC Code', placeholder: 'Enter IFSC code', type: 'text', pattern: '[A-Z]{4}[0-9]{7}', maxLength: '11' }
    ]