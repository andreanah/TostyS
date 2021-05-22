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

export const ShoppingCartToOrder = async (order) => {
    try {
        const newOrder = {
            IdUser: order.IdUser,
            IdAddress: order.IdAddress,
        }
        const response = await axios.post("/ShoppingCart/ShoppingCartToOrder", newOrder)
        console.log("Create", response)
        return response;
    } catch (error) {
        console.error(error.response);
        return error;
    }
}

export const Update = async (shoppingCart) => {
    try {
        const response = await axios.put(`/ShoppingCart/update/${shoppingCart.Id}`, shoppingCart)
        console.log("Update", response)
        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
}



export const Delete = async (i) => {
    try {
        const response = await axios.delete(`/ShoppingCart/Delete/${i}`)
        console.log("Delete", response.data)
        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
}