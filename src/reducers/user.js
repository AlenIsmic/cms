import {fulfilled, pending, pendingState, rejected, rejectedState} from "./util";
import auth from "../Webapi/auth";

const initState = {
    user: {},
    token: "",
    isLoading: false
};

export default function (state = initState, action) {
    switch (action.type){
        case "GET_USER":
            return {...state, user: localStorage.getItem("user") === null ? {} : JSON.parse(localStorage.getItem("user")),
                token: localStorage.getItem("token") === null ? "" : localStorage.getItem("token")};
        case "LOGOUT_USER":
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            return {...state, token: "", user: {}, isLoading: false};
        case pending("LOGIN_USER"):
            return pendingState(state);
        case fulfilled("LOGIN_USER"):
            localStorage.setItem("token", action.payload.data.token);
            localStorage.setItem("user", JSON.stringify(action.payload.data.user));
            return {...state, ...action.payload, token: action.payload.data.token, user: action.payload.data.user, isLoading: false};
        case "CLEAR_USER":
            return initState;
        default:
            return state;
    }
}

export const getUser = () => ({
    type: "GET_USER"
});

export const clearUser = () => ({
    type: "CLEAR_USER"
});

export const loginUser = (data) => ({
    type: "LOGIN_USER", payload: auth.loginUser(data)
});

export const logoutUser = () => ({
    type: "LOGOUT_USER"
});