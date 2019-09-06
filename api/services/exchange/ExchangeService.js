class ExchangeService {
  constructor(ExchangeModel){
    this.ExchangeModel = ExchangeModel;
    this.listExchanges = this.listExchanges.bind(this);
    this.getExchange = this.getExchange.bind(this);
    this._extractFields = this._extractFields.bind(this);
  }

  async listExchanges(offset = 0, limit = 0, fields = []) {
    const exchanges = await this.ExchangeModel.find({}, null, {
      skip: offset,
      limit
    });

    // Reviso los campos, para filtrar aquellos que deberian ofuscarse
    if (fields.length < 1) return exchanges

    return Array.from(exchanges).map(exchange =>{
      return this._extractFields(exchange, fields);
    });
  }

  async getExchange(base, fields = []) {
    const exchange = await this.ExchangeModel.findOne({ base: base });
    return this._extractFields(exchange, fields);
  }

  _extractFields(exchange, fields) {
    if (fields.length < 1) return exchange;
    const result = fields.reduce((acc, field) => {
      acc[field] = exchange[field];
      return acc;
    }, {});

    return result;
  }
  
  async checkIfExchangeExist(base) {
    const exchange = await this.ExchangeModel.find({ base: base });
    return exchange;
  }

  createExchange(base, rates, date) {
    const exchange = new this.ExchangeModel({ base, rates, date });
    return exchange.save();
  }

  /**
   * Solo se puede actualizar Rates y Date
  */
  async updateExchange(exchangeId, rates, date) {
    const exchange = await this.ExchangeModel.findById(exchangeId);
    if (rates) exchange.rates = rates;
    if (date) exchange.date = date;
    return exchange.save();
  }
}

module.exports = ExchangeService;