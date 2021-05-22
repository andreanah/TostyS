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

export const Update = async (user) => {
    try {
        const response = await axios.put(`/user/update/${user.Id}`, user)
        console.log("Update", response)
        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
}

export const GetShoppingCartUser = async (i) => {
    try {
        const response = await axios.get(`/user/GetShoppingCartUser/${i}`)
        console.log("GetShoppingCartUser", response.data)
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

export const Disable = async (i) => {
    try {
        const response = await axios.delete(`/user/disable/${i}`)
        console.log("Disable", response.data)
        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
}