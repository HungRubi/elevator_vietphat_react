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
        return response;
    }catch(error){
        return error.response;
    }
}

export const updateProfileUser = async (data, id) => {
    try {
        const response = await axios({
            url: `/user/profile/update/${id}`,
            method: 'PUT',
            data: data
        });
        return response;
    } catch (error) {
        if(error.response){
            return error.response
        }
        return {
            message: "Lỗi server vui lòng thử lại sau"
        }
    }
}