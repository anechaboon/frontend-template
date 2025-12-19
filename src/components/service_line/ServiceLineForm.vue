<template>
    <v-card>
        <v-card-title>
            <span class="text-h5">Service Line Form</span>
        </v-card-title>
        <v-card-text>
            <v-form ref="form" v-model="valid">
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field
                                v-model="formData.name"
                                label="Service Line Name"
                                :rules="[rules.required]"
                                required
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-textarea
                                v-model="formData.description"
                                label="Description"
                                :rules="[rules.required]"
                                rows="3"
                                required
                            ></v-textarea>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field
                                v-model="formData.code"
                                label="Service Code"
                                :rules="[rules.required]"
                                required
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-select
                                v-model="formData.status"
                                :items="statusOptions"
                                label="Status"
                                :rules="[rules.required]"
                                required
                            ></v-select>
                        </v-col>
                    </v-row>
                </v-container>
            </v-form>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="grey" variant="text" @click="handleCancel">
                Cancel
            </v-btn>
            <v-btn color="primary" variant="elevated" :disabled="!valid" @click="handleSubmit">
                Submit
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script setup>
import { reactive, ref } from 'vue'

const emit = defineEmits(['submit', 'cancel'])

const props = defineProps({
    initialData: {
        type: Object,
        default: () => ({})
    }
})

const valid = ref(false)
const form = ref(null)

const formData = reactive({
    name: props.initialData.name || '',
    description: props.initialData.description || '',
    code: props.initialData.code || '',
    status: props.initialData.status || 'active'
})

const statusOptions = ['active', 'inactive', 'pending']

const rules = {
    required: value => !!value || 'This field is required'
}

const handleSubmit = async () => {
    const { valid } = await form.value.validate()
    if (valid) {
        emit('submit', { ...formData })
    }
}

const handleCancel = () => {
    emit('cancel')
}
</script>
