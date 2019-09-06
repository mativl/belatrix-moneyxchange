const express = require('express');
const checkAuth = require("../middlewares/check-auth");
const ExchangeController = require("../controllers/exchangeController");

const router = express.Router();

// GET

/**
 * offset = Numero a partir del cual deseo obtener los siguientes registros.
 * limit = Limite de usuarios que deseo obtener (Default 50).
 * fields = Campos que deseo obtener.
 */
router.get(
  "/",
  checkAuth,
  ExchangeController.exchange_get_all
);

router.get(
  "/:base",
  checkAuth,
  ExchangeController.exchange_get_by_base
);

module.exports = router;