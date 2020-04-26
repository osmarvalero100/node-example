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

app.listen(port, () => console.log('Escuchando en puerto: '+ port));

mongoose.connect('mongodb://localhost/carsdb', {useNewUrlParser: true, useUnifiedTopology: true})
  .then(()=> console.log('Se ha conectado a MongoDb'))
  .catch(error => console.log('Error. No se pudo conectar a MongoDb'))
