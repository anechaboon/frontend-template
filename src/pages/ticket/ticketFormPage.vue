<template>
    <v-container fluid>
        <TicketForm
            :ticket="editingTicket"
        />
    </v-container>

</template>

<script setup>
import { onMounted, ref } from 'vue';

const dialog = ref(false)
const editingTicket = ref(null)

editingTicket.value = {
        title: '',
        description: '',
        contact_email: '',
        priority: null,
        organization_id: null,
        vessel_id: null,
        service_line_id: null,
        status: 'active'
    }

const tickets = ref([])
const search = ref('')
const loading = ref(false)




const closeModal = () => {
    dialog.value = false
}

onMounted(() => {
})
</script>
<style>
    .my-custom-confirm-btn {
        color: #ffffff !important;
    }
    .my-custom-cancel-btn {
        color: #ffffff !important;
    }
    .v-containter{
        max-width: unset !important;

    }
    .v-container--fluid {
        max-width: unset !important;
    }
    .v-locale--is-ltr{
        max-width: unset !important;
    }
</style>
