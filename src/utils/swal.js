// src/utils/swal.js
import Swal from 'sweetalert2'

const swal = Swal.mixin({
    confirmButtonColor: '#1976D2', // Vuetify primary
    cancelButtonColor: '#9E9E9E',
    buttonsStyling: true,
    heightAuto: false,
    customClass: {
        container: 'swal2-vuetify',
        confirmButton: 'my-custom-confirm-btn',
        cancelButton: 'my-custom-cancel-btn'
    }
})

export default swal
