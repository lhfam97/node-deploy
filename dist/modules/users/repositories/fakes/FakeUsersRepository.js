"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _User = _interopRequireDefault(require("../../infra/typeorm/entities/User"));

var _uuidv = require("uuidv4");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { isEqual } from 'date-fns';
class UsersRepository {
  constructor() {
    this.users = [];
  }

  async findById(id) {
    const findUser = this.users.find(user => user.id === id);
    return findUser;
  }

  async findByEmail(email) {
    const findUser = this.users.find(user => user.email === email);
    return findUser;
  }

  async save(user) {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);
    this.users[findIndex] = user;
    return user;
  }

  async create({
    name,
    email,
    password
  }) {
    const user = new _User.default();
    Object.assign(user, {
      id: (0, _uuidv.uuid)(),
      name,
      email,
      password
    });
    this.users.push(user);
    return user;
  }

}

var _default = UsersRepository;
exports.default = _default;