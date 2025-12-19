<template>
    <v-container fluid>
        <v-card>
            <v-card-title class="d-flex justify-space-between align-center">
                <span class="text-h5 bg-color-">Vessel List</span>
                <v-btn color="primary" @click="addVessel">Add Vessel</v-btn>
            </v-card-title>

            <v-card-text>
                <v-text-field
                    v-model="search"
                    prepend-inner-icon="mdi-magnify"
                    label="Search vessels"
                    single-line
                    hide-details
                    class="mb-4"
                    clearable
                />

                <v-data-table
                    :headers="headers"
                    :items="vessels"
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
                        <v-btn icon="ri-pencil-line" size="small" variant="text" @click="editVessel(item)" />
                        <v-btn icon="ri-delete-bin-line" size="small" variant="text" color="error" @click="deleteVes(item)" />
                    </template>
                </v-data-table>
            </v-card-text>
        </v-card>
    </v-container>
    <v-dialog v-model="dialog" max-width="600" persistent>
        <v-card>
            <v-card-title class="d-flex justify-space-between align-center">
                <span>{{ editingVessel.id ? 'Edit' : 'Create' }} Vessel</span>
                <v-btn icon="ri-close-circle-line" variant="text" @click="dialog = false" />
            </v-card-title>
        
            <v-card-text>
                <VesselForm
                    v-if="editingVessel"
                    :vessel="editingVessel"
                    @submit="saveVessel"
                    @cancel="closeModal"
                />
            </v-card-text>
            
        </v-card>
    </v-dialog>

</template>

<script setup>
import { createVessel, deleteVessel, getVessel, getVessels, updateVessel } from '@/api/vessel.api';
import VesselForm from '@/components/vessel/VesselForm.vue';
import Swal from 'sweetalert2';
import { onMounted, ref } from 'vue';

const dialog = ref(false)
const editingVessel = ref(null)

const vessels = ref([])
const search = ref('')
const loading = ref(false)

const headers = [
    { title: 'Vessel Name', key: 'name', sortable: true },
    { title: 'IMO Number', key: 'imo_number', sortable: true },
    { title: 'Type', key: 'type', sortable: true },
    { title: 'Flag', key: 'flag', sortable: true },
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

const fetchVessels = async () => {
    loading.value = true
    try {
        const res = await getVessels()
        vessels.value = res.data.data
    } catch (error) {
        console.error('Error fetching vessels:', error)
    } finally {
        loading.value = false
    }
}

const addVessel = () => {
    loading.value = true
    editingVessel.value = {
        name: '',
        imo_number: '',
        type: '',
        flag: '',
        status: 'active'
    }
    dialog.value = true
    loading.value = false

}

const saveVessel = async (vessel) => {
    let res = {}
    if (!vessel.id){
        res = await createVessel(vessel)
    } else {
        res = await updateVessel(vessel.id, vessel)
    }

    if (res.status === 200 && res.data.status) {
        await fetchVessels()
    } 
    dialog.value = false
}

const editVessel = async (vessel) => {
    loading.value = true
    try {
        const res = await getVessel(vessel.id)
        editingVessel.value = res.data.data
        dialog.value = true
    } finally {
        loading.value = false
    }
}

const deleteVes = (vessel) => {
    Swal.fire({
        title: 'Are you sure?',
        text: `Do you want to delete vessel "${vessel.name}"?`,
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
                const res = await deleteVessel(vessel.id)
                if (res.status === 200 && res.data.status) {
                    await fetchVessels()
                    Swal.fire('Deleted!', 'The vessel has been deleted.', 'success')
                } else {
                    Swal.fire('Error!', 'Failed to delete the vessel.', 'error')
                }
            } catch (error) {
                Swal.fire('Error!', 'An error occurred while deleting the vessel.', 'error')
            }
        }
    })
}

const closeModal = () => {
    dialog.value = false
}

onMounted(() => {
    fetchVessels()
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
