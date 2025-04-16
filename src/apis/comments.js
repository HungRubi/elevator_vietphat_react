import axios from "../axios";

export const addComment = async (data) => {
    try{
        const response = await axios({
            url: 'comment/add',
            method: 'POST',
            data: data
        })
        return response;
    }catch(error){
        console.log(error);
    }
}