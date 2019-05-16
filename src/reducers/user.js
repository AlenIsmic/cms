import {fulfilled, pending, pendingState, rejected, rejectedState} from "./util";
import auth from "../Webapi/auth";

const initState = {
    user: {},
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    isLoading: false
};

export default function (state = initState, action) {
    switch (action.type){
        case "GET_USER":
            return {...state, user: localStorage.getItem("user"), token: localStorage.getItem("token"),
                isAuthenticated: true, isLoading: false};
        case "LOGOUT_USER":
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            return {...state, token: null, user: {}, isAuthenticated: null, isLoading: false};
        case pending("LOGIN_USER"):
            return pendingState(state);
        case fulfilled("LOGIN_USER"):
            localStorage.setItem("token", action.payload.data.token);
            localStorage.setItem("user", JSON.stringify(action.payload.data.user));
            return {...state, ...action.payload, isAuthenticated: true, isLoading: false};
        case "CLEAR_USER":
            return initState;
        default:
            return state;
    }
}

export const getUser = () => (dispatch) => {
    dispatch({ type: "GET_USER" });
};

// export const clearUser = () => ({
//     type: "CLEAR_USER"
// });

export const loginUser = (data) => (dispatch) => {
    dispatch({type: "LOGIN_USER", payload: auth.loginUser(data)});
};

export const logoutUser = () => (dispatch) => {
    dispatch({type: "LOGOUT_USER"});
};