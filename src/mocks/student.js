import axios from "axios";

class StudentApi{

    async createStudent(studentdata){

      try {
        // Check if studentdata is FormData (for file uploads) or plain object
        const isFormData = typeof FormData !== 'undefined' && studentdata instanceof FormData
        
        const headers = {
          "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MWM5NTMzNzE2Y2VjZTBjNTZmZTZhZSIsImVtYWlsIjoiYW5raXQucGF1bDk5NTVAZ21haWwuY28iLCJpYXQiOjE3NjQwMDAzMTYsImV4cCI6MTc2NDYwMDMxNn0.McDfxz-Mr2AVphgik_g_UDXZrLfqQPF8_8FAD7T5vls`
        }
        
        // Don't set Content-Type for FormData - axios will set it automatically with boundary
        if (!isFormData) {
          headers["Content-Type"] = "application/json"
        }

        console.log('📤 Sending to API:', `${process.env.NEXT_PUBLIC_API_URL}/userapp/students/create`)
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

        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/userapp/students/create`, 
          studentdata,
          { headers }
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