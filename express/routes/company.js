const mongoose = require("mongoose");
const express = require("express");
const {Company} = require("../models/company");
const router = express.Router();
const { check, validationResult } = require("express-validator");

router.get("/", async (req, res) => {
  const companies = await Company.find();
  res.send(companies);
});

router.get("/:id", async (req, res) => {
  const company = await Company.findById(req.params.id);
  if (!company)
    return res.status(404).send(`La empresa con ID: ${req.params.id} no existe`);
  res.send(company);
});

router.post("/",
  [check("name").isLength({ min: 3 }), check("country").isLength({ min: 3 })],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const company = new Company({
      name: req.body.name,
      country: req.body.country
    });

    const result = await company.save();
    res.status(201).send(result);
  }
);

router.put('/:id',
  [check("name").isLength({ min: 3 }), check("country").isLength({ min: 3 })],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array()});
    }

    const company = await Company.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      country: req.body.country
    })

    if (!company) {
      return res
        .status(404)
        .send(`La empresa con ID: ${req.params.id} no existe`);
    }

    res.status(204).send();
});

router.delete('/:id', async (req, res) => {
  const company = await Company.findByIdAndDelete(req.params.id);

  if (!company) {
    return res
      .status(404)
      .send(`La empresa con ID: ${req.params.id} no existe`);
  }

  res.status(200).send('Empresa borrada.');
});

module.exports = router;