import {axiosBase as axios} from "./AxiosConfig"

export const Create = async (shoppingCart) => {
    try {
        const newShoppingCart = {
            ...shoppingCart,
            Id:0,
        }
        const response = await axios.post("/ShoppingCart/create", newShoppingCart)
        console.log("Create", response)
        return response;
    } catch (error) {
        console.error(error.response);
        return error;
    }
}