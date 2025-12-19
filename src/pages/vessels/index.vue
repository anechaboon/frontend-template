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
                        <v-btn icon="ri-delete-bin-line" size="small" variant="text" color="error" @click="deleteVessel(item)" />
                    </template>
                </v-data-table>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script setup>
import { getVessels } from '@/api/vessel.api';
import { onMounted, ref } from 'vue';

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
    // Navigate to add vessel page or open dialog
    console.log('Add vessel')
}

const editVessel = (vessel) => {
    // Navigate to edit vessel page or open dialog
    console.log('Edit vessel:', vessel)
}

const deleteVessel = (vessel) => {
    // Show confirmation dialog and delete
    console.log('Delete vessel:', vessel)
}

onMounted(() => {
    fetchVessels()
})
</script>

<style scoped>
/* Add custom styles if needed */
</style>
