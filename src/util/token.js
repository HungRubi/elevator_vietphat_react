const ACCESS_TOKEN_KEY = "accessToken";

export const getStoredAccessToken = () => {
    try {
        return localStorage.getItem(ACCESS_TOKEN_KEY);
    } catch {
        return null;
    }
};

export const setStoredAccessToken = (token) => {
    try {
        if (!token) return;
        localStorage.setItem(ACCESS_TOKEN_KEY, token);
    } catch {
        // Ignore storage errors to avoid breaking auth flow.
    }
};

export const clearStoredAccessToken = () => {
    try {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
    } catch {
        // Ignore storage errors to avoid breaking auth flow.
    }
};
