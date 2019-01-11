const Cuenta = require('../models/cuenta.model');

const cuentaController = {

    getCuentas : async (req, res) => {
        const {idEmpresa} = req.params;
        const cuentas = await Cuenta.find({empresa: idEmpresa}).sort({numc: 1});
        res.json(cuentas);
    },

    getCuentasTipo : async (req, res) => {
        const {idEmpresa, tipo} = req.params;
        const cuentas = await Cuenta.find({empresa: idEmpresa,tipo: tipo}).sort({numc: 1});
        res.json(cuentas);
    },

    getCuentasOfMayor: async (req,res) =>{
        const { idEmpresa } = req.params;
        const cuentas = await Cuenta.find({empresa:idEmpresa}).sort({numc: 1});
        //Estructurar datos para enviarlos
        let datosEstructurados = [];
        cuentas.forEach( cuenta => {
            c = {
                nombre :cuenta.nombre,
                numero : cuenta.numc,
                tipo: cuenta.tipo
            }
                datosEstructurados.push(c);
        });

        res.json(datosEstructurados);
    },

    getCuenta: async (req, res) => {
        const cuenta = await Cuenta.findById(req.params.id);
        res.json(cuenta);
    },

    // verificarCuenta: async (req, res) => {
    //     let {cuenta, password} = req.body;
    //     const user = await Cuenta.find({cuenta: cuenta, password:password });
    //     res.json(user);
    // },

    //Crear cuenta y admin
    createCuenta: async (req, res) => {
        const cuenta = new Cuenta({
            nombre : req.body.nombre,
            numc : req.body.numc,
            // numsubc : req.body.numsubc,
            tipo : req.body.tipo,
            empresa: req.body.empresa
        });

        await cuenta.save();
        res.json({ status: 'Cuenta creada' });
    },

    updateCuenta: async (req, res) => {
        const { id } = req.params;
        const cuenta = {
            nombre : req.body.nombre,
            numc : req.body.numc,
            // num_subc : req.body.num_subc,
            tipo : req.body.tipo
        };
        await Cuenta.findByIdAndUpdate(id, cuenta, { new: true });
        res.json({ status: 'Cuenta Actualizada' });
    },

    //Al eliminar un cuenta este desaparece con todo y su inventario
    deleteCuenta: async (req, res) => {
        await Cuenta.findByIdAndRemove(req.params.id);
        // await Inventario.remove({ cuenta: req.params.id });
        res.json({ status: 'Cuenta Eliminada' });
    }

};

module.exports = cuentaController;