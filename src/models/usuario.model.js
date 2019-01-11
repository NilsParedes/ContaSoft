const mongoose = require('mongoose');
const { Schema } = mongoose;

const usuarioSchema = new Schema({
    usuario:{type:String, required:true,unique:true},
    password:{type:String, required:true},
    rol:{type:String,required:true},
    empresa: { type: Schema.ObjectId, ref: "Empresa"} 
});

module.exports = mongoose.model('Usuario', usuarioSchema);

