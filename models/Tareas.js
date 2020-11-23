const Sequelize = require('sequelize');
const db = require('../config/db');

const Tareas = db.define('tareas', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tarea: Sequelize.STRING(100),
    estado: Sequelize.INTEGER(1)
});
// Cada tarea pertenece a un proyecto (relacion ManyToOne)
//Tarea.belongsTo(Proyecto);

module.exports = Tareas;