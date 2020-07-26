"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _multer = _interopRequireDefault(require("multer"));

var _upload = _interopRequireDefault(require("../../../../../config/upload"));

var _UsersController = _interopRequireDefault(require("../controllers/UsersController"));

var _UserAvatarController = _interopRequireDefault(require("../controllers/UserAvatarController"));

var _ensureAuthenticated = _interopRequireDefault(require("../middlewares/ensureAuthenticated"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const usersRouter = (0, _express.Router)();
const upload = (0, _multer.default)(_upload.default);
const usersController = new _UsersController.default();
const userAvatarController = new _UserAvatarController.default(); // Post http://localhost:3333/appointments
// DTO = Data transfer object
// SOC Sepparation of Concerns. Separação de preocupações
// Rota: Receber requisição, chamar outro arquivo, devolver uma resposta

usersRouter.post('/', usersController.create);
usersRouter.patch('/avatar', _ensureAuthenticated.default, upload.single('avatar'), userAvatarController.update);
var _default = usersRouter;
exports.default = _default;