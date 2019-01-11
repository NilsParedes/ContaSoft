const express = require('express');
const routerCuenta = express.Router();

const cuenta = require('../controllers/cuenta.controller');

routerCuenta.get('/empresa/:idEmpresa',cuenta.getCuentas);
routerCuenta.get('/:id',cuenta.getCuenta);
routerCuenta.get('/mayor/:idEmpresa',cuenta.getCuentasOfMayor);
routerCuenta.get('/empresa/:idEmpresa/:tipo',cuenta.getCuentasTipo);
routerCuenta.post('/',cuenta.createCuenta);
routerCuenta.put('/:id',cuenta.updateCuenta);
routerCuenta.delete('/:id',cuenta.deleteCuenta);

module.exports = routerCuenta;
