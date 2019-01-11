const mongoose = require('mongoose');
const { Schema } = mongoose;

const empresaSchema = new Schema({
    nombre: { type: String, required:true, unique:true},
    tipo: { type: String,required:true},
    correo: {type:String,unique:true},
    telefono: {type:String,unique:true},
    ruc:{type:Number,unique:true},
    direccion: {type:String},
    descripcion: {type:String},
    inicio_periodo: { type: Date },
    fin_periodo: { type: Date }
});

module.exports = mongoose.model('Empresa', empresaSchema);
