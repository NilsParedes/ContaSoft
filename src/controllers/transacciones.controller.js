const Transaccion = require('../models/transaccion.model');
const Empresa = require('../models/empresa.model');

const transaccionController = {

    getTransacciones: async (req, res) => {
        const { idEmpresa } = req.params;
        let empresa = await Empresa.findById(idEmpresa);
        const transacciones = await Transaccion.find({ fecha: { "$gte": empresa.inicio_periodo, "$lte": empresa.fin_periodo }, empresa: idEmpresa}).sort({fecha: 1});
        res.json(transacciones);
    },

    getTransaccion: async (req, res) => {
        const transaccion = await Transaccion.findById(req.params.id);
        res.json(transaccion);
    },

    getTransaccionOfNumCuenta: async (req, res) => {
        const { idEmpresa } = req.params;
        let empresa = await Empresa.findById(idEmpresa);
        const transacciones = await Transaccion.find({ fecha: { "$gte": empresa.inicio_periodo, "$lte": empresa.fin_periodo }, empresa: idEmpresa}).sort({fecha: 1});
        //Estructurar datos para enviarlos
        let datosEstructurados = [];
        transacciones.forEach( element => {
            element.cuenta.forEach(c => {
                datosEstructurados.push(c);
            })
        });

        res.json(datosEstructurados);
    },

    //Crear transaccion y admin
    createTransaccion: async (req, res) => {
        const transaccion = new Transaccion({
            fecha: req.body.fecha,
            descripcion: req.body.descripcion,
            empresa : req.body.empresa,
            cuenta: req.body.cuenta
        });
        await transaccion.save();
        res.json({ status: 'Transaccion creada' });

    },

    updateTransaccion: async (req, res) => {
        const { id } = req.params;
        // await Transaccion.findByIdAndUpdate({"_id":id},{$unset:{"cuenta":""}});
        const transaccion = {
            fecha: req.body.fecha,
            descripcion: req.body.descripcion,
            cuenta: req.body.cuenta
        };
        await Transaccion.findByIdAndUpdate(id, transaccion, { new: true });
        // await Transaccion.findById(id,{cuenta:req.body.cuenta});
        res.json({ status: 'Transaccion Actualizada' });
    },

    //Al eliminar un transaccion este desaparece con todo y su inventario
    deleteTransaccion: async (req, res) => {
        await Transaccion.findByIdAndRemove(req.params.id);
        res.json({ status: 'Transaccion Eliminado' });
    }

};

module.exports = transaccionController;