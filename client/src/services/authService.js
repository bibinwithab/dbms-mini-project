import axiosInstance from "../utils/axiosInstance";

export const registerUser = async(userData)=>{
    try{
        const response = await axiosInstance.post("api/auth/register",userData);
        return response;
    }catch(error){
        return error.response;
    }
}

export const loginUser = async(userData)=>{
    try{
        const response = await axiosInstance.post("api/auth/login",userData);
        return response;
    }catch(error){
        return error.response;
    }
}

export const logoutUser = async () => {
    try {
      const response = await axiosInstance.get('/auth/logout');
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };
  