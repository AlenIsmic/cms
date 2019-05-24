import {apiClient} from "./util";
import type {Response} from "./model/response";
import type {News, NewsCategory} from "./model/news";
import {tokenConfig} from "./util";

export default {
    list: (limit, offset): Response<Array<News>> => apiClient.get("/cms/news/", tokenConfig),
    get: (url): Response<News> => apiClient.get(`${url}`, tokenConfig),
    post: (data) => apiClient.post(`${data.url}`, data, tokenConfig),
    put: (data) => apiClient.put(`${data.url}`, data, tokenConfig),
    delete: (url) => apiClient.delete(`${url}`, tokenConfig),
    listCategories: () => apiClient.get("/choices/NEWS_CATEGORIES/", tokenConfig)
}


