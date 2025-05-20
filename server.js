const http = require('http');
const { suma } = require('./index');

http.createServer((req, res) => {
  res.end('Servidor corriendo con Node.js y Docker');
}).listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
