<template>
    <v-container fluid>
        <v-card>
            <v-card-title class="d-flex justify-space-between align-center">
                <span class="text-h5 bg-color-">Organization List</span>
                <v-btn color="primary" @click="addOrganization">Add Organization</v-btn>
            </v-card-title>

            <v-card-text>
                <v-text-field
                    v-model="search"
                    prepend-inner-icon="mdi-magnify"
                    label="Search organizations"
                    single-line
                    hide-details
                    class="mb-4"
                    clearable
                />

                <v-data-table
                    :headers="headers"
                    :items="organizations"
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
                        <v-btn icon="ri-pencil-line" size="small" variant="text" @click="editOrganization(item)" />
                        <v-btn icon="ri-delete-bin-line" size="small" variant="text" color="error" @click="deleteVes(item)" />
                    </template>
                </v-data-table>
            </v-card-text>
        </v-card>
    </v-container>
    <v-dialog v-model="dialog" max-width="600" persistent>
        <v-card>
            <v-card-title class="d-flex justify-space-between align-center">
                <span>{{ editingOrganization.id ? 'Edit' : 'Create' }} Organization</span>
                <v-btn icon="ri-close-circle-line" variant="text" @click="dialog = false" />
            </v-card-title>
        
            <v-card-text>
                <OrganizationForm
                    v-if="editingOrganization"
                    :organization="editingOrganization"
                    @submit="saveOrganization"
                />
            </v-card-text>
            
        </v-card>
    </v-dialog>

</template>

<script setup>
import { createOrganization, deleteOrganization, getOrganization, getOrganizations, updateOrganization } from '@/api/organization.api';
import OrganizationForm from '@/components/organization/OrganizationForm.vue';
import Swal from 'sweetalert2';
import { onMounted, ref } from 'vue';

const dialog = ref(false)
const editingOrganization = ref(null)

const organizations = ref([])
const search = ref('')
const loading = ref(false)

const headers = [
    { title: 'Organization Name', key: 'name', sortable: true },
    { title: 'Email', key: 'email', sortable: true },
    { title: 'Phone', key: 'phone', sortable: true },
    { title: 'Address', key: 'address', sortable: true },
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

const fetchOrganizations = async () => {
    loading.value = true
    try {
        const res = await getOrganizations()
        organizations.value = res.data.data
    } catch (error) {
        console.error('Error fetching organizations:', error)
    } finally {
        loading.value = false
    }
}

const addOrganization = () => {
    loading.value = true
    editingOrganization.value = {
        name: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        country: '',
        description: '',
        status: 'active'
    }
    dialog.value = true
    loading.value = false

}

const saveOrganization = async (organization) => {
    console.log('log:tag:organization', organization);
    let res = {}
    if (!organization.id){
        res = await createOrganization(organization)
    } else {
        res = await updateOrganization(organization.id, organization)
    }

    if (res.status === 200 && res.data.status) {
        await fetchOrganizations()
    } 
    dialog.value = false
}

const editOrganization = async (organization) => {
    loading.value = true
    try {
        const res = await getOrganization(organization.id)
        editingOrganization.value = res.data.data
        console.log('log:tag:res.data.data', res.data.data);
        dialog.value = true
    } finally {
        loading.value = false
    }
}

const deleteVes = (organization) => {
    Swal.fire({
        title: 'Are you sure?',
        text: `Do you want to delete organization "${organization.name}"?`,
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
                const res = await deleteOrganization(organization.id)
                if (res.status === 200 && res.data.status) {
                    await fetchOrganizations()
                    Swal.fire('Deleted!', 'The organization has been deleted.', 'success')
                } else {
                    Swal.fire('Error!', 'Failed to delete the organization.', 'error')
                }
            } catch (error) {
                Swal.fire('Error!', 'An error occurred while deleting the organization.', 'error')
            }
        }
    })
}

onMounted(() => {
    fetchOrganizations()
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
