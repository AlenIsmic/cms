import news from "../Webapi/news";
import {fulfilled, fulfilledState, pending, pendingState, rejected, rejectedState} from "./util";
import {apiClient, tokenConfig} from "../Webapi/util";
import {Response} from "../Webapi/model/response";
import {News} from "../Webapi/model/news";

const initState = {
    news: [],
    newsCategories: [],
    isLoading: false
};

export default (state = initState, action) => {
    switch (action.type){
        case pending("LOAD_NEWS"):
            return pendingState(state);
        case fulfilled("LOAD_NEWS"):
            return {...state, news: action.payload.data, isLoading: false};
        case rejected("LOAD_NEWS"):
            return rejectedState(state, action.payload);
        case pending("GET_NEWS"):
            return pendingState(state);
        case fulfilled("GET_NEWS"):
            return {...state, news: action.payload.data, isLoading: false};
        case pending("LOAD_NEWS_CATEGORIES"):
            return pendingState(state);
        case fulfilled("LOAD_NEWS_CATEGORIES"):
            return {...state, newsCategories: action.payload.data, isLoading: false};
        case rejected("LOAD_NEWS_CATEGORIES"):
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            return rejectedState(state, action.payload);
        case pending("DELETE_NEWS"):
            return pendingState(state);
        case fulfilled("DELETE_NEWS"):
            console.log(action.payload.data);
            return {...state, newsCategories: action.payload.data, isLoading: false};
        case rejected("DELETE_NEWS"):
            return rejectedState(state, action.payload);
        default:
            return state;
    }
}

export const loadNews = () => ({
    type: "LOAD_NEWS",
    payload: news.list()
});

export const getNews = (url) => (
    {
        type: "GET_NEWS",
        payload: news.get(url)
    }
);

export const createNews = (data) => ({
   type: "CREATE_NEWS",
   payload: news.post(data)
});

export const updateNews = (data) => ({
    type: "CREATE_NEWS",
    payload: news.put(data)
});

export const deleteNews = (url) => ({
    type: "DELETE_NEWS",
    payload: news.delete(url)
});

export const loadNewsCategories = () => ({
   type: "LOAD_NEWS_CATEGORIES",
   payload: news.listCategories()
});