<template>
    <v-form ref="form" v-model="valid" @submit.prevent="handleSubmit">
        <v-card>
            <v-card-title>
                <span class="text-h5">{{ isEdit ? 'Edit Category' : 'Add Category' }}</span>
            </v-card-title>
            
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field
                                v-model="formData.name"
                                label="Category Name"
                                :rules="nameRules"
                                required
                                variant="outlined"
                            ></v-text-field>
                        </v-col>
                        
                        <v-col cols="12">
                            <v-textarea
                                v-model="formData.description"
                                label="Description"
                                rows="3"
                                variant="outlined"
                            ></v-textarea>
                        </v-col>
                        
                        <v-col cols="12">
                            <v-switch
                                v-model="formData.isActive"
                                label="Active"
                                color="primary"
                            ></v-switch>
                        </v-col>

                        <v-col cols="12">
                            <v-select
                                v-model="serviceLine.status"
                                :items="globalStatusOptions"
                                label="Status"
                                :rules="[rules.required]"
                                required
                            ></v-select>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
            
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="grey"
                    variant="text"
                    @click="handleCancel"
                >
                    Cancel
                </v-btn>
                <v-btn
                    color="primary"
                    variant="elevated"
                    type="submit"
                    :disabled="!valid"
                >
                    {{ isEdit ? 'Update' : 'Create' }}
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-form>
</template>

<script setup>
import { GLOBAL_STATUS } from '@/constants/global.js';
import { enumToOptions } from '@/utils/helper.js';
import { computed, ref, watch } from 'vue';

const globalStatusOptions = enumToOptions(GLOBAL_STATUS)

const props = defineProps({
    category: {
        type: Object,
        default: null
    }
})

const emit = defineEmits(['submit', 'cancel'])

const form = ref(null)
const valid = ref(false)

const formData = ref({
    name: '',
    description: '',
    isActive: true
})

const nameRules = [
    v => !!v || 'Category name is required',
    v => (v && v.length >= 3) || 'Name must be at least 3 characters'
]

const isEdit = computed(() => !!props.category)

watch(() => props.category, (newValue) => {
    if (newValue) {
        formData.value = { ...newValue }
    } else {
        resetForm()
    }
}, { immediate: true })

const handleSubmit = () => {
    if (valid.value) {
        emit('submit', formData.value)
    }
}

const handleCancel = () => {
    emit('cancel')
    resetForm()
}

const resetForm = () => {
    formData.value = {
        name: '',
        description: '',
        isActive: true
    }
    form.value?.reset()
}
</script>

<style scoped>
/* Add custom styles if needed */
</style>
