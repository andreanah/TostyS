import { axiosBase as axios } from "./AxiosConfig"

export const GetAll = async () => {
    try {
        const response = await axios.get("/creditcard/get")
        console.log("Get", response.data)
        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
}

export const Get = async (i) => {
    try {
        const response = await axios.get(`/creditcard/get/${i}`)
        console.log("Get", response.data)
        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
}

export const GetAllOfUser = async (i) => {
    try {
        const response = await axios.get(`/creditcard/GetAllOfUser/${i}`)
        console.log("GetAllOfUser", response.data)
        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
}

export const Create = async (creditCard) => {
    try {
        var newCreditCard = {
            ...creditCard,
            Id: 0,
        }
        const response = await axios.post("/creditcard/Create", newCreditCard)
        console.log("Create", response)
        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
}

export const Update = async (creditCard) => {
    try {
        const response = await axios.put(`/creditcard/update/${creditCard.Id}`, creditCard)
        console.log("Update", response)
        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
}

export const Disable = async (i) => {
    try {
        const response = await axios.delete(`/creditCard/disable/${i}`)
        console.log("Disable", response.data)
        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
}
