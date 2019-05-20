import {fulfilled, pending, pendingState, rejected, rejectedState} from "./util";
import user from "../Webapi/user";

const initState = {
    user: null,
    isLoading: false
};

export default function (state = initState, action) {
    switch (action.type){
        case "GET_USER":
            return {...state, user: JSON.parse(localStorage.getItem("user"))};
        case "LOGOUT_USER":
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            return {...state, user: null, isLoading: false};
        case pending("LOGIN_USER"):
            return pendingState(state);
        case fulfilled("LOGIN_USER"):
            localStorage.setItem("token", action.payload.data.token);
            localStorage.setItem("user", JSON.stringify(action.payload.data.user));
            return {...state, user: action.payload.data.user, isLoading: false};
        case rejected("LOGIN_USER"):
            return rejectedState(state, action.payload);
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
    type: "LOGIN_USER", payload: user.loginUser(data)
});

export const logoutUser = () => ({
    type: "LOGOUT_USER"
});