const express = require('express');
const app = express();
const port = process.env.PORT || 3003;

app.get('/', (req, res) => {
  res.send('Hello Word');
});
app.get('/api/carts/list', (req, res) => {
  res.send(['BMW S1', 'AUDI A3', 'MERCEDES CLASE A']);
});
app.get('/api/carts/:company/:model', (req, res) => {
  res.send(req.params);
});
app.listen(port, () => console.log('Escuchando en puerto: '+ port));
