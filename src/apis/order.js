import axios from '../axios';

export const addOrder = async (data) => {
    try{
        const response = await axios({
            method: 'POST',
            url: 'order/store',
            data: data,
        })
        return response;
    }catch(error){
        return error.response;
    }
}

export const updateOrder = async (id, data) => {
    try{
        const response = await axios({
            method: 'PUT',
            url: `order/${id}`,
            data: {
                status: data.status,
                userId: data.userId
            }
        })
        console.log(response)
        return response;
    }catch(error){
        return error.response;
    }
}