const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const {mongoose} = require('./database');

app.set('nombreApp','Aplicación para manejo de gastos SRI');
app.set('puerto',process.env.PORT || 3000);

//middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({origin: 'http://localhost:4200'}));

//rutas
app.use('/api/gastos',require('./routes/server.routes'));

//puerto de escucha del servidor
app.listen(app.get('puerto'), () => {
    console.log('Nombre de la Aplicación: ',app.get('nombreApp'));
    console.log('Puerto del servidor: ',app.get('puerto'));
})