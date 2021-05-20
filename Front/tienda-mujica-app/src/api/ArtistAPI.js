import { axiosBase as axios } from "./AxiosConfig"

export const GetAll = async () => {
    try {
        const response = await axios.get("/artist/get")
        console.log("Get", response.data)
        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
}

export const Get = async (i) => {
    try {
        const response = await axios.get(`/artist/get/${i}`)
        console.log("Get", response.data)
        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
}

export const Create = async (artist) => {
    try {
        var newArtist = {
            ...artist,
            Id: 0,
        }
        const response = await axios.post("/artist/create", newArtist)
        console.log("Create", response)
        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
}

export const Update = async (artist) => {
    try {
        const response = await axios.put(`/artist/update/${artist.Id}`, artist)
        console.log("Update", response)
        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
}

export const Disable = async (i) => {
    try {
        const response = await axios.delete(`/artist/disable/${i}`)
        console.log("Disable", response.data)
        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
}
