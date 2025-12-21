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
                                        <div class="text-body-2 text-grey">
                                            {{ ticket.title }}
                                            <v-btn
                                                size="x-small"
                                                icon
                                                variant="text"
                                                class="ml-1"
                                            >
                                                <v-icon size="14">ri-pencil-line</v-icon>
                                            </v-btn>
                                        </div>
                                    </div>

                                    <v-btn icon variant="text">
                                        <v-icon class="text-h5">ri-more-2-line</v-icon>
                                    </v-btn>
                                </div>


                                <v-row class="text-body-2 pt-3">
                                    <v-col cols="2" class="py-3">
                                        <strong>Ticket Id:</strong>
                                    </v-col>
                                    <v-col cols="10" class="py-3">
                                        <span class="text-warning ml-1">#{{ ticket.id }}</span>
                                    </v-col>

                                </v-row>

                                <v-row class="text-body-2 mt-0">
                                    <v-col cols="2" class="py-3">
                                        <strong>Created:</strong>
                                    </v-col>
                                    <v-col cols="10" class="py-3">
                                        <span class="ml-1">{{ moment(ticket.created_at).format('Y-m-d H:m') }}</span>
                                    </v-col>
                                </v-row>

                                <v-row class="text-body-2  mt-0">
                                    <v-col cols="2" class="py-3">
                                        <strong>Contact:</strong>
                                    </v-col>
                                    <v-col cols="10" class="py-3">
                                        <div class="ml-1 text-body-2 text-grey">
                                            {{ ticket.contact_email }}
                                            <v-btn
                                                size="x-small"
                                                icon
                                                variant="text"
                                                class="ml-1"
                                            >
                                                <v-icon size="14">ri-pencil-line</v-icon>
                                            </v-btn>
                                        </div>
                                    </v-col>
                                </v-row>

                                <v-row class="text-body-2 mt-0" align="start">
                                    <!-- Label -->
                                    <v-col cols="12" md="2" class="py-3">
                                        <strong>Cc Email:</strong>
                                    </v-col>

                                    <v-col cols="12" md="10" class="py-3">
                                        <div class="d-flex flex-column">
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
                                                <v-icon size="14">ri-add-circle-line</v-icon>
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
