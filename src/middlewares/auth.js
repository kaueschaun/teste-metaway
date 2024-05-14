const auth = {
    getToken: () => {
        return sessionStorage.getItem('token') || sessionStorage.getItem('token')
    },
}

export default auth;