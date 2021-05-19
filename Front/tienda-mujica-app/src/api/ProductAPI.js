import { axiosBase as axios } from "./AxiosConfig"

export const GetAll = async () => {
    try {
        const response = await axios.get("/product/get")
        console.log("GetAll", response.data)
        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
}

export const Get = async (i) => {
    try {
        const response = await axios.get(`/product/get/${i}`)
        console.log("Get", response.data)
        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
}

export const GetWithGenre = async (i) => {
    try {
        const response = await axios.get(`/product/GetWithGenre/`)
        console.log("Get", response.data)
        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
}

export const GetProducts = async () => {
    try {
        const response = await axios.get(`/product/getproduct/`)
        console.log("GetProducts", response.data)
        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
}

export const GetProduct = async (i) => {
    try {
        const response = await axios.get(`/product/getproduct/${i}`)
        console.log("GetProduct", response.data)
        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
}

export const GetProductsByGenre = async (i) => {
    try {
        const response = await axios.get(`/product/GetProductsByGenre/${i}`)
        console.log("GetProductsByGenre", response.data)
        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
}

export const Create = async (product) => {
    try {
        const newProduct = {
            ...product,
            // Age: student.Age.length > 0 ? parseInt(student.Age) : null
        }
        const response = await axios.post("/product/create", newProduct)
        console.log("Create", response)
        return response;
    } catch (error) {
        console.error(error.response);
        return error;
    }
}

export const Disable = async (i) => {
    try {
        const response = await axios.delete(`/product/disable/${i}`)
        console.log("Disable", response.data)
        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
}
