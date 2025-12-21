<template>
    <v-form ref="form" v-model="valid">
        <v-container>
            <v-row>
                <v-col cols="12" md="5">
                    <v-card outlined class="pa-2 mb-4 pb-5">
                        <v-row class="px-3 py-1 mt-0">
                            <v-col cols="12" md="7" class="px-1 py-1">
                                <h3>Ticket</h3>
                            </v-col>
                        </v-row>
                        <!-- Ticket && Priority -->
                        <v-row class="px-3 py-1 mt-0">
                            <v-col cols="12" md="7" class="px-1">
                                <!-- Title -->
                                <v-text-field
                                    v-model="ticket.title"
                                    label="Title*"
                                    :rules="[rules.required]"
                                    required
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="5" class="px-1">
                                <!-- Priority -->
                                <v-select
                                    v-model="ticket.priority"
                                    :items="globalPriorityOptions"
                                    label="Priority*"
                                    :rules="[rules.required]"
                                    required
                                ></v-select>
                            </v-col>
                        </v-row>
                        <!-- Email -->
                        <v-row class="px-3 py-1 mt-0">
                            <v-col cols="12" md="7" class="px-1">
                                <!-- Email -->
                                <v-text-field
                                    v-model="ticket.contact_email"
                                    label="Contact Email*"
                                    type="email"
                                    autocomplete="email"
                                    @blur="handleValidEmailFormat('contact_email')"
                                    :rules="[rules.required]"
                                />
                            </v-col>
                        </v-row>
                        <!-- CC-Emails -->
                        <template v-for="(cc_email, index) in ticket.cc_emails" :key="index">
                            <v-row class="py-1 mt-0" >
                                <v-col cols="10" md="7" class="px-1">
                                    <!-- CC-Emails -->
                                    <v-text-field
                                        v-model="ticket.cc_emails[index]"
                                        :label="`CC Email ${index + 1}`"
                                        type="email"
                                        autocomplete="new-email"
                                        @blur="handleValidEmailFormat('cc_emails', index)"
                                        class="ml-3"
                                    />
                                </v-col>

                                <v-col cols="2" md="5" class="px-1">
                                    <!-- btn add more cc email -->
                                    <v-btn
                                        v-if="index === 0"
                                        icon="ri-add-line"
                                        size="small"
                                        variant="text"
                                        @click="ticket.cc_emails.push('')"
                                    />
                                    <v-btn
                                        v-if="index > 0"
                                        icon="ri-subtract-line"
                                        size="small"
                                        variant="text"
                                        color="error"
                                        @click="ticket.cc_emails.splice(index, 1)"
                                    />

                                </v-col>
                            </v-row>
                        </template>
                        <!-- Description -->
                        <v-row class="px-3 py-1 mt-0">
                            <v-col cols="12" md="7" class="px-1">
                                <v-textarea
                                    v-model="ticket.description"
                                    rows="3"
                                    label="Description"
                                ></v-textarea>
                                
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
                <v-col cols="12" md="4">
                    <v-card outlined class="pa-2 mb-4 pb-5" min-height="377">
                        <v-row class="px-3 py-1 mt-0">
                            <v-col cols="12" md="7" class="px-1 py-1">
                                <h3>Organization</h3>
                            </v-col>
                        </v-row>
                        <!-- Organization -->
                        <v-row class="px-3 py-1 mt-0">
                            <v-col cols="12" md="12" class="px-1">
                                <!-- Organization -->
                                <v-select
                                    v-model="ticket.organization_id"
                                    :items="organizationOptions"
                                    label="Organization"
                                    required
                                ></v-select>
                            </v-col>
                        </v-row>

                        <!-- Vessel -->
                        <v-row class="px-3 py-1 mt-0">
                            <v-col cols="12" md="12" class="px-1">
                                <!-- Vessel -->
                                <v-select
                                    v-model="ticket.vessel_id"
                                    :items="vesselOptions"
                                    label="Vessel*"
                                    :rules="[rules.required]"
                                    required
                                ></v-select>
                            </v-col>
                        </v-row>

                        <!-- Assigned To -->
                        <v-row class="px-3 py-1 mt-0">
                            <v-col cols="12" md="12" class="px-1">
                                <v-select
                                    v-model="ticket.assigned_to_user_id"
                                    :items="userOptions"
                                    label="Assigned To"
                                    required
                                ></v-select>
                                
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
                <v-col cols="12" md="3">
                    <v-card outlined class="pa-2 mb-4 pb-5" min-height="377">
                        <v-row class="px-3 py-1 mt-0">
                            <v-col cols="12" md="7" class="px-1 py-1">
                                <h3>Category</h3>
                            </v-col>
                        </v-row>
                        <!-- Category -->
                        <v-row class="px-3 py-1 mt-0">
                            <v-col cols="12" md="12" class="px-1">
                                <!-- Category -->
                                <v-select
                                    v-model="ticket.category_id"
                                    :items="categoryOptions"
                                    label="Category*"
                                    :rules="[rules.required]"
                                    required
                                ></v-select>
                            </v-col>
                        </v-row>
                        <!-- Status -->
                        <v-row class="px-3 py-1 mt-0">
                            <v-col cols="12" md="12" class="px-1">
                                <!-- Status -->
                                <v-select
                                    v-model="ticket.status"
                                    :items="ticketStatusOptions"
                                    label="Status*"
                                    :rules="[rules.required]"
                                    required
                                ></v-select>
                            </v-col>
                        </v-row>
                        <!-- Service Line -->
                        <v-row class="px-3 py-1 mt-0">
                            <v-col cols="12" md="12" class="px-1">
                                <v-select
                                    v-model="ticket.service_line_id"
                                    :items="serviceLineOptions"
                                    label="Service Line"
                                    required
                                ></v-select>
                                
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
            </v-row>
            <v-row class="mt-0">
                <v-col cols="12" class="px-3">
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click="handleSubmit" :disabled="!valid">
                            Submit
                        </v-btn>
                        <v-btn color="grey" variant="text"  @click="handleReset">
                            Reset
                        </v-btn>
                    </v-card-actions>
                </v-col>
            </v-row>
        </v-container>


    </v-form>
</template>

<script setup>
import { getCategories } from '@/api/category.api';
import { getOrganizations } from '@/api/organization.api.js';
import { getServiceLines } from '@/api/service-line.api.js';
import { createTicket } from '@/api/ticket.api';
import { getUsers } from '@/api/user.api.js';
import { getVessels } from '@/api/vessel.api.js';
import { GLOBAL_PRIORITIES, TICKET_STATUS } from '@/constants/global.js';
import { convertObjectToOptions, enumToOptions, validateEmail } from '@/utils/helper.js';
import swal from '@/utils/swal';
import { onMounted, ref } from 'vue';
const ticketStatusOptions = enumToOptions(TICKET_STATUS)
const globalPriorityOptions = [{ title: 'Please Select', value: null }, ...enumToOptions(GLOBAL_PRIORITIES)]
const ticket = ref({
    title: '',
    description: '',
    contact_email: '',
    cc_emails: [''],
    priority: null,
    category_id: null,
    assigned_to_user_id: null,
    organization_id: null,
    vessel_id: null,
    service_line_id: null,
    status: 'open'
})

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

const handleValidEmailFormat = (field, index = null) => {
    let emailValue = '';

    switch (field) {
        case 'contact_email':
            emailValue = ticket.value.contact_email;
            break;
        case 'cc_emails':
            if (index !== null) {
                emailValue = ticket.value.cc_emails[index];
            }
            break;
        default:
            return;
    }

    if (!validateEmail(emailValue)) {
        if (field === 'contact_email') {
            ticket.value.contact_email = '';
        }
        if (field === 'cc_emails' && index !== null) {
            ticket.value.cc_emails[index] = '';
        }
        swal.fire({
            icon: 'error',
            title: 'Invalid Email',
            text: 'Please enter a valid email address.',
            confirmButtonText: 'OK',
        });
    }
};

const handleSubmit = async () => {
    if (valid.value) {
        const res = await createTicket(ticket.value)
        if (res.data.status) {
            swal.fire({
                title: 'Ticket created successfully!',
                icon: 'success',
                timer: 2000,
                showConfirmButton: false
            }).then(() => {
                window.location.href = `/ticket/${res.data.data.id}`
            })
        } else {
            swal.fire({
                title: 'Error creating ticket',
                text: res.data.message || 'Please try again later.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    }
}

const handleReset = () => {
    ticket.value = {
        title: '',
        description: '',
        contact_email: '',
        cc_emails: [''],
        priority: null,
        category_id: null,
        assigned_to_user_id: null,
        organization_id: null,
        vessel_id: null,
        service_line_id: null,
        status: 'open'
    }
    const form = ref('form')
    form.value.resetValidation()
}


const rules = {
    required: value => !!value || 'Required.'
}

onMounted(() => {
    fetchOrganizations()
    fetchVessels()
    fetchUsers()
    fetchCategories()
    fetchServiceLines()
})
</script>
