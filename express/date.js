// Middleware
function date(req,res, next) {
  console.log('Time: ', Date.now());
  // next() es necesario para continuar la ejecución
  next();
}

module.exports = date;
