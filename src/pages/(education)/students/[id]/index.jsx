import React, { useEffect, useState } from 'react'
import { data, useParams } from 'react-router-dom'
import Layout from '../../../../components/education/Layout'  
import Admission from '../admission'
const StudentID = () => {
  const [studentData, setStudentData] = useState({})


  useEffect(()=>{
   let data = localStorage.getItem("student")
    setStudentData(JSON.parse(data))
  },[])
  return (
   // <Layout>
      <div>
      <Admission
    initialData={studentData}
    isEdit={true}
  />

      </div>
    //</Layout>
  )
}

export default StudentID