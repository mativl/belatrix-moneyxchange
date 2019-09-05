class ExchangeService {
  constructor(ExchangeModel){
    this.ExchangeModel = ExchangeModel;
    this.listExchanges = this.listExchanges.bind(this);
    this.getExchange = this.getExchange.bind(this);
    this.createExchange = this.createExchange.bind(this);
    this.updateExchange = this.updateExchange.bind(this);
    this.deleteExchange = this.deleteExchange.bind(this);
    this._extractFields = this._extractFields.bind(this);
  }

  createExchange(email, password) {
    const exchange = new this.ExchangeModel({ email, password });
    return exchange.save();
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

  async checkIfExchangeExist(email) {
    const exchange = await this.ExchangeModel.find({ email: email });
    return exchange;
  }

  async updateExchange(exchangeId, email, password) {
    const exchange = await this.ExchangeModel.findById(exchangeId);
    if (email) exchange.email = email;
    if (password) exchange.password = password;
    return exchange.save();
  }

  async deleteExchange(exchangeId) {
    const exchange = await this.ExchangeModel.findById(exchangeId);
    exchange.deleted = true;
    return exchange.save();
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