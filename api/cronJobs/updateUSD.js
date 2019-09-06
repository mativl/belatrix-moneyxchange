const cron = require('node-cron');
const axios = require('axios');
const { cronExchange } = require('../controllers/exchangeController');

cron.schedule('* * * * *', async () => {
  const response = await axios.get('https://api.exchangeratesapi.io/latest?base=USD');
  cronExchange(response.data);
});