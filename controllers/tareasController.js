const { sync } = require('../config/db');
const Proyecto = require('../models/Proyecto');
const Tareas = require('../models/Tareas');

exports.agregarTarea = async (req, res, next) => {
    // Obtenemos el proyecto actual
    const proyecto = await Proyecto.findOne({
        where: {
            url: req.params.url
        }
    });

    // Leer el valor del input
    const {tarea} = req.body;

    // ID y Estado del proyecto
    const estado = 0;
    const proyectoId = proyecto.id;

    // Insertar en la base de datos
    const resultado = await Tareas.create( { tarea, estado, proyectoId } );

    if (!resultado) {
        return next();
    }
    // Redireccionar
    res.redirect(`/proyectos/${req.params.url}`);
};

exports.cambiarEstadoTarea = async (req, res, next) => {
    const { id } = req.params;
    const tarea = await Tareas.findOne({where: { id }});
    
    // Cambiar el estado
    let estado = 0;
    if (tarea.estado == estado) {
        estado = 1;
    }
    
    console.log("Estado:");
    console.log(estado);
    tarea.estado = estado;

    const resultado = tarea.save();

    if (!resultado) {
        return next();
    }

    res.send('Tarea Actualizada');
}

exports.eliminarTarea = async (req, res, next) => {
    const { id } = req.params;

    // Eliminando tarea
    const resultado = await Tareas.destroy({
        where: { id }
    });

    if (!resultado) {
        return next();
    }

    res.send("Tarea Eliminada Correctamente!");
}