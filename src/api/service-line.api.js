import api from '@/services/axios';

export async function getServiceLines(params) {
    return api.get('/api/v1/service-lines', { params });
}

export async function getServiceLine(id) {
    return api.get(`/api/v1/service-lines/${id}`);
}

export async function createServiceLine(payload) {
    return api.post('/api/v1/service-lines', payload);
}

export async function updateServiceLine(id, payload) {
    return api.put(`/api/v1/service-lines/${id}`, payload);
}

export async function deleteServiceLine(id) {
    return api.delete(`/api/v1/service-lines/${id}`);
}
