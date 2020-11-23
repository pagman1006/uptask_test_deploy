import Swal from 'sweetalert2';
import axios from 'axios';

const btnEliminar = document.querySelector('#eliminar-proyecto');

if (btnEliminar) {
    btnEliminar.addEventListener('click', e => {
        const urlProyecto = e.target.dataset.proyectoUrl;

        Swal.fire({
            title: '¿Deseas eliminar este proyecto?',
            text: "¡Un proyecto eliminado no es posible recuperarlo!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminarlo!',
            cancelButtonText: 'No Cancelar'
        }).then((result) =>{
            if(result.value) {
                // enviar peticion a axios
                const url = `${location.origin}/proyectos/${urlProyecto}`;

                axios.delete(url, {params: {urlProyecto}})
                    .then(function(respuesta) {
                        Swal.fire(
                            'Eliminado!',
                            respuesta.data,
                            'success'
                        );
                        
                    }).catch(() => {
                        Swal.fire({
                            type: 'error',
                            text: 'No se pudo eliminar el proyecto'
                        });
                    });

                    setTimeout(function() {
                        location.href = '/';
                    },3000);
            }
        })
    })
}

export default btnEliminar;