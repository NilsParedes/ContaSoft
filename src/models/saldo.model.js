const moongose = require('mongoose');
const { Schema } = moongose;

const saldoSchema = new Schema({
    year:{type:Number, required:true},
    cuenta: {
        numero : {type: Number, required:true},
        nombre: {type:String, required:true},
        tipo : {type:String, required:true}
        },
    accion : {type:String, required:true},
    monto: {type:Number, required:true},
    empresa: { type: Schema.ObjectId, ref: "Empresa",required:true}
});

module.exports = moongose.model('Saldo',saldoSchema);