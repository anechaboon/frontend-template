<template>
    <v-form ref="form" v-model="valid">
        <v-container>
            <v-row>
                <v-col cols="12" md="5">
                    <v-card outlined class="pa-2 mb-4">
                        <v-row class="px-3">
                            <v-col cols="12" md="7" class="px-1">
                                <h3>Ticket</h3>
                                
                                <!-- Title -->
                                <v-text-field
                                    v-model="ticket.title"
                                    label="Title"
                                    :rules="[rules.required]"
                                    class="my-2"
                                    required
                                ></v-text-field>

                                <!-- Email -->
                                <v-text-field
                                    v-model="ticket.contact_email"
                                    label="Contact Email"
                                    :rules="[rules.required]"
                                    class="my-2"
                                    required
                                ></v-text-field>

                                <!-- CC-Email -->
                                <v-text-field
                                    v-model="ticket.cc_email"
                                    label="CC Email"
                                    class="my-2"
                                    required
                                ></v-text-field>

                                <v-textarea
                                    v-model="ticket.description"
                                    rows="3"
                                    label="Description"
                                ></v-textarea>
                                
                            </v-col>
                            <v-col cols="12" md="5" class="px-1">
                                <div style="height: 1.6rem;"></div>
                                <!-- Priority -->
                                <v-select
                                    v-model="ticket.priority"
                                    :items="globalPriorityOptions"
                                    label="Priority"
                                    :rules="[rules.required]"
                                    class="my-2"
                                    required
                                ></v-select>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
                <v-col cols="12" md="4">
                    <v-card outlined class="pa-2 mb-4" min-height="310">
                        <v-row class="px-3">
                            <v-col cols="12" md="12" class="px-1">
                                <h3>Organization</h3>
                                <!-- Organization -->
                                <v-select
                                    v-model="ticket.organization_id"
                                    :items="organizationOptions"
                                    label="Organization"
                                    class="my-2"
                                    required
                                ></v-select>

                                <!-- Vessel -->
                                <v-select
                                    v-model="ticket.vessel_id"
                                    :items="vesselOptions"
                                    label="Vessel"
                                    class="my-2"
                                    required
                                ></v-select>

                                <!-- Assigned To -->
                                <v-select
                                    v-model="ticket.assigned_to_user_id"
                                    :items="userOptions"
                                    label="Assigned To"
                                    class="my-2"
                                    required
                                ></v-select>
                            </v-col>
                            
                        </v-row>
                    </v-card>
                </v-col>
                <v-col cols="12" md="3">
                    <v-card outlined class="pa-2 mb-4" min-height="310">
                        <v-row class="px-3">
                            <v-col cols="12" md="12" class="px-1">
                                <h3>Category</h3>
                                <!-- Category -->
                                <v-select
                                    v-model="ticket.category_id"
                                    :items="categoryOptions"
                                    label="Category"
                                    class="my-2"
                                    required
                                ></v-select>

                                <!-- Status -->
                                <v-select
                                    v-model="ticket.status"
                                    :items="globalStatusOptions"
                                    label="Status"
                                    class="my-2"
                                    required
                                ></v-select>

                                <!-- Service Line -->
                                <v-select
                                    v-model="ticket.service_line_id"
                                    :items="serviceLineOptions"
                                    label="Service Line"
                                    class="my-2"
                                    required
                                ></v-select>
                            </v-col>
                            
                        </v-row>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>


    </v-form>
</template>

<script setup>
import { getCategories } from '@/api/category.api';
import { getOrganizations } from '@/api/organization.api.js';
import { getServiceLines } from '@/api/service-line.api.js';
import { getUsers } from '@/api/user.api.js';
import { getVessels } from '@/api/vessel.api.js';
import { GLOBAL_PRIORITIES, GLOBAL_STATUS } from '@/constants/global.js';
import { convertObjectToOptions, enumToOptions } from '@/utils/helper.js';
import { onMounted, ref } from 'vue';
const globalStatusOptions = enumToOptions(GLOBAL_STATUS)
const globalPriorityOptions = [{ title: 'Please Select', value: null }, ...enumToOptions(GLOBAL_PRIORITIES)]

const valid = ref(false)
const organizationOptions = ref([])
const vesselOptions = ref([])
const userOptions = ref([])
const categoryOptions = ref([])
const serviceLineOptions = ref([])

const fetchOrganizations = async () => {
    const { data } = await getOrganizations({ status: 'active' })
    if (data.status) {
        organizationOptions.value = convertObjectToOptions(
            data.data,
            'name'
        )
    } 
}

const fetchVessels = async () => {
    const { data } = await getVessels({ status: 'active' })
    if (data.status) {
        vesselOptions.value = convertObjectToOptions(
            data.data,
            'name'
        )
    } 
}

const fetchUsers = async () => {
    const { data } = await getUsers({ role: 'staff' })
    if (data.status) {
        let options = convertObjectToOptions(
            data.data,
            'full_name'
        )
        options.unshift({ title: 'Currently unassigned', value: null })
        userOptions.value = options
    } 
}

const fetchCategories = async () => {
    const { data } = await getCategories({ status: 'active' })
    if (data.status) {
        categoryOptions.value = convertObjectToOptions(
            data.data,
            'name'
        )
    } 
}

const fetchServiceLines = async () => {
    const { data } = await getServiceLines({ status: 'active' })
    if (data.status) {
        serviceLineOptions.value = convertObjectToOptions(
            data.data,
            'name'
        )
    } 
}

const props = defineProps({
    ticket: {
        type: Object,
        required: true
    }
})

const rules = {
    required: value => !!value || 'Required.'
}
    
const emit = defineEmits(['submit', 'cancel'])

onMounted(() => {
    fetchOrganizations()
    fetchVessels()
    fetchUsers()
    fetchCategories()
    fetchServiceLines()
})
</script>
