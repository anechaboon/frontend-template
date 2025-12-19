import api from '@/services/axios';

export async function csrf() {
    return api.get('/sanctum/csrf-cookie');
}

export async function login(payload) {
    return api.post('/api/login', payload);
}

export async function logout() {
    return api.post('/api/logout');
}

export async function me() {
    return api.get('/api/me');
}
