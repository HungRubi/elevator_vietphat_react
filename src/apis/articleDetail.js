import axios from "../axios";

export const getArticleDetail = async (slug) => {
    try{
        const response = await axios({
            url: `/articles/${slug}`,
            method: 'get'
        })
        return response.data
    }catch(err){
        console.log(err);
    }
}