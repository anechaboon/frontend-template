<template>
    <v-form ref="form" v-model="valid">
        <v-container>
            <v-row>
                <v-col cols="12">
                    <v-text-field
                        v-model="serviceLine.name"
                        label="Service Line Name"
                        :rules="[rules.required]"
                        required
                    ></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-textarea
                        v-model="serviceLine.description"
                        label="Description"
                        :rules="[rules.required]"
                        rows="3"
                        required
                    ></v-textarea>
                </v-col>
                <v-col cols="12" md="6">
                    <v-text-field
                        v-model="serviceLine.service_code"
                        label="Service Code"
                        :rules="[rules.required]"
                        required
                    ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
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
    serviceLine: {
        type: Object,
        required: true
    }
})


const rules = {
    required: value => !!value || 'This field is required'
}


const emit = defineEmits(['submit', 'cancel'])

const handleSubmit = () => {
    if (valid.value) {
        emit('submit', props.serviceLine)
    }
}

const handleCancel = () => {
    emit('cancel')
}
</script>
