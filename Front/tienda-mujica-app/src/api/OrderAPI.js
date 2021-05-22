import { axiosBase as axios } from "./AxiosConfig"

export const GetOrderOrderProducts = async (id) => {
    try {
        const response = await axios.get(`/order/GetOrderOrderProducts/${id}`)
        console.log("GetOrderOrderProducts", response.data)
        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
}

export const OrderConfirm = async (id) => {
    try {
        const response = await axios.put(`/order/OrderConfirm/${id}`)
        console.log("OrderConfirm", response.data)
        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
}
