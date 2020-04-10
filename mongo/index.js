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

createCar();

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
