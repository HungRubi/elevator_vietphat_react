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
        console.log(response)
        return response;
    } catch (err) {
        console.log(err);
        throw err;
    }
};