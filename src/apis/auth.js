import axios from "../axios";

export const login = async (data, isAdmin = false) => {
    try {
        const response = await axios({
            url: isAdmin ? "/auth/login/admin" : "/auth/login",
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
        const requestBody = {
            ...data,
            first: data?.first || data?.frist || "",
            frist: data?.frist || data?.first || "",
        };
        const response = await axios({
            url: "/auth/register",
            method: "post",
            data: requestBody,
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

export const refreshToken = async () => {
    try {
        const response = await axios({
            url: "/auth/refresh",
            method: "post",
            withCredentials: true,
        });
        return response;
    } catch (err) {
        throw err;
    }
};

export const logout = async () => {
    try {
        const response = await axios({
            url: "/auth/logout",
            method: "post",
            withCredentials: true,
        });
        return response;
    } catch (err) {
        throw err;
    }
};