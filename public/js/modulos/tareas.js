import Swal from 'sweetalert2';
import axios from 'axios';
import { actualizarAvance } from "../funciones/avance";


const tareas = document.querySelector('.listado-pendientes');

if (tareas) {
    // Tecnica delegation, Listener global
    tareas.addEventListener('click', e => {
        if (e.target.classList.contains('fa-check-circle')) {
            const icono = e.target;
            const idTarea = icono.parentElement.parentElement.dataset.tarea;
            
            // request hacia /tareas/:id
            const url = `${location.origin}/tareas/${idTarea}`;

            axios.patch(url, {idTarea})
                .then(function(respuesta) {
                    if ( respuesta.status == 200 ) {
                        icono.classList.toggle('completo');
                        actualizarAvance();
                    }
                });
        } 
        if (e.target.classList.contains('fa-trash')) {
            // Eliminar Tarea
            const tareaHTML = e.target.parentElement.parentElement;
            const idTarea = tareaHTML.dataset.tarea;

            Swal.fire({
                title: '¿Deseas eliminar esta Tarea?',
                text: '¡Una tarea eliminada no es posible recuperarla',
                type: 'wharning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, eliminarlo!',
                cancelButtonText: 'No Cancelar'
            }).then((result) => {
                if (result.value) {
                    // Enviar delete por medio de axios
                    const url = `${location.origin}/tareas/${idTarea}`;
                    
                    axios.delete(url, { params: { idTarea }})
                        .then(function(respuesta) {
                            if (respuesta.status == 200) {
                                // Eliminar nodo
                                tareaHTML.parentElement.removeChild(tareaHTML);

                                Swal.fire(
                                    'Tarea Eliminada',
                                    respuesta.data,
                                    'success'
                                );
                                actualizarAvance();
                            }
                        }).catch(() => {
                            Swal.fire({
                                type: 'error',
                                text: 'No se pudo eliminar la Tarea'
                            });
                        });
                }
            });
            
        }
    });
}

export default tareas;