import axios, {AxiosInstance} from "axios";
import {API_URL, AUTH_TOKEN} from "../config";

export const apiClient: AxiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

apiClient.defaults.headers.common = {'Authorization': `bearer ${AUTH_TOKEN}`}
