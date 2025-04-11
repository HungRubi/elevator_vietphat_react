import axios from '../axios';

export const updateCart = async (data, id) => {
    try{
        const respronse = await axios({
            method: 'PUT',
            url: `/cart/update/${id}`,
            data: data
        })
        return respronse;
    }catch(error){
        console.error('Error updating cart:', error);
        throw error;
    }
}