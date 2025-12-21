<template>
    <v-container fluid>
        <v-card>
            <v-card-text>
                <v-text-field
                    v-model="search"
                    prepend-inner-icon="mdi-magnify"
                    label="Search tickets"
                    single-line
                    hide-details
                    class="mb-4"
                    clearable
                />

                <v-data-table
                    :headers="headers"
                    :items="tickets"
                    :search="search"
                    :loading="loading"
                    class="elevation-1"
                >
                    <template v-slot:item.status="{ item }">
                        <v-chip :color="getStatusColor(item.status)" size="small">
                            {{ item.status }}
                        </v-chip>
                    </template>

                    <template v-slot:item.actions="{ item }">
                        <v-btn icon="ri-pencil-line" size="small" variant="text" @click="editTicket(item)" />
                        <v-btn icon="ri-delete-bin-line" size="small" variant="text" color="error" @click="deleteVes(item)" />
                    </template>
                </v-data-table>
            </v-card-text>
        </v-card>
    </v-container>
    <v-dialog v-model="dialog" max-width="600" persistent>
        <v-card>
            <v-card-title class="d-flex justify-space-between align-center">
                <span>{{ editingTicket.id ? 'Edit' : 'Create' }} Ticket</span>
                <v-btn icon="ri-close-circle-line" variant="text" @click="dialog = false" />
            </v-card-title>
        
            <v-card-text>
                <TicketForm
                    v-if="editingTicket"
                    :ticket="editingTicket"
                    @submit="saveTicket"
                    @cancel="closeModal"
                />
            </v-card-text>
            
        </v-card>
    </v-dialog>

</template>

<script setup>
import { deleteTicket, getTickets } from '@/api/ticket.api';
import TicketForm from '@/components/ticket/TicketForm.vue';
import Swal from 'sweetalert2';
import { onMounted, ref } from 'vue';

const dialog = ref(false)
const editingTicket = ref(null)

const tickets = ref([])
const search = ref('')
const loading = ref(false)

const headers = [
    { title: 'Title', key: 'title', sortable: true },
    { title: 'Description', key: 'description', sortable: true },
    { title: 'Contact Email', key: 'contact_email', sortable: true },
    { title: 'Priority', key: 'priority', sortable: true },
    { title: 'Organization', key: 'organization.name', sortable: true },
    { title: 'Vessel', key: 'vessel.name', sortable: true },
    { title: 'Service Line', key: 'service_line.name', sortable: true },
    { title: 'Status', key: 'status', sortable: true },
    { title: 'Actions', key: 'actions', sortable: false, align: 'center' }
]

const getStatusColor = (status) => {
    const colors = {
        'active': 'success',
        'inactive': 'error',
        'maintenance': 'warning',
        'in transit': 'info'
    }
    return colors[status] || 'default'
}

const fetchTickets = async () => {
    loading.value = true
    try {
        const res = await getTickets()
        tickets.value = res.data.data
    } catch (error) {
        console.error('Error fetching tickets:', error)
    } finally {
        loading.value = false
    }
}

const addTicket = () => {
    loading.value = true
    editingTicket.value = {
        title: '',
        description: '',
        contact_email: '',
        priority: null,
        organization_id: null,
        vessel_id: null,
        service_line_id: null,
        status: 'open'
    }
    dialog.value = true
    loading.value = false

}

const saveTicket = async (ticket) => {
    let res = {}
    if (!ticket.id){
        res = await createTicket(ticket)
    } else {
        res = await updateTicket(ticket.id, ticket)
    }

    if (res.status === 200 && res.data.status) {
        await fetchTickets()
    } 
    dialog.value = false
}

const editTicket = async (ticket) => {
    // go to ticket detail page
    window.location.href = `/ticket/${ticket.id}`
}

const deleteVes = (ticket) => {
    Swal.fire({
        title: 'Are you sure?',
        text: `Do you want to delete ticket "${ticket.title}"?`,
        icon: 'warning',
        customClass: {
            confirmButton: 'my-custom-confirm-btn',
            cancelButton: 'my-custom-cancel-btn'
        },
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel'
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                const res = await deleteTicket(ticket.id)
                if (res.status === 200 && res.data.status) {
                    await fetchTickets()
                    Swal.fire('Deleted!', 'The ticket has been deleted.', 'success')
                } else {
                    Swal.fire('Error!', 'Failed to delete the ticket.', 'error')
                }
            } catch (error) {
                Swal.fire('Error!', 'An error occurred while deleting the ticket.', 'error')
            }
        }
    })
}

const closeModal = () => {
    dialog.value = false
}

onMounted(() => {
    fetchTickets()
})
</script>
<style>
    .my-custom-confirm-btn {
        color: #ffffff !important;
    }
    .my-custom-cancel-btn {
        color: #ffffff !important;
    }
</style>
