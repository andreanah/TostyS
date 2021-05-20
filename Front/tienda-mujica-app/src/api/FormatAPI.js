import { axiosBase as axios } from "./AxiosConfig"

export const GetAll = async () => {
    try {
        const response = await axios.get("/format/get")
        console.log("Get", response.data)
        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
}

export const Get = async (i) => {
    try {
        const response = await axios.get(`/format/get/${i}`)
        console.log("Get", response.data)
        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
}


export const Create = async (format) => {
    try {
        var newFormat = {
            ...format,
            Id: 0,
        }
        const response = await axios.post("/format/create", newFormat)
        console.log("Create", response)
        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
}

export const Update = async (format) => {
    try {
        const response = await axios.put(`/format/update/${format.Id}`, format)
        console.log("Update", response)
        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
}

export const Disable = async (i) => {
    try {
        const response = await axios.delete(`/format/disable/${i}`)
        console.log("Disable", response.data)
        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
}