const express = require('express');
const router = express.Router();

const { check, validationResult } = require('express-validator');
var coches = [
  {id: 0, company: 'BMW', model: 'X3', year: '2020'},
  {id: 1, company: 'Audi', model: 'A1', year: '2021'},
  {id: 2, company: 'Mercedes', model: 'Clase A', year: '2022'}
];

router.get('/list', (req, res) => {
  res.send(['BMW S1', 'AUDI A3', 'MERCEDES CLASE A']);
});
router.get('/:company/:model', (req, res) => {
  res.send(req.params);
});
router.get('', (req, res) => {
  res.send(coches);
});
router.get('/:company', (req, res) => {
  const coche = coches.find(coche => coche.company.toUpperCase() === req.params.company.toUpperCase());
  if (!coche) {
    res.status(404).send('No tenemos ningún coche de esta marca');
  } else {
    res.send(coche);
  }
});

router.post('/', [
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

router.put('/:id', [
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

router.delete('/:id', (req, res) => {
  const coche = coches.find(coche => coche.id === parseInt(req.params.id));
  if (!coche) {
    return res.status(400).send(`El coche con id: ${req.params.id} no existe.`);
  }
  const index = coches.indexOf(coche);
  coches.splice(index, 1);
  return res.status(204).send();
});

module.exports = router;
