"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _AppointmentController = _interopRequireDefault(require("../controllers/AppointmentController"));

var _ensureAuthenticated = _interopRequireDefault(require("../../../../users/infra/http/middlewares/ensureAuthenticated"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const appointmentsRouter = (0, _express.Router)();
const appointmentController = new _AppointmentController.default();
appointmentsRouter.use(_ensureAuthenticated.default); // Post http://localhost:3333/appointments
// DTO = Data transfer object
// SOC Sepparation of Concerns. Separação de preocupações
// Rota: Receber requisição, chamar outro arquivo, devolver uma resposta
// appointmentsRouter.get('/', async (request, response) => {
//   const appointments = await appointmentsRepository.find();
//   return response.json(appointments);
// });

appointmentsRouter.post('/', appointmentController.create);
var _default = appointmentsRouter;
exports.default = _default;