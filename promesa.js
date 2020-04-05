const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve({id: 1, model: 'Leon', company: 'Seat'})
    reject(new Error('Se ha producido un error al leer la DB'))
  }, 3000)
})

promise
  .then(result => console.log(result))
  .catch(err => console.log(err.message))
// Promesas encadenadas
function getCar(id){
  return new Promise((resolve, reject) => {
    setTimeout(()=>{
      console.log(`Obteniendo coche ${id} de nuestra base de datos`)
      resolve({id: id, model: 'X3', compny: 'BMW'})
      reject('No se encontró el coche')
    }, 2000)
  })
}

function getModel(model) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`Obteniendo modelo X3 de BMW`)
      resolve({speed: 200, seat: 5, size: '4*5'})
      reject('No se encontró el modelo')
    }, 2000)
  })
}
/*
const promesa = getCar(1)
promesa
  .then(coche => getModel(coche.model))
  .then(model => console.log(model))
  .catch(err => console.log(err.message))
*/
async function showModel() {
  try {
    const car = await getCar(1)
    const model = await getModel(car.model)
    console.log(model)
  } catch (err) {
    console.log(err.message);
  }
}

showModel()
