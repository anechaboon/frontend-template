<template>
    <v-container fluid>
        <v-card>
            <v-card-title class="d-flex justify-space-between align-center">
                <span class="text-h5 bg-color-">Category List</span>
                <v-btn color="primary" @click="addCategory">Add Category</v-btn>
            </v-card-title>

            <v-card-text>
                <v-text-field
                    v-model="search"
                    prepend-inner-icon="mdi-magnify"
                    label="Search categories"
                    single-line
                    hide-details
                    class="mb-4"
                    clearable
                />

                <v-data-table
                    :headers="headers"
                    :items="categories"
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
                        <v-btn icon="ri-pencil-line" size="small" variant="text" @click="editCategory(item)" />
                        <v-btn icon="ri-delete-bin-line" size="small" variant="text" color="error" @click="deleteCate(item)" />
                    </template>
                </v-data-table>
            </v-card-text>
        </v-card>
    </v-container>
    <v-dialog v-model="dialog" max-width="600" persistent>
        <v-card>
            <v-card-title class="d-flex justify-space-between align-center">
                <span>{{ editingCategory.id ? 'Edit' : 'Create' }} Category</span>
                <v-btn icon="ri-close-circle-line" variant="text" @click="dialog = false" />
            </v-card-title>
        
            <v-card-text>
                <CategoryForm
                    v-if="editingCategory"
                    :category="editingCategory"
                    @submit="saveCategory"
                    @cancel="closeModal"
                />
            </v-card-text>
            
        </v-card>
    </v-dialog>

</template>

<script setup>
import { createCategory, deleteCategory, getCategories, getCategory, updateCategory } from '@/api/category.api';
import swal from '@/utils/swal';
import { onMounted, ref } from 'vue';

const dialog = ref(false)
const editingCategory = ref(null)

const categories = ref([])
const search = ref('')
const loading = ref(false)

const headers = [
    { title: 'Category Name', key: 'name', sortable: true },
    { title: 'Description', key: 'description', sortable: true },
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

const fetchCategories = async () => {
    loading.value = true
    try {
        const res = await getCategories()
        categories.value = res.data.data
    } catch (error) {
        console.error('Error fetching categories:', error)
    } finally {
        loading.value = false
    }
}

const addCategory = () => {
    loading.value = true
    editingCategory.value = {
        name: '',
        description: '',
        service_code: '',
        status: 'active'
    }
    dialog.value = true
    loading.value = false

}

const saveCategory = async (category) => {
    let res = {}
    console.log('log:saveCategory:category', category);
    if (!category.id){
        res = await createCategory(category)
    } else {
        res = await updateCategory(category.id, category)
    }

    if (res.status === 200 && res.data.status) {
        await fetchCategories()
    } 
    dialog.value = false
}

const editCategory = async (category) => {
    loading.value = true
    try {
        const res = await getCategory(category.id)
        editingCategory.value = res.data.data
        dialog.value = true
    } finally {
        loading.value = false
    }
}

const deleteCate = (category) => {
    swal.fire({
        title: 'Are you sure?',
        text: `Do you want to delete Category "${category.name}"?`,
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
                const res = await deleteCategory(category.id)
                if (res.status === 200 && res.data.status) {
                    await fetchCategories()
                    swal.fire('Deleted!', 'The Category has been deleted.', 'success')
                } else {
                    swal.fire('Error!', 'Failed to delete the Category.', 'error')
                }
            } catch (error) {
                swal.fire('Error!', 'An error occurred while deleting the Category.', 'error')
            }
        }
    })
}

const closeModal = () => {
    dialog.value = false
}

onMounted(() => {
    fetchCategories()
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
