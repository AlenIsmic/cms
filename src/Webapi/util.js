import axios, {AxiosInstance} from "axios";
import {API_URL} from "../config";

export const apiClient: AxiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true
});

export const tokenConfig = () => {
    // Get token from state
    const token = localStorage.getItem("token");

    // Headers
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    // If token, add to headers config
    if (token) {
        config.headers["Authorization"] = `Token ${token}`;
    }

    return config;
};