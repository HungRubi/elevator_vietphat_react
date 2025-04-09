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