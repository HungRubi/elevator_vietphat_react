import axios from "../axios";

export const getArticles = async () => {
    try{
        const response = await axios({
            url: `/articles`,
            method: 'get'
        })
        return response
    }catch(err){
        console.log('Lỗi khi gọi API: ' + err);
        throw err;
    }
}

export const getArticleDetail = async (slug) => {
    try{
        const response = await axios({
            url: `/articles/fe/${slug}`,
            method: 'get'
        })
        return response.data
    }catch(err){
        console.log(err);
    }
}