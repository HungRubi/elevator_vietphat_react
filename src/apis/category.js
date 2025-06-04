import axios from "../axios";

export const getCategoryProduct = async () => {
    try{
        const response = await axios({
            method: "GET",
            url: "/category/product",
        })
        return response
    }catch(error) {
        if(error.response) {
            return error.response;
        }
        return {
            message: "Lỗi server vui lòng thử lại sau"
        }
    }
}

export const getProductByCategory = async (id) => {
    try{
        const response = await axios({
            method: "GET",
            url: `/category/product/get-product/${id}`,
        })
        return response
    }catch(error) {
        if(error.response) {
            return error.response;
        }
        return {
            message: "Lỗi server vui lòng thử lại sau"
        }
    }
}