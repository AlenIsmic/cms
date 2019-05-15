import {apiClient} from './util'

export default {
    loginUser: (data) => apiClient.post('/auth/login/json/', data),
}
