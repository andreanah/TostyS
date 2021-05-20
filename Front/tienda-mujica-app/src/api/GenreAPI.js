import { axiosBase as axios } from "./AxiosConfig"

export const GetAll = async () => {
    try {
        const response = await axios.get("/genre/get")
        console.log("Get", response.data)
        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
}

export const Get = async (i) => {
    try {
        const response = await axios.get(`/genre/get/${i}`)
        console.log("Get", response.data)
        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
}

export const Create = async (genre) => {
    try {
        const newGenre = {
            ...genre,
            Id: 0
        }
        const response = await axios.post("/genre/create", newGenre)
        console.log("Create", response)
        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
}

export const Update = async (genre) => {
    try {
        const response = await axios.put(`/genre/update/${genre.Id}`, genre)
        console.log("Update", response)
        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
}

export const Disable = async (i) => {
    try {
        const response = await axios.delete(`/genre/disable/${i}`)
        console.log("Disable", response.data)
        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
}