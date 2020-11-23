const Usuarios = require('../models/Usuarios');
const enviarEmail = require('../handlers/email');

exports.formCrearCuenta = (req, res) => {
    res.render('crearCuenta', {
        nombrePagina: 'Crear Cuenta en UpTask'
    });
}

exports.crearCuenta = async (req, res) => {
    // Leer los datos
    const { email, password } = req.body;

    try {
        await // Crear el usuario
        Usuarios.create({
            email,
            password
        });

        // Crear una URL para confirmar
        const confirmarUrl = `http://${req.headers.host}/confirmar/${email}`;

        // Crear el objeto de usuario
        const usuario = {
            email
        }

        // Enviar email
        await enviarEmail.enviar({
            usuario,
            subject: 'Confirma tu cuenta UpTask',
            confirmarUrl,
            archivo: 'confirmar-cuenta'
        });

        // Redirigir al usuario
        req.flash('correcto','Enviamos un correo para validar tu cuenta');
        res.redirect('/iniciar-sesion');
    } catch (error) {
        console.log(error);
        //req.flash('error', error.errors.map(error => error.message));
        res.render('crearCuenta', {
            nombrePagina: 'Crear Cuenta en UpTask',
            mensajes: req.flash(),
            email,
            password
        })
    }
}

exports.formIniciarSesion = (req, res) => {
    const { error } = res.locals.mensajes;
    res.render('iniciarSesion', {
        nombrePagina: 'Iniciar Sesión en UpTask',
        error
    });
}

exports.formRestablecerPassword = (req, res) => {
    res.render('reestablecer', {
        nombrePagina: 'Reestablecer Contraseña'
    });
}

// Activa la cuenta
exports.confirmarCuenta = async (req, res) =>{
    const usuario = await Usuarios.findOne({
        where: {
            email: req.params.correo
        }
    });

    // Si no existe el usuario
    if ( !usuario ) {
        req.flash('error', 'Correo no válido');
        res.redirect('/crear-cuenta');
    }

    usuario.activo = 1;
    await usuario.save();

    req.flash('correcto', 'Bienvenido, ingrese su usuario y password');
    res.redirect('/iniciar-sesion');
}