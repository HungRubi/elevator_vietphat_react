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
        console.log(response)
        return response;
    }catch(err){
        console.log(err);
    }
}

export const setSelectedProducts = async (data) => {
    try{
        const response = await axios({
            url: `/products/selected`,
            method: 'post',
            data: data
        })
        return response;
    }catch(error){
        console.log(error);
    }
}
