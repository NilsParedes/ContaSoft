const express = require('express');
const routerTransaccion = express.Router();

const transaccion = require('../controllers/transacciones.controller');

routerTransaccion.get('/empresa/:idEmpresa',transaccion.getTransacciones);
routerTransaccion.get('/:id',transaccion.getTransaccion);
routerTransaccion.get('/cuenta/:idEmpresa',transaccion.getTransaccionOfNumCuenta);
routerTransaccion.post('/',transaccion.createTransaccion);
routerTransaccion.put('/:id',transaccion.updateTransaccion);
routerTransaccion.delete('/:id',transaccion.deleteTransaccion);

module.exports = routerTransaccion;
