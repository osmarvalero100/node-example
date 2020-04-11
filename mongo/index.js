const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cars', {useNewUrlParser: true})
  .then(() => console.log('Conectado a MongoDB'))
  .catch(() => console.log('Error al conectar a MongoDB'))

  const carSchema = new mongoose.Schema({
    company: String,
    model: String,
    price: Number,
    year: Number,
    sold: Boolean,
    extras: [String],
    date: {type: Date, default: Date.now}
  })

const Car = mongoose.model('car', carSchema);

//createCar();
//getCars();
//getCompayAndSoldFilterCars();
//getMoreFilterCar();
//getFilterPriceCar();
//getFilterExtrasByIn();
//getFilterExtrasByNin();
//getFilterByAnd();
//getFilterByOr();
//getCountCars();
getPaginationCars();

async function createCar() {
  const car = new Car({
    company: 'BMW',
    model: 'X3',
    price: 2000,
    year: 2018,
    sold: false,
    extras: ['Automatic', '4x4'],
  });
  const result = car.save();
  console.log(result);
}

async function getCars() {
  const cars = await Car.find();
  console.log(cars)
}

async function getCompayAndSoldFilterCars() {
  const cars = await Car.find({company: 'BMW', sold: true})
  console.log(cars);
  
}

async function getMoreFilterCar() {
  const cars = await Car
    .find({company: 'BMW', sold: false})
    .sort({price: 1}) // Order by (1) ASC (-1) DESC
    .limit(2)
    .select({company: 1, model: 1, price: 1})
    console.log(cars);
    
}

/**
 * Operadores
 * $eq = Igual
 * $ne = Diferente de
 * $gt = Mayor que
 * $gte = mayor o igual que
 * $lt = Menor que
 * $lte = Menor o igual que
 * $in = Coincidencia con valores de un Array
 * $nin = Que no haya coincidencia con valores de un Array
 * $and = Todas las expresiones deben coincidir
 * $or = Al menos 1 expresión debe coincidir
 */
async function getFilterPriceCar() {
  const cars = await Car
    .find({price: {$gt: 2000}})
  console.log(cars);
  const cars1 = await Car
    .find({price: {$gte: 1000, $lt: 5000}})
  console.log(cars1);
  
}

async function getFilterExtrasByIn() {
  const cars = await Car
    .find({extras: {$in: 'Automatic'}})
    console.log(cars);
}

async function getFilterExtrasByNin() {
  const cars = await Car
    .find({extras: {$nin: 'Automatic'}})
    console.log(cars);
}

async function getFilterByAnd() {
  const cars = await Car
    .find()
    .and([{company: 'BMW'}, {model: 'X2'}])
  console.log(cars);
}

async function getFilterByOr() {
  const cars = await Car
    .find()
    .or([{company: 'BMW'}, {model: 'Z3'}])
  console.log(cars);
}

async function getCountCars() {
  const cars = await Car
    .find({company: 'AUDI'})
    .count()
  console.log(cars);
}

async function getPaginationCars() {
  const pageNumber = 2
  const pageSize = 2

  const cars = await Car
    .find()
    .skip((pageNumber-1)*pageSize)
    .limit(pageSize)
  console.log(cars);
}