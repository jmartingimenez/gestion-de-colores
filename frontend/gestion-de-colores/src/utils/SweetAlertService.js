import Swal from 'sweetalert2';

const SweetAlertService = {
    MisDatos: function(icon, title, text, footer){
        Swal.fire({
            icon: icon,
            title: title,
            text: text,
            footer: footer
        });
    }
}

export default SweetAlertService;