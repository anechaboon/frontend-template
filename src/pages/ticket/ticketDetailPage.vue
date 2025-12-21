<template>
    <v-form ref="form" v-model="valid">
        <v-container>
            <v-row>
                <v-col cols="12" md="6">
                    <v-card class="pa-4 ticket-card" rounded="lg" elevation="2">
                        <v-row>
                            <!-- LEFT -->
                            <v-col cols="12" md="9">
                                <div class="d-flex align-center justify-space-between mb-2">
                                    <div>
                                        <h3 class="">Ticket</h3>
                                        <div class="d-flex text-body-2 text-grey">
                                            <div id="ticket-title">
                                                {{ ticket.title }}
                                            </div>
                                            <v-btn
                                                size="x-small"
                                                icon
                                                variant="text"
                                                class="ml-1 pb-1"
                                            >
                                                <v-icon size="14" @click="editTicketTitle">      
                                                    {{ isEditTitle ? 'ri-check-line' : 'ri-pencil-line' }}
                                                </v-icon>

                                            </v-btn>
                                        </div>
                                    </div>

                                    <v-btn icon variant="text">
                                        <v-icon class="text-h5">ri-more-2-line</v-icon>
                                    </v-btn>
                                </div>


                                <v-row class="text-body-2 pt-3">
                                    <v-col cols="3" class="py-3">
                                        <strong>Ticket Id:</strong>
                                    </v-col>
                                    <v-col cols="9" class="py-3">
                                        <span class="text-warning ml-1">#{{ ticket.id }}</span>
                                    </v-col>

                                </v-row>

                                <v-row class="text-body-2 mt-0">
                                    <v-col cols="3" class="py-3">
                                        <strong>Created:</strong>
                                    </v-col>
                                    <v-col cols="9" class="py-3">
                                        <span class="ml-1">{{ moment(ticket.created_at).format('Y-m-d H:m') }}</span>
                                    </v-col>
                                </v-row>

                                <v-row class="text-body-2  mt-0">
                                    <v-col cols="3" class="py-3">
                                        <strong>Contact:</strong>
                                    </v-col>
                                    <v-col cols="9" class="py-3">
                                        <div class="d-flex ml-1 text-body-2 text-grey">
                                            <div id="contact-email">
                                                {{ ticket.contact_email }}
                                            </div>
                                            <v-btn
                                                size="x-small"
                                                icon
                                                variant="text"
                                                class="ml-1"
                                            >
                                                <v-icon size="14" @click="editContactEmail">
                                                    {{ isEditContactEmail ? 'ri-check-line' : 'ri-pencil-line' }}
                                                </v-icon>
                                            </v-btn>
                                        </div>
                                    </v-col>
                                </v-row>

                                <v-row class="text-body-2 mt-0" align="start">
                                    <!-- Label -->
                                    <v-col cols="12" md="3" class="py-3">
                                        <strong>Cc Email:</strong>
                                    </v-col>

                                    <v-col cols="12" md="9" class="py-3">
                                        <div id="TicketCCEmails" class="d-flex flex-column">
                                            <template v-for="(email, index) in ticket.cc_emails" :key="index">
                                                <div class="d-flex align-center mb-1">
                                                <v-chip
                                                    size="small"
                                                    color="primary"
                                                    variant="tonal"
                                                >
                                                    {{ email.cc_email }}
                                                </v-chip>
                                                <v-btn
                                                    size="small"
                                                    variant="text"
                                                    class="my-0 mx-0 px-1 text-none"
                                                    @click="ticket.cc_emails.splice(index, 1)"
                                                >
                                                    (remove)
                                                </v-btn>
                                                <v-btn
                                                    v-if="index === 0"
                                                    size="x-small"
                                                    icon
                                                    variant="text"
                                                    class="ml-1"
                                                >
                                                    <v-icon size="14" @click="handleAddCCEmail">ri-add-circle-line</v-icon>
                                                </v-btn>
                                                </div>
                                            </template>
                                        </div>
                                    </v-col>
                                </v-row>


                                <p class="text-body-2 text-grey mt-3">
                                {{ ticket.description }}
                                </p>
                            </v-col>

                            <!-- RIGHT -->
                            <v-col cols="12" md="3" class="d-flex flex-column align-center right-panel">

                                <div class="mb-6 d-flex align-center w-100">
                                    <v-spacer />
                                    <v-icon size="24">ri-coupon-2-line</v-icon>
                                </div>

                                <div class="text-center mb-6 align-center">
                                    <div class="d-flex align-center">
                                        <div class="text-error text-h5 font-weight-bold float-start">
                                            {{ ticket.priority }}
                                        </div>
                                    </div>
                                    <div class="d-flex">
                                        <div class="text-caption text-grey">
                                            ticket priority
                                        </div>
                                    </div>
                                </div>

                                <div class="text-center mb-6 mt-auto">
                                    <div class="d-flex align-center">
                                        <div class="font-weight-bold float-start">
                                            11h 30min
                                        </div>
                                    </div>
                                    <div class="d-flex">
                                        <div class="text-caption text-grey">
                                            time remaining
                                        </div>
                                    </div>
                                </div>
                            </v-col>

                        </v-row>
                    </v-card>
                </v-col>
                <v-col cols="12" md="3">
                    <v-card outlined class="pa-2 mb-4 pb-5" min-height="335">
                        <v-row class="px-3 py-1 mt-0 align-center mb-1">
                            <v-col cols="12" md="7" class="px-1 py-1">
                                <h3>Organization</h3>
                            </v-col>
                            <v-col cols="12" md="5" class="px-1 py-1 text-right">
                                <v-icon size="24">ri-anchor-line</v-icon>
                            </v-col>
                        </v-row>
                        <!-- Organization -->
                        <v-row class="px-3 py-1 mt-0">
                            <v-col cols="12" md="12" class="px-1 py-2">
                                <!-- Organization -->
                                <v-label class="mb-1">Organization</v-label>
                                <v-select
                                    v-model="ticket.organization.name"
                                    :items="organizationOptions"
                                ></v-select>
                            </v-col>
                        </v-row>
                        <!-- Vessel -->
                        <v-row class="px-3 py-1 mt-0">
                            <v-col cols="12" md="12" class="px-1 py-2">
                                <!-- Vessel -->
                                <v-label class="mb-1">Vessel</v-label>
                                <v-select
                                    v-model="ticket.vessel.name"
                                    :items="vesselOptions"
                                ></v-select>
                            </v-col>
                        </v-row>
                        <!-- Assigned To -->
                        <v-row class="px-3 py-1 mt-0">
                            <v-col cols="12" md="12" class="px-1 py-2">
                                <v-label class="mb-1">Assigned To</v-label>
                                <v-select
                                    v-model="ticket.assigned_to_user_name"
                                    :items="userOptions"
                                ></v-select>
                                
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
                <v-col cols="12" md="3">
                    <v-card outlined class="pa-2 mb-4 pb-5" min-height="335">
                        <v-row class="px-3 py-1 mt-0 align-center mb-1">
                            <v-col cols="12" md="7" class="px-1 py-1">
                                <h3>Category</h3>
                            </v-col>
                            <v-col cols="12" md="5" class="px-1 py-1 text-right">
                                <v-icon size="24">ri-git-repository-private-fill</v-icon>
                            </v-col>
                        </v-row>
                        <!-- Category -->
                        <v-row class="px-3 py-1 mt-0">
                            <v-col cols="12" md="12" class="px-1 py-2">
                                <!-- Category -->
                                <v-label class="mb-1">Category</v-label>
                                <v-select
                                    v-model="ticket.category.name"
                                    :items="categoryOptions"
                                ></v-select>
                            </v-col>
                        </v-row>
                        <!-- Status -->
                        <v-row class="px-3 py-1 mt-0">
                            <v-col cols="12" md="12" class="px-1 py-2">
                                <!-- Status -->
                                <v-label class="mb-1">Status</v-label>
                                <v-select
                                    v-model="ticket.status"
                                    :items="ticketStatusOptions"
                                ></v-select>
                            </v-col>
                        </v-row>
                        <!-- Service Line -->
                        <v-row class="px-3 py-1 mt-0">
                            <v-col cols="12" md="12" class="px-1 py-2">
                                <v-label class="mb-1">Service Line</v-label>
                                <v-select
                                    v-model="ticket.service_line.name"
                                    :items="serviceLineOptions"
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
import { getTicket } from '@/api/ticket.api';
import moment from 'moment';
import { onMounted, ref } from 'vue';

import { getCategories } from '@/api/category.api';
import { getOrganizations } from '@/api/organization.api.js';
import { getServiceLines } from '@/api/service-line.api.js';
import { createTicket } from '@/api/ticket.api';
import { getUsers } from '@/api/user.api.js';
import { getVessels } from '@/api/vessel.api.js';
import { convertObjectToOptions } from '@/utils/helper.js';

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

const handleSubmit = async () => {
    if (valid.value) {
        const res = await createTicket(ticket.value)
        console.log('log:tag:res', res);
    }
}


const ticket = ref({
    title: '',
    description: '',
    contact_email: '',
    cc_emails: [''],
    priority: null,
    organization: {name: ''},
    vessel: {name: ''},
    service_line: {name: ''},
    category: {name: ''},

    assigned_to_user_id: null,
    status: 'open'
});
const loading = ref(false);

const fetchTicketDetails = async (ticketId) => {
    loading.value = true;
    try {
        const res = await getTicket(ticketId);
        ticket.value = res.data.data;
        console.log('log:tag:ticket', ticket);
    } finally {
        loading.value = false;
    }
}
const isEditContactEmail = ref(false);
const isEditTitle = ref(false);

const ticketTitleTemp = ref('');

const editTicketTitle = () => {
    const ticketTitleDiv = document.getElementById('ticket-title');

    if(!isEditTitle.value){
        // switch to input text field for ticket title
        const currentTitle = ticketTitleDiv.innerText;
        ticketTitleDiv.innerHTML = `<input type="text" id="ticket-title-input" value="${currentTitle}" />`;
        ticketTitleTemp.value = currentTitle;
        // focus on the input field
        document.getElementById('ticket-title-input').focus();

    }else{
        // switch back to text display
        const inputField = document.getElementById('ticket-title-input');
        const updatedTitle = inputField.value;
        ticketTitleDiv.innerHTML = updatedTitle;
        // update ticket title
        ticket.value.title = updatedTitle;
    }
    isEditTitle.value = !isEditTitle.value;
}

const editContactEmail = () => {
    const contactEmailDiv = document.getElementById('contact-email');

    if(!isEditContactEmail.value){
        // switch to input text field for contact email
        const currentEmail = contactEmailDiv.innerText;
        contactEmailDiv.innerHTML = `<input type="text" id="contact-email-input" value="${currentEmail}" />`;
        // focus on the input field
        document.getElementById('contact-email-input').focus();
    }else{
        // switch back to text display
        const inputField = document.getElementById('contact-email-input');
        const updatedEmail = inputField.value;
        contactEmailDiv.innerHTML = updatedEmail;
        // update ticket contact email
        ticket.value.contact_email = updatedEmail;
    }
    isEditContactEmail.value = !isEditContactEmail.value;
}

const handleAddCCEmail = () => {

    // add input field for cc email
    const elementInput = document.createElement('input');
    elementInput.type = 'text';
    elementInput.placeholder = 'Enter CC Email';
    elementInput.className = 'mb-2 w-50';
    elementInput.onblur = () => {
        const emailValue = elementInput.value;
        if(emailValue){
            ticket.value.cc_emails.push({cc_email: emailValue});
        }
        elementInput.remove();
    };
    document.getElementById('TicketCCEmails').appendChild(elementInput);
    elementInput.focus();
}

onMounted(() => {
    // get ticket id from url
    const ticketId = window.location.pathname.split('/').pop();
    console.log('log:tag:ticketId', ticketId);
    // fetch ticket details
    fetchTicketDetails(ticketId);
    fetchOrganizations()
    fetchVessels()
    fetchUsers()
    fetchCategories()
    fetchServiceLines()
});
</script>

<style>
    #contact-email{
        min-width: 10rem;
    }
    #contact-email-input, #ticket-title-input {
        width: -webkit-fill-available;
        /* shadow */
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        border: 1px solid #ccc;
        border-radius: 4px;
        padding: 4px 8px;
    }
</style>
