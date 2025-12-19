<template>
    <v-form ref="form" v-model="valid">
        <v-container>
            <v-row>
                <v-col cols="12" md="6">
                    <v-text-field
                        v-model="vessel.name"
                        label="Vessel Name"
                        :rules="[rules.required]"
                        required
                    ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                    <v-text-field
                        v-model="vessel.imo_number"
                        label="IMO Number"
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
                        label="Vessel Type"
                        :rules="[rules.required]"
                    ></v-select>
                </v-col>
                <v-col cols="12" md="6">
                    <v-text-field
                        v-model="vessel.flag"
                        label="Flag"
                    ></v-text-field>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="12">
                    <v-btn color="primary" @click="submit" :disabled="!valid">
                        Submit
                    </v-btn>
                    <v-btn class="ml-2" @click="reset">
                        Reset
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-form>
</template>

<script setup>
import { ref } from 'vue'

const form = ref(null)
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

const emit = defineEmits(['submit'])

const submit = () => {
    if (valid.value) {
        emit('submit', props.vessel)
    }
}

const reset = () => {
    form.value.reset()
}
</script>

<style scoped>
</style>
