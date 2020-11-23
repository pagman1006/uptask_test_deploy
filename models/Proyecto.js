const Sequelize = require('sequelize');
const db = require('../config/db');
const slug = require('slug');
const nanoid= require('nanoid');
const Tareas = require('./Tareas');

const Proyecto = db.define('proyectos', {
    id : {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: Sequelize.STRING(100),
    url: Sequelize.STRING(100)
}, {
    hooks: {
        beforeCreate(proyecto) {
            const url = slug(proyecto.nombre).toLowerCase();
            proyecto.url = `${url}-${nanoid.nanoid(10)}`
        }
    }
});

// Relacion OneToMany
Proyecto.hasMany(Tareas);

module.exports = Proyecto;