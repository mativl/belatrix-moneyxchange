class ExchangeService {
  constructor(ExchangeModel){
    this.ExchangeModel = ExchangeModel;
    this.listExchanges = this.listExchanges.bind(this);
    this.getExchange = this.getExchange.bind(this);
    this._extractFields = this._extractFields.bind(this);
  }

  async listExchanges(offset = 0, limit = 0, fields = []) {
    const exchanges = await this.ExchangeModel.find({ deleted: false }, null, {
      skip: offset,
      limit
    });

    // Reviso los campos, para filtrar aquellos que deberian ofuscarse
    if (fields.length < 1) return exchanges

    return Array.from(exchanges).map(exchange =>{
      return this._extractFields(exchange, fields);
    });
  }

  async getExchange(exchangeId, fields = []) {
    const exchange = await this.ExchangeModel.findOne({ _id: exchangeId, deleted: false });
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
}

module.exports = ExchangeService;