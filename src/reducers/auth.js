import { rejectedState, initState } from "./util";

export default (state = initState, action) => {
    switch (action.type){
        case "SET_ERROR":
            return rejectedState(state, action.error);
        default:
            return state;
    }
};

export const setError = (error) => ({
    type: "SET_ERROR",
    error
});