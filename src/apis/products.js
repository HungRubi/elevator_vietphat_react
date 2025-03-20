import axios from "../axios";

export const getProducts = async () => {
    try {
        const response = await axios({
            url: `/products`,
            method: 'get',
        });
        return response; 
    } catch (err) {
        console.log("Lỗi khi gọi API:", err);
        throw err; 
    }
};

export const getProductDetail = async (slug) => {
    try{
        const response = await axios({
            url: `/products/fe/${slug}`,
            method: 'get'
        })
        return response.data
    }catch(err){
        console.log(err);
    }
}
