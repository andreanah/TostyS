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

export const SignUpAPI = async (user) => {
    try {
        const newUser = {
            ...user,
            Id:"",
            Active:1,
        }
        const response = await axios.post("/security/SignUp", newUser)
        console.log("SignUp", response)
        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
}