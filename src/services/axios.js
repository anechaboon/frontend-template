import axios from 'axios';

const getCsrfToken = () => {
    const name = 'XSRF-TOKEN=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    for(let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i].trim();
        if (cookie.indexOf(name) === 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }
    return '';
};

const api = axios.create({
    baseURL: 'http://localhost',
    withCredentials: true,
});

api.interceptors.request.use((config) => {
    const token = getCsrfToken();
    if (token) {
        config.headers['X-XSRF-TOKEN'] = token;
    }
    config.headers['X-Requested-With'] = 'XMLHttpRequest';
    return config;
});


export default api;
