import api from '@/services/axios';

export async function getUsers(params) {
    return api.get('/api/v1/users', { params });
}

export async function getUser(id) {
    return api.get(`/api/v1/users/${id}`);
}

export async function createUser(payload) {
    return api.post('/api/v1/users', payload);
}

export async function updateUser(id, payload) {
    return api.put(`/api/v1/users/${id}`, payload);
}

export async function deleteUser(id) {
    return api.delete(`/api/v1/users/${id}`);
}
