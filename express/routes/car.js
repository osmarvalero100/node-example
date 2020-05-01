const mongoose = require('mongoose');
const express = require('express');
const Car = require('../models/car');
const router = express.Router();
const { check, validationResult } = require('express-validator');

router.get('/', async(req, res) => {
  const cars = await Car.find();
  res.send(cars);
});

router.get('/:id', async(req, res) => {
  const car = await Car.findById(req.params.id);
  if (!car) return res.status(404).send('No hemos encontrado un coche con ese ID');
  res.send(car);
})

router.post('/', [
  check('company').isLength({min: 3}),
  check('model').isLength({min: 2})
], async(req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array()});
  }

  const car = new Car({
    company: req.body.company,
    model: req.body.model,
    year: req.body.year,
    sold: req.body.sold,
    price: req.body.price,
    extras: req.body.extras
  });

  const result = await car.save();
  res.status(201).send(result);
});

router.put('/:id', [
  check('company').isLength({min: 3}),
  check('model').isLength({min: 3})
],async(req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array()});
  }

  const car = await Car.findByIdAndUpdate(req.params.id, {
    company: req.body.company,
    model: req.body.model,
    year: req.body.year,
    sold: req.body.sold,
    price: req.body.price,
    extras: req.body.extras
  })
  
  if(!car) {
    return res.status(404).send('El carro con ID no está');
  }

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
