const express = require('express');
const routerUsuario = express.Router();

const usuario = require('../controllers/usuario.controller');

routerUsuario.get('/empresa/:idEmpresa',usuario.getUsuarios);
routerUsuario.get('/:id',usuario.getUsuario);
routerUsuario.post('/',usuario.createUsuario);
routerUsuario.post('/ingresar',usuario.verificarUsuario);
routerUsuario.put('/:id',usuario.updateUsuario);
routerUsuario.delete('/:id',usuario.deleteUsuario);

module.exports = routerUsuario;
