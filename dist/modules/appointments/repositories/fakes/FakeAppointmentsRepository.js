"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _uuidv = require("uuidv4");

var _dateFns = require("date-fns");

var _Appointments = _interopRequireDefault(require("../../infra/typeorm/entities/Appointments"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { isEqual } from 'date-fns';
class AppointmentsRepository {
  constructor() {
    this.appointments = [];
  }

  async findByDate(date) {
    const findAppointment = this.appointments.find(appointment => (0, _dateFns.isEqual)(appointment.date, date));
    return findAppointment;
  }

  async create({
    provider_id,
    date
  }) {
    const appointment = new _Appointments.default();
    Object.assign(appointment, {
      id: (0, _uuidv.uuid)(),
      provider_id,
      date
    }); // appointment.id = uuid();
    // appointment.provider_id = provider_id;
    // appointment.date = date;

    this.appointments.push(appointment);
    return appointment;
  }

}

var _default = AppointmentsRepository;
exports.default = _default;