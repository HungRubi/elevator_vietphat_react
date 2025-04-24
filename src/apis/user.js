import axios from '../axios';

export const updateAdress = async (data, id) => {
    try {
        const response = await axios({
            url: `/user/update/address/${id}`,
            method: 'put',
            data: data
        });
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const getOrderByUser = async (id) => {
    try{
        const response = await axios({
            url: `/user/order/${id}`,
            method: 'GET',
        });
        console.log(response);
        return response;
    }catch(error){
        return error.response;
    }
}