import { axiosBase as axios } from "./AxiosConfig"

export const LoginAPI = async (userPassword) => {
    try {
        const newUserPassword = {
            ...userPassword,
            // Age: student.Age.length > 0 ? parseInt(student.Age) : null
        }
        const response = await axios.post("/security/Login", newUserPassword);
        console.log("SignUp", response);
        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
}

export const SignUp = async (user) => {
    try {
        const newUser = {
            ...user,
            // Age: student.Age.length > 0 ? parseInt(student.Age) : null
        }

        // , { 
        //     headers: { "Authorization": `Bearer ${token}` } })

        const response = await axios.post("/security/SignUp", newUser)
        console.log("SignUp", response)
        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
}