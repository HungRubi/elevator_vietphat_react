import axios from "../axios";

export const getArticles = async (page = 1) => {
    try{
        const response = await axios({
            url: `/articles?${page}`,
            method: 'get'
        })
        return response
    }catch(err){
        console.log('Lỗi khi gọi API: ' + err);
        throw err;
    }
}