import {fulfilled, pending, pendingState, rejected, rejectedState} from "./util";
import auth from "../Webapi/auth";

const initState = {
    user: {}
};

export default function (state = initState, action) {
    switch (action.type){
        case pending("GET_USER"):
            return pendingState(state);
        case fulfilled("GET_USER"):
            return {...state, user: action.payload.data};
        case rejected("GET_USER"):
            return rejectedState(state, action.payload);
        case "CLEAR_USER":
            return initState;
        default:
            return state;
    }
}

export const getUser = () => ({
    type: "GET_USER",
    payload: auth.getUser()
});

export const clearUser = () => ({
    type: "CLEAR_USER"
});

export const loginUser = (data) => ({
    type: "LOGIN_USER",
    payload: auth.loginUser(data)
});

export const logoutUser = () => ({
    type: "LOGOUT_USER",
    payload: auth.logoutUser()
});
