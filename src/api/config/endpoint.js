const endpoint = {
    get: (baseUrl) => {
        return baseUrl || import.meta.env.VITE_APP_BASE_URL;
    }
};

export default endpoint;