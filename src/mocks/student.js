import axiosInstance from "../utils/axiosInstance";

class StudentApi{

    /**
     * Validate a single field (mobile, email, aadhaar, registrationNo) in real-time
     * @param {string} field - Field name: 'mobileNo1', 'email', 'aadhaarNo', 'registrationNo'
     * @param {string} value - Value to validate
     * @returns {Promise<{exists: boolean, message: string}>}
     */
    async validateField(field, value) {
      try {
        const response = await axiosInstance.post(
          '/userapp/students/validate-field',
          { field, value }
        );

        if (response.data.status === 'SUCCESS') {
          return response.data.data;
        }
        return { exists: false, message: 'Validation failed' };
      } catch (error) {
        console.error('❌ Validation API Error:', error.response?.data || error.message);
        // Return false on error to not block form submission
        return { exists: false, message: 'Unable to validate' };
      }
    }

    /**
     * Validate multiple fields at once
     * @param {Object} fields - Object with field values { mobileNo1, email, aadhaarNo, registrationNo }
     * @returns {Promise<{isValid: boolean, results: Object, errors: string[]}>}
     */
    async validateMultipleFields(fields) {
      try {
        const response = await axiosInstance.post(
          '/userapp/students/validate-fields',
          fields
        );

        if (response.data.status === 'SUCCESS') {
          return response.data.data;
        }
        return { isValid: true, results: {}, errors: [] };
      } catch (error) {
        console.error('❌ Validation API Error:', error.response?.data || error.message);
        return { isValid: true, results: {}, errors: [] };
      }
    }

    async createStudent(studentdata){
      try {
        // Check if studentdata is FormData (for file uploads) or plain object
        const isFormData = typeof FormData !== 'undefined' && studentdata instanceof FormData

        console.log('📤 Sending to API: /userapp/students/create')
        console.log('📦 Data type:', isFormData ? 'FormData' : 'JSON')
        
        // Log FormData contents if it's FormData
        if (isFormData) {
          console.log('📋 FormData entries:')
          for (let [key, value] of studentdata.entries()) {
            if (value instanceof File) {
              console.log(`  ${key}: [File] ${value.name} (${value.size} bytes)`)
            } else {
              console.log(`  ${key}: ${value}`)
            }
          }
        }

        const response = await axiosInstance.post(
          '/userapp/students/create', 
          studentdata
        );
        
        console.log('📥 API Response:', response.data)
        
        if(response.data.status === 'SUCCESS')
          return response.data;
        else
          return false;
      } catch (error) {
        console.error('❌ API Error:', error.response?.data || error.message)
        throw error
      }
    }

    /**
     * Get list of students with pagination
     * @param {Object} options - Query options { page, limit, query }
     * @returns {Promise<{data: Array, paginator: Object}>}
     */
    async getStudents(options = {}) {
      try {
        const response = await axiosInstance.post(
          '/userapp/students/list',
          {
            query: options.query || { isDeleted: false },
            options: {
              page: options.page || 1,
              limit: options.limit || 10,
              pagination: true,
              ...(options.select && { select: options.select })
            },
            ...(options.fullDetails && { fullDetails: true })
          }
        );

        if (response.data.status === 'SUCCESS') {
          return response.data.data;
        }
        return { data: [], paginator: { itemCount: 0, perPage: 10, pageCount: 0, currentPage: 1 } };
      } catch (error) {
        console.error('❌ Get Students API Error:', error.response?.data || error.message);
        throw error;
      }
    }

    /**
     * Get single student by ID
     * @param {string} id - Student ID
     * @returns {Promise<Object>}
     */
    async getStudentById(id) {
      try {
        const response = await axiosInstance.get(
          `/userapp/students/get/${id}`
        );

        if (response.data.status === 'SUCCESS') {
          return response.data.data;
        }
        return null;
      } catch (error) {
        console.error('❌ Get Student API Error:', error.response?.data || error.message);
        throw error;
      }
    } 

//     async updateUser(id:any,data:any){
//       try {
        
//         const token = await getToken();
//         const response = await axios.put(`${process.env.EXPO_PUBLIC_API_URL}/userapp/user/update/${id}`,data,{
//           method: "put",
//           headers: { 
//           "Authorization": ` Bearer ${token}`
//           }
//         });
  
      
//           if(response.data.status==='SUCCESS')
//           return response.data;
//           else
//            return false;
//       } catch (error) {
//         console.log(error);
//       }
//     } 

//     async deleteUser(id:any){
//       const response = await axios.delete(`${process.env.EXPO_PUBLIC_API_URL}/userapp/user/delete/${id}`,{
//         method: "delete",
//         headers: { 
//         "Authorization": `Bearer ${AsyncStorage.getItem("accessToken")}`
//         }
//       });
//         if(response.data.status==='SUCCESS')
//         return response.data;
//         else
//          return false;
//     } 




    
//     async register(data:any){
//     try {
     
//       // console.log(`${process.env.EXPO_PUBLIC_API_URL}`)
//    const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/userapp/auth/register`,data);
//   // console.log(response.data.status)
//    if(response.data.status==='SUCCESS')
//    return response.data;
//    else
//     return false;
// } 
// catch (error) {
//    console.log(error)
// }
//   } 
  
   

//    async login(data:any){
//     try {
//         console.log('server',process.env.EXPO_PUBLIC_API_URL)
//         const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/userapp/auth/login`,data);
//         // console.log(`${process.env.EXPO_PUBLIC_API_URL}/userapp/auth/login`,'response')
//         if(response.data.status==='SUCCESS'){
              
//             return response.data;
//         }
//         else
//          return false;
//     } catch (error) {
//         console.log(error,'error in api')
//     }
   
//    } 

   

}


export const studentapi = new StudentApi();