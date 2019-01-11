const express = require('express');
const routerEmpresa = express.Router();

const empresa = require('../controllers/empresa.controller');

// routerEmpresa.get('/entidad/:entidad',empresa.getEmpresas);
routerEmpresa.get('/:id',empresa.getEmpresa);
routerEmpresa.post('/',empresa.createEmpresaAndAdmin);
routerEmpresa.put('/:id',empresa.updateEmpresa);
routerEmpresa.delete('/:id',empresa.deleteEmpresa);

module.exports = routerEmpresa;
