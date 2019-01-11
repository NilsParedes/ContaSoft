const Usuario = require('../models/usuario.model');

const usuarioController = {

    getUsuarios: async (req, res) => {
        const { idEmpresa } = req.params;
        const usuarios = await Usuario.find({ empresa: idEmpresa });
        res.json(usuarios);
    },

    getUsuario: async (req, res) => {
        const usuario = await Usuario.findById(req.params.id);
        res.json(usuario);
    },

    verificarUsuario: async (req, res) => {
        let { usuario, password } = req.body;
        const user = await Usuario.find({ usuario: usuario, password: password });
        res.json(user);
    },

    //Crear usuario y admin
    createUsuario: async (req, res) => {
        const usuario = new Usuario({
            usuario: req.body.usuario,
            password: req.body.password,
            rol: req.body.rol,
            empresa: req.body.empresa
        });

        await usuario.save();
        res.json({ status: 'Usuario creado' });

    },

    updateUsuario: async (req, res) => {
        const { id } = req.params;
        const usuario = {
            usuario: req.body.usuario,
            password: req.body.password,
            rol: req.body.rol
        };
        await Usuario.findByIdAndUpdate(id, usuario, { new: true });
        res.json({ status: 'Usuario Actualizado' });
    },

    //Al eliminar un usuario este desaparece con todo y su inventario
    deleteUsuario: async (req, res) => {
        await Usuario.findByIdAndRemove(req.params.id);
        res.json({ status: 'Usuario Eliminado' });
    }

};

module.exports = usuarioController;