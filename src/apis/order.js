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
        return response;
    }catch(error){
        return error.response;
    }
}

export const createPaymentUrl = async (data) => {
    try{
        const response = await axios({
            method: 'POST',
            url: '/create-payment-url',
            data: data,
        })
        return response;
    }catch(error){
        return error.response;
    }
}

export const paymentCheckOut = async (searchParams) => {
    try{
        const response = await axios({
            method: 'GET',
            url: `/check_payment?${searchParams.toString()}`,
        })
        return response;
    }catch(error){
        return error.response;
    }
}