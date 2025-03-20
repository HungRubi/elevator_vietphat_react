import axios from "../axios";

export const getHome = async () => {
    try{
        const response = await axios({
            url: 'home',
            method: 'get'
        })
        console.log(response);
        return response
    }catch(err){
        console.log(err);
    }
}