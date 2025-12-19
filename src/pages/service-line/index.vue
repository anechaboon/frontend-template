<template>
    <v-container fluid>
        <v-card>
            <v-card-title class="d-flex justify-space-between align-center">
                <span class="text-h5 bg-color-">Service Line List</span>
                <v-btn color="primary" @click="addServiceLine">Add Service Line</v-btn>
            </v-card-title>

            <v-card-text>
                <v-text-field
                    v-model="search"
                    prepend-inner-icon="mdi-magnify"
                    label="Search service lines"
                    single-line
                    hide-details
                    class="mb-4"
                    clearable
                />

                <v-data-table
                    :headers="headers"
                    :items="serviceLines"
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
                        <v-btn icon="ri-pencil-line" size="small" variant="text" @click="editServiceLine(item)" />
                        <v-btn icon="ri-delete-bin-line" size="small" variant="text" color="error" @click="deleteSerLine(item)" />
                    </template>
                </v-data-table>
            </v-card-text>
        </v-card>
    </v-container>
    <v-dialog v-model="dialog" max-width="600" persistent>
        <v-card>
            <v-card-title class="d-flex justify-space-between align-center">
                <span>{{ editingServiceLine.id ? 'Edit' : 'Create' }} Service Line</span>
                <v-btn icon="ri-close-circle-line" variant="text" @click="dialog = false" />
            </v-card-title>
        
            <v-card-text>
                <ServiceLineForm
                    v-if="editingServiceLine"
                    :serviceLine="editingServiceLine"
                    @submit="saveServiceLine"
                    @cancel="closeModal"
                />
            </v-card-text>
            
        </v-card>
    </v-dialog>

</template>

<script setup>
import { createServiceLine, deleteServiceLine, getServiceLine, getServiceLines, updateServiceLine } from '@/api/service-line.api';
import Swal from 'sweetalert2';
import { onMounted, ref } from 'vue';

const dialog = ref(false)
const editingServiceLine = ref(null)

const serviceLines = ref([])
const search = ref('')
const loading = ref(false)

const headers = [
    { title: 'Service Line Name', key: 'name', sortable: true },
    { title: 'Description', key: 'description', sortable: true },
    { title: 'Service Code', key: 'service_code', sortable: true },
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

const fetchServiceLines = async () => {
    loading.value = true
    try {
        const res = await getServiceLines()
        serviceLines.value = res.data.data
    } catch (error) {
        console.error('Error fetching service lines:', error)
    } finally {
        loading.value = false
    }
}

const addServiceLine = () => {
    loading.value = true
    editingServiceLine.value = {
        name: '',
        description: '',
        service_code: '',
        status: 'active'
    }
    dialog.value = true
    loading.value = false

}

const saveServiceLine = async (serviceLine) => {
    let res = {}
    console.log('log:saveServiceLine:serviceLine', serviceLine);
    if (!serviceLine.id){
        res = await createServiceLine(serviceLine)
    } else {
        res = await updateServiceLine(serviceLine.id, serviceLine)
    }

    if (res.status === 200 && res.data.status) {
        await fetchServiceLines()
    } 
    dialog.value = false
}

const editServiceLine = async (serviceLine) => {
    loading.value = true
    try {
        const res = await getServiceLine(serviceLine.id)
        editingServiceLine.value = res.data.data
        dialog.value = true
    } finally {
        loading.value = false
    }
}

const deleteSerLine = (serviceLine) => {
    Swal.fire({
        title: 'Are you sure?',
        text: `Do you want to delete service line "${serviceLine.name}"?`,
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
                const res = await deleteServiceLine(serviceLine.id)
                if (res.status === 200 && res.data.status) {
                    await fetchServiceLines()
                    Swal.fire('Deleted!', 'The service line has been deleted.', 'success')
                } else {
                    Swal.fire('Error!', 'Failed to delete the service line.', 'error')
                }
            } catch (error) {
                Swal.fire('Error!', 'An error occurred while deleting the service line.', 'error')
            }
        }
    })
}

const closeModal = () => {
    dialog.value = false
}

onMounted(() => {
    fetchServiceLines()
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
