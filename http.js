const http = require('http');
/*
const server = http.createServer();

server.on('connection', (socket) => {
  console.log('Nueva connección detectada');
});

server.listen(3000);
console.log('Escuchando por el puerto 3000');
*/
/*
const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.write('NodeJs ');
    res.write('Texto inicial');
    res.end();
  }
  if (req.url === '/coches') {
    res.write('Coche 1');
    res.end();
  }
});
server.listen(3000);
console.log('Escuchando en puerto 3000...');
*/

const server =http.createServer((rep, res) => {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write('<h1>NodeJs</h1>');
  res.write('<p>Primera web de coches</p>');
  res.end();
}).listen(3000);
