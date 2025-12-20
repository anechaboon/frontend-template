import api from '@/services/axios';

export async function getTickets(params) {
    return api.get('/api/v1/tickets', { params });
}

export async function getTicket(id) {
    return api.get(`/api/v1/tickets/${id}`);
}

export async function createTicket(payload) {
    return api.post('/api/v1/tickets', payload);
}

export async function updateTicket(id, payload) {
    return api.put(`/api/v1/tickets/${id}`, payload);
}

export async function deleteTicket(id) {
    return api.delete(`/api/v1/tickets/${id}`);
}
