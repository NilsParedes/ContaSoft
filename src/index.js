const express = require('express');
const cors = require('cors');
const app = express();

const { mongoose } = require('./db');

//CONFIG PUERTO
app.set('port', process.env.PORT || 3000);

//MIDDLEWARES
app.use(express.json());
app.use(cors({origin: 'http://localhost:4200'}));

//ROUTES
app.use('/api/empresa',require('./routes/empresa.route'));
app.use('/api/usuario',require('./routes/usuario.route'));
app.use('/api/cuenta',require('./routes/cuenta.route'));
app.use('/api/transaccion', require('./routes/transaccion.route'));
app.use('/api/saldo', require('./routes/saldo.route'));

//Server listening
app.listen(app.get('port'),()=>{
    console.log('Servidor corriendo en el puerto', app.get('port'));
});