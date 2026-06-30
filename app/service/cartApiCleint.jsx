import axios from "axios";
import { API_URL } from "./api";

export const cartAPI = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

cartAPI.interceptors.request.use(
    (config) => {
        if (typeof window !== "undefined") {
            const carttoken = localStorage.getItem("cart-token");
            const token = localStorage.getItem("token");


            if (carttoken) {
                config.headers["cart-token"] = carttoken;
            }

            if (token) {
                config.headers["Authorization"] = `Bearer ${token}`;
            }
        }

        return config;
    },
    (error) => Promise.reject(error)
);


// Handle 401 globally
cartAPI.interceptors.response.use(
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