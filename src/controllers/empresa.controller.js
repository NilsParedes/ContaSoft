const Empresa = require('../models/empresa.model');
const Usuario = require('../models/usuario.model');

const empresaController = {

    // getEmpresas : async (req, res) => {
    //     const {entidad} = req.params;
    //     const empresas = await Empresa.find({entidad: entidad});
    //     res.json(empresas);
    // },

    getEmpresa: async (req, res) => {
        const empresa = await Empresa.findById(req.params.id);
        res.json(empresa);
    },

    //Crear empresa y admin
    createEmpresaAndAdmin: async (req, res) => {
        const empresa = new Empresa({
            nombre: req.body.nombre,
            tipo: req.body.tipo,
            inicio_periodo: req.body.inicio_periodo,
            fin_periodo: req.body.fin_periodo
        });

        await empresa.save((err, empresaDB) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });

            } else {

                const usuario = new Usuario({
                    usuario: req.body.usuario,
                    password: req.body.password,
                    rol: 'admin',
                    empresa: empresaDB._id
                });

                //Await no funciona
                usuario.save((err, usuarioDB) => {

                    if (err) {
                        return res.status(400).json({
                            ok: false,
                            err
                        });
                    }
                    res.json({
                        status: 'Usuario y empresa creada',
                        ok: true,
                        empresa: empresaDB,
                        usuario: usuarioDB
                    });
                });
            }
        });
        //Obtener id de la empresa recién ingresada para referenciarla al usuario


    },

    updateEmpresa: async (req, res) => {
        const {
            id
        } = req.params;
        const empresa = {
            nombre: req.body.nombre,
            tipo: req.body.tipo,
            correo: req.body.correo,
            telefono: req.body.telefono,
            ruc: req.body.ruc,
            direccion: req.body.direccion,
            descripcion: req.body.descripcion,
            inicio_periodo: req.body.inicio_periodo,
            fin_periodo: req.body.fin_periodo
        };
        await Empresa.findByIdAndUpdate(id, empresa, {
            new: true
        });
        res.json({
            status: 'Empresa Actualizada'
        });
    },

    //Al eliminar un empresa este desaparece
    deleteEmpresa: async (req, res) => {
        await Empresa.findByIdAndRemove(req.params.id);
        res.json({
            status: 'Empresa Eliminada'
        });
    }

};

module.exports = empresaController;