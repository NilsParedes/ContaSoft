const Saldo = require('../models/saldo.model');

const saldoController = {

    //Obtiene los saldos de un determinado año
    getSaldos: async (req, res) => {
        const { year, idEmpresa } = req.params;
        const saldos = await Saldo.find({ year: year,empresa:idEmpresa }).sort({cuenta : 1});
        res.json(saldos);
    },
    
    // Obtiene un saldo 
    getSaldo: async (req, res) => {
        const saldo = await Saldo.findById(req.params.id);
        res.json(saldo);
    },


    createSaldo: async (req, res) => {
        const saldo = new Saldo({
            cuenta: req.body.cuenta,
            year: req.body.year,
            monto:req.body.monto,
            empresa: req.body.empresa,
            accion: req.body.accion
        });

        await saldo.save();
        res.json({ status: 'Saldo creado' });

    },

    updateSaldo: async (req, res) => {
        const { id } = req.params;
        const saldo = {
            cuenta: req.body.cuenta,
            year: req.body.year,
            monto:req.body.monto,
            empresa: req.body.empresa,
            accion: req.body.accion
        };
        await Saldo.findByIdAndUpdate(id, saldo, { new: true });
        res.json({ status: 'Saldo Actualizado' });
    },

    //Al eliminar un saldo este desaparece con todo y su inventario
    deleteSaldo: async (req, res) => {
        await Saldo.findByIdAndRemove(req.params.id);
        res.json({ status: 'Saldo Eliminado' });
    }

};

module.exports = saldoController;