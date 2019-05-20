import {apiClient} from './util'

const config = {
    headers: {
        "Content-Type": "application/json"
    }
};

export default {
    loginUser: (data) => apiClient.post('/auth/login/json/', data, config)
}


