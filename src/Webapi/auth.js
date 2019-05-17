import {apiClient} from './util'

const config = {
    headers: {
        "Content-Type": "application/json"
    }
};

export default {
    loginUser: (data) => apiClient.post('/auth/login/json/', data, config)
}

export const tokenConfig = getState => {
    // Get token from state
    const token = getState().user.token;

    // Headers
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    // If token, add to headers config
    if (token) {
        config.headers["Authorization"] = `Token ${token}`;
    }

    return config;
};


