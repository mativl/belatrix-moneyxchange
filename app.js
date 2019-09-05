const express = require('express');
const app = express();
const morgan = require('morgan');

const usersRoutes = require("./api/routes/users");

app.use(morgan('dev'));

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