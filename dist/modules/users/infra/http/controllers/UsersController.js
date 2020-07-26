"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _CreateUserService = _interopRequireDefault(require("../../../services/CreateUserService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//index, show, create, update, delete
class UsersController {
  async create(request, response) {
    const {
      name,
      email,
      password
    } = request.body;

    const createUserService = _tsyringe.container.resolve(_CreateUserService.default);

    const user = await createUserService.execute({
      name,
      email,
      password
    });
    delete user.password;
    return response.json(user);
  }

}

exports.default = UsersController;