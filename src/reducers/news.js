import news from "../Webapi/news";
import {fulfilled, fulfilledState, pending, pendingState, rejected} from "./util";
import {apiClient, tokenConfig} from "../Webapi/util";
import {Response} from "../Webapi/model/response";
import {News} from "../Webapi/model/news";

const initState = {
    news: [],
    isLoading: false
};

export default (state = initState, action) => {
    switch (action.type){
        case pending("LOAD_NEWS"):
            return pendingState(state);
        case fulfilled("LOAD_NEWS"):
            return {...state, news: action.payload.data, isLoading: false};
        case rejected("LOAD_NEWS"):
            return {...state, isLoading: false};
        case pending("GET_NEWS"):
            return pendingState(state);
        case fulfilled("GET_NEWS"):
            return {...state, news: action.payload.data, isLoading: false};
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
    type: "CREATE_NEWS",
    payload: news.delete(url)
});
