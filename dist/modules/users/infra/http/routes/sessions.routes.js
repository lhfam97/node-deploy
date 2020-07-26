"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _SessionsController = _interopRequireDefault(require("../controllers/SessionsController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const sessionsRouter = (0, _express.Router)();
const sessionsController = new _SessionsController.default(); // Post http://localhost:3333/appointments
// DTO = Data transfer object
// SOC Sepparation of Concerns. Separação de preocupações
// Rota: Receber requisição, chamar outro arquivo, devolver uma resposta

sessionsRouter.post('/', sessionsController.create);
var _default = sessionsRouter;
exports.default = _default;