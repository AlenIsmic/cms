import axios, {AxiosInstance} from "axios";
import {API_URL} from "../config";
import {isEmpty} from "../util";

export const apiClient: AxiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true
});

export const tokenConfig = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${isEmpty(localStorage.getItem("token")) ? '' : localStorage.getItem("token")}`
        },
        withCredentials: false
};