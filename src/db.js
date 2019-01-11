const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/sistema_contable',{ useNewUrlParser: true })
.then(()=>console.log('Conectado a la bd correctamente'))
    .catch((err)=>console.log(err));