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

export const deleteCartItem = async (data, id) => {
    try{
        const respronse = await axios({
            method: 'PUT',
            url: `/cart/delete/${id}`,
            data: data
        })
        return respronse;
    }catch(error){
        console.error('Error deleting cart:', error);
        throw error;
    }
}