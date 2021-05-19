﻿import { axiosBase as axios } from "./AxiosConfig"

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

export const Create = async (student) => {
    try {
        const newGenre = {
            ...student,
            Age: student.Age.length > 0 ? parseInt(student.Age) : null
        }
        const response = await axios.post("/address/create", newGenre)
        console.log("GetAll", response)
        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
}
