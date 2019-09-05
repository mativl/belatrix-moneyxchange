class UserService {
  constructor(UserModel){
    this.UserModel = UserModel;
    this.listUsers = this.listUsers.bind(this);
    this.getUser = this.getUser.bind(this);
    this.createUser = this.createUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this._extractFields = this._extractFields.bind(this);
  }

  createUser(email, password) {
    const user = new this.UserModel({ email, password });
    return user.save();
  }

  async listUsers(offset = 0, limit = 0, fields = []) {
    const users = await this.UserModel.find({ deleted: false }, null, {
      skip: offset,
      limit
    });

    // Reviso los campos, para filtrar aquellos que deberian ofuscarse
    if (fields.length < 1) return users

    return Array.from(users).map(user =>{
      return this._extractFields(user, fields);
    });
  }

  async getUser(userId, fields = []) {
    const user = await this.UserModel.findOne({ _id: userId, deleted: false });
    return this._extractFields(user, fields);
  }

  async checkIfUserExist(email) {
    const user = await this.UserModel.find({ email: email });
    return user;
  }

  async updateUser(userId, email, password) {
    const user = await this.UserModel.findById(userId);
    if (email) user.email = email;
    if (password) user.password = password;
    return user.save();
  }

  async deleteUser(userId) {
    const user = await this.UserModel.findById(userId);
    user.deleted = true;
    return user.save();
  }

  _extractFields(user, fields) {
    if (fields.length < 1) return user;
    const result = fields.reduce((acc, field) => {
      acc[field] = user[field];
      return acc;
    }, {});

    return result;
  }
}

module.exports = UserService;