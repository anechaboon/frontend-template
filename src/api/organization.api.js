import api from '@/services/axios';

export async function getOrganizations(params) {
    return api.get('/api/v1/organizations', { params });
}

export async function getOrganization(id) {
    return api.get(`/api/v1/organizations/${id}`);
}

export async function createOrganization(payload) {
    return api.post('/api/v1/organizations', payload);
}

export async function updateOrganization(id, payload) {
    return api.put(`/api/v1/organizations/${id}`, payload);
}

export async function deleteOrganization(id) {
    return api.delete(`/api/v1/organizations/${id}`);
}
