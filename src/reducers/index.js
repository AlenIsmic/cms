import {combineReducers} from 'redux';
import user from "./user";
import news from "./news";
import auth from "./auth";

export default combineReducers({
    user,
    auth,
    news
});
