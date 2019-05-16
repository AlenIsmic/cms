import axios, {AxiosInstance} from "axios";
import {API_URL} from "../config";

export const apiClient: AxiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true
});