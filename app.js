const express = require('express');
const app = express();
const morgan = require('morgan');

const usersRoutes = require("./api/routes/users");

app.use(morgan('dev'));

// Rutas
app.use('/api/v1/users', usersRoutes);

module.exports = app