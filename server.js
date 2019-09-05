const http = require('http');
const app = require('./app');

const port = process.env.PORT || 5000;

const server = http.createServer(app);
server.listen(port, () => console.log(`Server iniciado en puerto ${port}`));

process.on("unhandledRejection", error => {
  console.log(error.message);
  console.log("---------------");
  process.exit(1);
}); 