"use strict";

var _tsyringe = require("tsyringe");

require("../../modules/users/providers");

var _AppointmentsRepository = _interopRequireDefault(require("../../modules/appointments/infra/typeorm/repositories/AppointmentsRepository"));

var _UserRepository = _interopRequireDefault(require("../../modules/users/infra/typeorm/repositories/UserRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_tsyringe.container.registerSingleton('AppointmentsRepository', _AppointmentsRepository.default);

_tsyringe.container.registerSingleton('UsersRepository', _UserRepository.default);