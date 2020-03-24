const express = require('express');
const port = process.env.PORT || 3003;
const app = express();

var coches = [
  {id: 0, company: 'BMW', model: 'X3', year: '2020'},
  {id: 1, company: 'Audi', model: 'A1', year: '2021'},
  {id: 2, company: 'Mercedes', model: 'Clase A', year: '2022'}
];

app.get('/', (req, res) => {
  res.send('Hello Word');
});
app.get('/api/cars/list', (req, res) => {
  res.send(['BMW S1', 'AUDI A3', 'MERCEDES CLASE A']);
});
app.get('/api/cars/:company/:model', (req, res) => {
  res.send(req.params);
});
app.get('/api/cars', (req, res) => {
  res.send(coches);
});
app.get('/api/cars/:company', (req, res) => {
  const coche = coches.find(coche => coche.company.toUpperCase() === req.params.company.toUpperCase());
  if (!coche) {
    res.status(404).send('No tenemos ningún coche de esta marca');
  } else {
    res.send(coche);
  }
});

app.listen(port, () => console.log('Escuchando en puerto: '+ port));
