<template>
    <v-form ref="form" v-model="valid">
        <v-container>
            <v-row>
                <v-col cols="12">
                    <v-text-field
                        v-model="organization.name"
                        label="Organization Name*"
                        :rules="[rules.required]"
                        required
                    ></v-text-field>
                </v-col>
                
                <v-col cols="12" md="6">
                    <v-text-field
                        v-model="organization.email"
                        label="Email*"
                        :rules="[rules.required, rules.email]"
                        type="email"
                        required
                    ></v-text-field>
                </v-col>
                
                <v-col cols="12" md="6">
                    <v-text-field
                        v-model="organization.phone"
                        label="Phone"
                        :rules="[rules.phone]"
                    ></v-text-field>
                </v-col>
                
                <v-col cols="12">
                    <v-text-field
                        v-model="organization.address"
                        label="Address"
                    ></v-text-field>
                </v-col>
                
                <v-col cols="12" md="6">
                    <v-text-field
                        v-model="organization.city"
                        label="City"
                    ></v-text-field>
                </v-col>
                
                <v-col cols="12" md="6">
                    <v-text-field
                        v-model="organization.country"
                        label="Country"
                    ></v-text-field>
                </v-col>
                
                <v-col cols="12">
                    <v-textarea
                        v-model="organization.description"
                        label="Description"
                        rows="3"
                    ></v-textarea>
                </v-col>

                <v-col cols="12" md="6">
                    <v-select
                        v-model="organization.status"
                        :items="globalStatusOptions"
                        label="Status"
                        :rules="[rules.required]"
                        required
                    ></v-select>
                </v-col>
            </v-row>
        </v-container>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="handleSubmit" :disabled="!valid">
                Submit
            </v-btn>
            <v-btn color="grey" variant="text" @click="handleCancel">
                Cancel
            </v-btn>
        </v-card-actions>
    </v-form>
</template>

<script setup>
import { GLOBAL_STATUS } from '@/constants/global.js';
import { enumToOptions } from '@/utils/helper.js';
import { ref } from 'vue';

const globalStatusOptions = enumToOptions(GLOBAL_STATUS)

const valid = ref(false)
const props = defineProps({
    organization: {
        type: Object,
        required: true
    }
})

const rules = {
    required: value => !!value || 'Required.',
    email: value => {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return pattern.test(value) || 'Invalid email.'
    },
    phone: value => {
        if (!value) return true
        const pattern = /^[\d\s\-+()]+$/
        return pattern.test(value) || 'Invalid phone number.'
    }
}

const emit = defineEmits(['submit', 'cancel'])

const handleSubmit = () => {
    if (valid.value) {
        emit('submit', props.organization)
    }
}

const handleCancel = () => {
    emit('cancel')
}
</script>
