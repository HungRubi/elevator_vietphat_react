import axios from "../axios";

export const getProductDetail = async (slug) => {
    try{
        const response = await axios({
            url: `/products/${slug}`,
            method: 'get'
        })
        return response.data
    }catch(err){
        console.log(err);
    }
}