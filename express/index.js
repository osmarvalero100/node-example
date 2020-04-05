const express = require('express');
const morgan = require('morgan');
const port = process.env.PORT || 3003;
const app = express();
const { check, validationResult } = require('express-validator');
app.use(express.json());
// Middleware
app.use(morgan('tiny'));
const date = require('./date');
app.use(date);
// Este Middleware solo se ejecutal al usar este endpoint: '/api/cars/list'
app.use('/api/cars/list', (req, res, next) => {
  console.log('Request Type: ', req.method);
  // next() es necesario para continuar la ejecución
  next();
});

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

app.post('/api/cars', [
  check('company').isLength({min: 3}),
  check('model').isLength({min: 3})
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array()});
  }
  var cartId = coches.length;
  var coche = {
    id: cartId,
    company: req.body.company,
    model: req.body.model,
    year: req.body.year
  };
  coches.push(coche);
  res.status(201).send(coche);
});

app.put('/api/cars/:id', [
  check('company').isLength({min: 3}),
  check('model').isLength({min: 3})
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array()});
  }

  const coche = coches.find(coche => coche.id === parseInt(req.params.id));
  if (!coche) {
    return res.status(404).send(`El coche con id: ${req.params.id} no existe.`);
  }
  coche.company = req.body.company;
  coche.model = req.body.model;
  coche.year = req.body.year;

  res.status(204).send();
});

app.delete('/api/cars/:id', (req, res) => {
  const coche = coches.find(coche => coche.id === parseInt(req.params.id));
  if (!coche) {
    return res.status(400).send(`El coche con id: ${req.params.id} no existe.`);
  }
  const index = coches.indexOf(coche);
  coches.splice(index, 1);
  return res.status(204).send();
});

app.listen(port, () => console.log('Escuchando en puerto: '+ port));
