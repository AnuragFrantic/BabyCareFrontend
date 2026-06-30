import axios from "axios";

export const API_URL = "https://localhost:8767/api/v1/";
export const IMAGE_API_URL = "https://localhost:8767/";

// export const API_URL = "https://frush.franticpro.com:8766/api/v1/";
// export const IMAGE_API_URL = "https://frush.franticpro.com:8766/";

export const ferryWellAPI = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

ferryWellAPI.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    const cartToken = localStorage.getItem("cart-token");

    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    } else if (cartToken) {
        config.headers["cart-token"] = cartToken;
    }

    return config;
});


// Handle 401 globally
ferryWellAPI.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error?.response?.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("cart-token");
            localStorage.removeItem("user");

            // Optional: clear everything
            // localStorage.clear();

            // Redirect to login
            window.location.href = "/";
        }

        return Promise.reject(error);
    }
);