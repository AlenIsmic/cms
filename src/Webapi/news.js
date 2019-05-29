import {apiClient} from "./util";
import type {Response} from "./model/response";
import type {News, NewsCategory} from "./model/news";
import {tokenConfig} from "./util";

export default {
    list: (limit, offset): Response<Array<News>> => apiClient.get("/cms/news/", tokenConfig),
    get: (url) => apiClient.get(`/cms/news/${url}/`, tokenConfig),
    post: (data) => apiClient.post(`/cms/news/`, data, tokenConfig),
    put: (id, data) => apiClient.put(`/cms/news/${id}/`, data, tokenConfig),
    delete: (url) => apiClient.delete(`${url}`, tokenConfig),
    listCategories: () => apiClient.get("/choices/NEWS_CATEGORIES/", tokenConfig)
}


