import axios from "../axios";

export const getProducts = async (page = 1) => {
    try {
        const response = await axios({
            url: `/products?page=${page}`,
            method: 'get',
        });
        return response; 
    } catch (err) {
        console.log("Lỗi khi gọi API:", err);
        throw err; 
    }
};
