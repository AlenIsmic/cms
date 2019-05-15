export const pending = (action) => action + "_PENDING";
export const fulfilled = (action) => action + "_FULFILLED";
export const rejected = (action) => action + "_REJECTED";

export const pendingState = (state) => ({...state, loading: true});
export const fulfilledState = (state, extra) => ({...state, ...extra, loading: false});
export const errorState = (state, error) => ({...state, loading: false, error});

export const rejectedState = (state, error) => ({...state, sendingRequest: false, error});
export const initState = {
    sendingRequest: false,
    error: null
};