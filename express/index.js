const mongoose = require('mongoose');
const express = require('express');
const morgan = require('morgan');

const port = process.env.PORT || 3003;
const app = express();
// Convierte a formato JSON las respuestas de los endpoints
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello Word');
});
// Se usan los endpoints de car
const car = require('./routes/car');
app.use('/api/cars', car);
// endpoints de User
const user = require('./routes/user');
app.use('/api/users', user);
// endpoints de User
const company = require('./routes/company');
app.use('/api/companies', company);
// endpoints de Sale
const sale = require('./routes/sale');
app.use('/api/sales', sale);

app.listen(port, () => console.log('Escuchando en puerto: '+ port));

mongoose.connect('mongodb://localhost/carsdb', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
  .then(()=> console.log('Se ha conectado a MongoDb'))
  .catch(error => console.log('Error. No se pudo conectar a MongoDb'))
