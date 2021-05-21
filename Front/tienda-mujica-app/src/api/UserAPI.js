import {axiosBase as axios} from "./AxiosConfig"

export const GetAll = async () => {
    try {
        const response = await axios.get("/user/get")
        console.log("GetAll", response.data)
        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
}

export const Get = async (i) => {
    try {
        const response = await axios.get(`/user/get/${i}`)
        console.log("Get", response.data)
        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
}

export const Identity = async (i) => {
    try {
        const response = await axios.get(`/user/identity`)
        console.log("identity", response.data)
        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
}

export const GetRole = async () => {
    try {
        const response = await axios.get(`/user/GetRole`)
        console.log("Get", response.data)
        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
}