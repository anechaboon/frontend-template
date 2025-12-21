<template>
    <v-form ref="form" v-model="valid">
        <v-container>
            <v-row>
                <v-col cols="12" md="6">
                    <v-text-field
                        v-model="vessel.name"
                        label="Vessel Name*"
                        :rules="[rules.required]"
                        required
                    ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                    <v-text-field
                        v-model="vessel.imo_number"
                        label="IMO Number*"
                        :rules="[rules.required]"
                        required
                    ></v-text-field>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="12" md="6">
                    <v-select
                        v-model="vessel.type"
                        :items="vesselTypes"
                        label="Vessel Type*"
                        :rules="[rules.required]"
                    ></v-select>
                </v-col>
                <v-col cols="12" md="6">
                    <v-select
                        v-model="vessel.status"
                        :items="globalStatusOptions"
                        label="Status*"
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
import swal from '@/utils/swal';
import { ref } from 'vue';

const globalStatusOptions = enumToOptions(GLOBAL_STATUS)

const valid = ref(false)
const props = defineProps({
    vessel: {
        type: Object,
        required: true
    }
})

const vesselTypes = [
    'Container Ship',
    'Bulk Carrier',
    'Tanker',
    'Cargo Ship',
    'Passenger Ship',
    'Fishing Vessel',
    'Other'
]

const rules = {
    required: value => !!value || 'Required.'
}
    
const emit = defineEmits(['submit', 'cancel'])

const handleSubmit = () => {

    // valid imo_number can use number only
    if (!/^\d*$/.test(props.vessel.imo_number)) {
        swal.fire({
            icon: 'error',
            title: 'Invalid IMO Number',
            text: 'IMO Number must contain numbers only.',
            customClass: {
                container: 'swal2-vuetify',
                confirmButton: 'my-custom-confirm-btn',
                cancelButton: 'my-custom-cancel-btn'
            }
        });
        return;
    }

    if (valid.value) {
        emit('submit', props.vessel)
    }
}

const handleCancel = () => {
    emit('cancel')
}
</script>
