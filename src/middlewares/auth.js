const auth = {
    getToken: () => {
        return sessionStorage.getItem('token');
    },
}

export default auth;