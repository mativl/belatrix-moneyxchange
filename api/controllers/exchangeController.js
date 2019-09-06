const { exchangeService } = require("../services");
const catchException = require("../middlewares/catchExceptions");

// GET

/**
 * offset = Numero a partir del cual deseo obtener los siguientes registros.
 * limit = Limite de usuarios que deseo obtener (Default 50).
 * fields = Campos que deseo obtener.
 */
exports.exchange_get_all = catchException(async (req, res) => {
  let { offset, limit, fields } = req.query;
  offset = parseInt(offset);
  limit = parseInt(limit);
  limit =  Math.min(limit,50);
  fields = fields ? fields.split(",") : undefined;
  const exchanges = await exchangeService.listExchanges(offset, limit, fields);
  res.json(exchanges);
});

exports.exchange_get_by_id = catchException(async (req, res) => {
  const { exchangeId } = req.params;
  const exchange = await exchangeService.getExchange(exchangeId);
  if (exchange) {
    res.json(exchange);
  } else{
    res.status(404).json({ message: 'No se encontro la moneda con ese ID' });
  }
});