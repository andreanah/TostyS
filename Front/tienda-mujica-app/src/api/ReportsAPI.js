import { axiosBase as axios } from "./AxiosConfig"

export const GetTopSellingProducts = async () => {
    try {
        const response = await axios.get("/reports/GetTopSellingProducts")
        console.log("GetTopSellingProducts", response.data)
        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
}
export const GetTopSellingGenres = async () => {
    try {
        const response = await axios.get("/reports/GetTopSellingGenres")
        console.log("GetTopSellingGenres", response.data)
        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
}

export const GetTopSellingArtists = async () => {
    try {
        const response = await axios.get("/reports/GetTopSellingArtists")
        console.log("GetTopSellingArtists", response.data)
        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
}
export const GetTopSellingFormats = async () => {
    try {
        const response = await axios.get("/reports/GetTopSellingFormats")
        console.log("GetTopSellingFormats", response.data)
        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
}
