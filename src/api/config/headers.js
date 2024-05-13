import auth from '../../middlewares/auth.js';

const headers = (isPublic) => {
    if (tokenWithValidations(isPublic)) {
        return {
            ...commonHeaders,
            Authorization: `Bearer ${auth.getToken()}`
        }
    }

    return commonHeaders;
}

const tokenWithValidations = (isPublic) => {
    return !isPublic && auth.getToken();
}

const commonHeaders = {
    'Content-Type': 'application/json',
}

export default headers;