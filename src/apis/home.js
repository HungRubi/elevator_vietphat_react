import axios from "../axios";

export const getHome = async () => {
    try{
        const response = await axios({
            url: 'home',
            method: 'get'
        })
        return response
    }catch(err){
        console.log(err);
    }
}

export const querySearch = async (query) => {
    try{
        const response = await axios({
            url: `timkiem?s=${query}`,
            method: 'get'
        })
        return response
    }catch(err){
        console.log(err);
    }
}