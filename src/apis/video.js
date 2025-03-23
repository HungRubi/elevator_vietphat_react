import axios from "../axios";

export const getVideoDetail = async (slug) => {
    try{
        const response = await axios({
            url: `/category/video/${slug}`,
            method: 'get'
        })
        return response;
    }catch(err){
        console.log(err);
    }
}