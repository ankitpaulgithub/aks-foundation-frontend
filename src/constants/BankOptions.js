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
    { name: 'bankPasbook', label: 'Bank Pasbook', required: true, accept: 'image/*' },
    { name: 'residentialCertificate', label: 'Residential Certificate', required: true, accept: 'image/*' },
    { name: 'provisionalCertificate', label: 'Provisional Certificate', required: true, accept: 'image/*' },
    { name: 'aadhaarFront', label: 'Aadhaar Card Front', required: true, accept: 'image/*' },
    { name: 'aadhaarBack', label: 'Aadhar Card Back', required: true, accept: 'image/*' },
    { name: 'drccReceipt', label: 'DRCC Receipt', required: true, accept: 'image/*' },
    { name: 'counselorSignature', label: 'Counselor Signature', required: false, accept: '.pdf,.jpg,.jpeg,.png' },
    { name: 'applicantSignature', label: 'Applicant Signature', required: false, accept: '.pdf,.jpg,.jpeg,.png' }
  ]

  export const occupationOptions = [
    { value: 'Farmer', label: 'Farmer - किसान' },
    { value: 'Business', label: 'Business' },
    { value: 'Government Employee', label: 'Government Employee' },
    { value: 'Private Employee', label: 'Private Employee' },
    { value: 'Teacher', label: 'Teacher' },
    { value: 'Doctor', label: 'Doctor' },
    { value: 'Engineer', label: 'Engineer' },
    { value: 'Lawyer', label: 'Lawyer' },
    { value: 'Self Employed', label: 'Self Employed' },
    { value: 'Retired', label: 'Retired' },
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
    { name: 'program', label: 'Program', type: 'text', placeholder: 'Enter program name' },
    { name: 'payment', label: 'Payment', type: 'text', placeholder: 'Enter payment amount' },
    { name: 'paymentDate', label: 'Payment Date', type: 'date' },
    { name: 'drccVerificationDate', label: 'DRCC Verification Date', type: 'date' },
    { name: 'learnerCode', label: 'Learner Code', type: 'text', placeholder: 'Enter learner code' },
    { name: 'batchStartDate', label: 'Batch Start Date', type: 'date' },
    { name: 'batchCode', label: 'Batch Code', type: 'text', placeholder: 'Enter batch code' },
    { name: 'allocation', label: 'Allocation', type: 'checkbox', placeholder: 'Enter allocation' },
    { name: 'convert', label: 'Convert', type: 'checkbox', placeholder: 'Enter convert' },
    { name: 'batchTime1', label: 'Batch Time 1', type: 'time' },
    { name: 'batchTime2', label: 'Batch Time 2', type: 'time' }
  ]

  export const officeUseOnly2Fields = [
    { name: 'enrollmentNo', label: 'Enrollment No.', type: 'text', placeholder: 'Enter enrollment number' },
    { name: 'enrollmentDate', label: 'Enrollment Date', type: 'date' },
    { name: 'program2', label: 'Program', type: 'text', placeholder: 'Enter program name' },
    { name: 'courseDuration', label: 'Course Duration', type: 'text', placeholder: 'e.g., 6 months, 1 year' },
    { name: 'batchTime', label: 'Batch Time', type: 'time' },
    { name: 'certificateNo', label: 'Certificate No.', type: 'text', placeholder: 'Enter certificate number' },
    { name: 'dateOfIssue', label: 'Date of Issue', type: 'date' }
  ]

  export   const genderOptions = ['Male', 'Female', 'Other']
  
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