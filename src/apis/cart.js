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
        if(error.respronse) {
            return error.respronse
        }
        return {
            status: 500,
            message: "Lỗi server vui lòng thử lại sau"
        }
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
        if(error.respronse) {
            return error.respronse
        }
        return {
            status: 500,
            message: "Lỗi server vui lòng thử lại sau"
        }
    }
}