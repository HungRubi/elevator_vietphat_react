import axios from "axios";
import {
    getStoredAccessToken,
    setStoredAccessToken,
    clearStoredAccessToken,
} from "./util/token";

const baseURL = import.meta.env.VITE_SERVER_URL;

const instance = axios.create({
    baseURL,
    withCredentials: true,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach((promise) => {
        if (error) {
            promise.reject(error);
        } else {
            promise.resolve(token);
        }
    });
    failedQueue = [];
};

instance.interceptors.request.use(
    (config) => {
        const token = getStoredAccessToken();
        if (token && !config.headers?.Authorization) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

instance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        const isUnauthorized = error?.response?.status === 401;
        const isRefreshUrl = originalRequest?.url?.includes("/auth/refresh");
        const isAuthAction = originalRequest?.url?.includes("/auth/login")
            || originalRequest?.url?.includes("/auth/register")
            || originalRequest?.url?.includes("/auth/logout");

        if (!isUnauthorized || originalRequest?._retry || isRefreshUrl || isAuthAction) {
            return Promise.reject(error);
        }

        if (isRefreshing) {
            return new Promise((resolve, reject) => {
                failedQueue.push({ resolve, reject });
            }).then((token) => {
                originalRequest.headers.Authorization = `Bearer ${token}`;
                return instance(originalRequest);
            });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
            const refreshResponse = await axios.post(
                `${baseURL}/auth/refresh`,
                {},
                { withCredentials: true }
            );

            const newAccessToken = refreshResponse?.data?.accessToken;
            if (!newAccessToken) {
                throw new Error("No access token returned from refresh endpoint");
            }

            setStoredAccessToken(newAccessToken);
            processQueue(null, newAccessToken);
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return instance(originalRequest);
        } catch (refreshError) {
            clearStoredAccessToken();
            processQueue(refreshError, null);
            return Promise.reject(refreshError);
        } finally {
            isRefreshing = false;
        }
    }
);

export default instance;