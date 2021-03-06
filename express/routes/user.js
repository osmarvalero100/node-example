const bcrypt = require('bcrypt');
const mongoose = require("mongoose");
const express = require("express");
const User = require("../models/user");
const router = express.Router();
const { check, validationResult } = require("express-validator");

router.get("/", async (req, res) => {
  const users = await User.find();
  res.send(users);
});

router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user)
    return res.status(404).send(`El usuario con ID: ${req.params.id} no existe`);
  res.send(user);
});

router.post("/",
  [check("name").isLength({ min: 3 }), check("email").isLength({ min: 3 }), check("password").isLength({ min: 3 })],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    let userEmail = await User.findOne({email: req.body.email})
    if (userEmail) return res.status(400).send('Ya hay un usuario registrado con ese email');
    
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt)

    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashPassword,
      isCustomer: false
    });

    const result = await user.save();
    res.status(201).send({
      _id: user._id,
      name: user.name,
      email: user.email
    });
  }
);

router.put('/:id',
  [check("name").isLength({ min: 3 }), check("email").isLength({ min: 3 })],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array()});
    }

    const user = await User.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      email: req.body.email,
      isCustomer: req.body.isCustomer
    })

    if (!user) {
      return res
        .status(404)
        .send(`El usuario con ID: ${req.params.id} no existe`);
    }

    res.status(204).send();
});

router.delete('/:id', async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return res
      .status(404)
      .send(`El usuario con ID: ${req.params.id} no existe`);
  }

  res.status(200).send('Usuario borrado.')
});

module.exports = router;