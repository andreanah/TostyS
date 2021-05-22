import { axiosBase as axios } from "./AxiosConfig"

export const GetAll = async () => {
    try {
        const response = await axios.get("/address/get")
        console.log("Get", response.data)
        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
}

export const Get = async (i) => {
    try {
        const response = await axios.get(`/address/get/${i}`)
        console.log("Get", response.data)
        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
}

export const GetAllOfUser = async (i) => {
    try {
        const response = await axios.get(`/address/GetAllOfUser/${i}`)
        console.log("GetAllOfUser", response.data)
        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
}

export const Create = async (address) => {
    try {
        const newAddress = {
            ...address,
            Id:0
        }
        const response = await axios.post("/address/create", newAddress)
        console.log("GetAll", response)
        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
}

export const Update = async (address) => {
    try {
        const response = await axios.put(`/address/update/${address.Id}`, address)
        console.log("Update", response)
        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
}


export const Disable = async (i) => {
    try {
        const response = await axios.delete(`/address/disable/${i}`)
        console.log("Disable", response.data)
        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
}
