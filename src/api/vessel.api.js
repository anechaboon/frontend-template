import api from '@/services/axios';

export async function getVessels(params) {
    return api.get('/api/v1/vessels', { params });
}

export async function getVessel(id) {
    return api.get(`/api/v1/vessels/${id}`);
}

export async function createVessel(payload) {
    return api.post('/api/v1/vessels', payload);
}

export async function updateVessel(id, payload) {
    return api.put(`/api/v1/vessels/${id}`, payload);
}

export async function deleteVessel(id) {
    return api.delete(`/api/v1/vessels/${id}`);
}
