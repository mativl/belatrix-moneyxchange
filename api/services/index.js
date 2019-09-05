const UserModel = require("./user/UserModel");
const UserService = require("./user/UserService");
const ExchangeModel = require("./exchange/ExchangeModel");
const ExchangeService = require("./exchange/ExchangeService");

module.exports = {
  userService: new UserService(UserModel),
  exchangeService: new ExchangeService(ExchangeModel),
}