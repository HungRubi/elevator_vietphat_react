import axios from "../axios";

export const isReadNotification = async (id, data) => {
    try{
        const response = await axios({
            method: 'PUT',
            url: `notification/read/${id}`,
            data: data
        })
        return response;
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

export const getNotifiByUser = async (id) => {
    try{
        const response = await axios({
            method: 'GET',
            url: `notification/all/${id}`,
        })
        return response;
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
