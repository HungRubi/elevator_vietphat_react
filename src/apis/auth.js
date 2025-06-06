import axios from "../axios";

export const login = async (data) => {
    try {
        const response = await axios({
            url: "/auth/login",
            method: "post",
            data: data,
        });
        return response;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export const register = async (data) => {
    try {
        const response = await axios({
            url: "/auth/register",
            method: "post",
            data: data,
        });
        return response;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export const changePassword = async (id, data) => {
    try {
        const response = await axios({
            url: `/auth/password/${id}`,
            method: "PUT",
            data: data,
        });
        return response;
    } catch (err) {
        if(err.response) {
            return err.response
        }
        return {
            message: "Lỗi server vui lòng thử lại sau"
        }
    }
};