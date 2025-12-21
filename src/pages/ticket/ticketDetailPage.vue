<template>
    <v-form ref="form" v-model="valid">
        <v-container>
            <v-row>
                <v-col cols="12" md="5">
                    <v-card outlined class="pa-2 mb-4 pb-5">
                        <v-row class="px-3 py-1 mt-0">
                            <v-col cols="12" md="7" class="py-1">
                                <h3>Ticket</h3>
                            </v-col>
                        </v-row>
                        <!-- Ticket && Priority -->
                        <v-row class="px-3 py-1 mt-0">
                            <v-col cols="12" md="7">
                                <div class="d-flex align-center pl-1">
                                    <!-- Title -->
                                    <p class="mb-0">{{ ticket.title }}</p>
                                    <i class="ri-pencil-line ml-2"></i>
                                </div>
                            </v-col>
                            <v-col cols="12" md="5" class="px-1">
                                <!-- Priority -->
                                <v-select
                                    v-model="ticket.priority"
                                    :items="globalPriorityOptions"
                                    label="Priority"
                                ></v-select>
                            </v-col>
                        </v-row>
                        <!-- Email -->
                        <v-row class="px-3 py-1 mt-0">
                            <v-col cols="12" md="7" class="px-1">
                                <!-- Email -->
                                <v-text-field
                                    v-model="ticket.contact_email"
                                    label="Contact Email"
                                    type="email"
                                    autocomplete="email"
                                />
                            </v-col>
                        </v-row>
                        <!-- CC-Emails -->
                        <template v-for="(cc_email, index) in ticket.cc_emails" :key="index">
                            <v-row class="py-1 mt-0" >
                                <v-col cols="10" md="7" class="px-1">
                                    <!-- CC-Emails -->
                                    <v-text-field
                                        v-model="cc_email.cc_email"
                                        :label="`CC Email ${index + 1}`"
                                        type="email"
                                        autocomplete="new-email"
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
                                    v-model="ticket.organization.name"
                                    :items="organizationOptions"
                                    label="Organization"
                                ></v-select>
                            </v-col>
                        </v-row>
                        <!-- Vessel -->
                        <v-row class="px-3 py-1 mt-0">
                            <v-col cols="12" md="12" class="px-1">
                                <!-- Vessel -->
                                <v-select
                                    v-model="ticket.vessel.name"
                                    :items="vesselOptions"
                                    label="Vessel"
                                ></v-select>
                            </v-col>
                        </v-row>
                        <!-- Assigned To -->
                        <v-row class="px-3 py-1 mt-0">
                            <v-col cols="12" md="12" class="px-1">
                                <v-select
                                    v-model="ticket.assigned_to_user_name"
                                    :items="userOptions"
                                    label="Assigned To"
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
                                    v-model="ticket.category.name"
                                    :items="categoryOptions"
                                    label="Category"
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
                                    label="Status"
                                ></v-select>
                            </v-col>
                        </v-row>
                        <!-- Service Line -->
                        <v-row class="px-3 py-1 mt-0">
                            <v-col cols="12" md="12" class="px-1">
                                <v-select
                                    v-model="ticket.service_line.name"
                                    :items="serviceLineOptions"
                                    label="Service Line"
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
import { onMounted, ref } from 'vue';

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

onMounted(() => {
    // get ticket id from url
    const ticketId = window.location.pathname.split('/').pop();
    console.log('log:tag:ticketId', ticketId);
    // fetch ticket details
    fetchTicketDetails(ticketId);
});
</script>
