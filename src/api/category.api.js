import api from '@/services/axios';

export async function getCategories(params) {
    return api.get('/api/v1/categories', { params });
}

export async function getCategory(id) {
    return api.get(`/api/v1/categories/${id}`);
}

export async function createCategory(payload) {
    return api.post('/api/v1/categories', payload);
}

export async function updateCategory(id, payload) {
    return api.put(`/api/v1/categories/${id}`, payload);
}

export async function deleteCategory(id) {
    return api.delete(`/api/v1/categories/${id}`);
}
