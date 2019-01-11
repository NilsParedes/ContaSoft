const moongose = require('mongoose');
const { Schema } = moongose;

const cuentaSchema = new Schema({
    nombre:{type:String, required:true},
    numc:{type:Number, required:true},
    // numsubc:{type:Number, required:true},
    tipo:{type:String, required:true},
    empresa: { type: Schema.ObjectId, ref: "Empresa",required:true} 
});

module.exports = moongose.model('Cuenta',cuentaSchema);