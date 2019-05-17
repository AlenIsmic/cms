import {apiClient} from './util'

const config = {
    headers: {
        "Content-Type": "application/json"
    }
};

const mainUrl = 'https://api.digitalx.prontoweb.org';

export default {
    loginUser: (data) => apiClient.post(mainUrl+'/auth/login/json/', data, config)
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


