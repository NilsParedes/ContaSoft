const mongoose = require('mongoose');
const { Schema } = mongoose;

const transaccionSchema = new Schema({
    empresa: { type: Schema.ObjectId, ref: "Empresa"},
    fecha: { type: Date, required: true },
    descripcion: { type: String, required: true },
    // cuenta:{type:Array[[String,String,Number]],required:true}
    cuenta: [
        {
            // idCuenta: { type: String, required: true },
            numero: { type: Number, required: true },
            nombre: { type: String, required: true },
            accion: { type: String, required: true },
            monto: { type: Number, required: true },
            tipo: { type: String, required: true }
        }
    ]
});

module.exports = mongoose.model('Transaccion', transaccionSchema);
