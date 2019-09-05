const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const usersRoutes = require("./api/routes/users");

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers','*');
  if (req.method === 'OPTIONS'){
    res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

// Rutas
app.use('/api/v1/users', usersRoutes);

// Manejo de errores de rutas inexistentes
app.use((req, res, next) => {
  const error = new Error('Pagina no Existe');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app