export const pending = (action) => action + "_PENDING";
export const fulfilled = (action) => action + "_FULFILLED";
export const rejected = (action) => action + "_REJECTED";

export const pendingState = (state) => ({...state, isLoading: true});
// export const fulfilledState = (state, extra) => ({...state, ...extra, isLoading: false});
// export const errorState = (state, error) => ({...state, isLoading: false, error});

export const rejectedState = (state, error) => ({...state, error});
// export const initState = {
//     sendingRequest: false,
//     error: null
// };