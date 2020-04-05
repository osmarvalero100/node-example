const promesa1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('Leyendo datos de Facebook');
    resolve({amigos: 100, likes: 200})
    reject('No se pudo leer FB')
  }, 1000)
})

const promesa2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('Leyendo datos de Twitter');
    resolve({amigos: 300, likes: 900})
    reject('No se pudo leer TW')
  }, 3000)
})
// Retorna solo la 1ra promesa
/*
Promise.race([promesa1, promesa2])
  .then(result => console.log(result))
  .catch(err => console.log(err.message))
*/
// Retorna todas las Promesas
Promise.all([promesa1, promesa2])
  .then(result => console.log(result))
  .catch(err => console.log(err.message))
