const express = require('express');
const routerSaldo = express.Router();

const saldo = require('../controllers/saldo.controller');

//Obtiene el saldo por id
routerSaldo.get('/:idEmpresa/:year', saldo.getSaldos);
//Obtiene los saldos determinados por un año
routerSaldo.get('/:id',saldo.getSaldo);
//
routerSaldo.post('/',saldo.createSaldo);

routerSaldo.put('/:id', saldo.updateSaldo);
routerSaldo.delete('/:id', saldo.deleteSaldo);

module.exports = routerSaldo;