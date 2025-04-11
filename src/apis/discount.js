import axios from "../axios";

export const getDiscounts = async () => {
    try {
        const response = await axios({
            url: "/category/discount",
            method: "get",
        });
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
