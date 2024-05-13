import api from "../index.js";

const login = {
    signIn: (payload) => {
        return api(false, true).post('auth/login', payload)
    }
}

export default login;