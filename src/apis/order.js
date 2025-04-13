import axios from '../axios';

export const addOrder = async (data) => {
    try{
        const response = await axios({
            method: 'POST',
            url: 'order/store',
            data: data,
        })
        console.log(response.data);
        return response;
    }catch(error){
        console.log(error);
    }
}