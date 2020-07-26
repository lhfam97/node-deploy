"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Appointments = _interopRequireDefault(require("../entities/Appointments"));

var _dec, _dec2, _dec3, _class, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let AppointmentsRepository = (_dec = (0, _typeorm.EntityRepository)(_Appointments.default), _dec2 = Reflect.metadata("design:type", Function), _dec3 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = (_temp = class AppointmentsRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_Appointments.default);
  } // private appointments: Appointment[];
  // constructor() {
  //   this.appointments = [];
  // }
  // public all(): Appointment[] {
  //   return this.appointments;
  // }


  async findByDate(date) {
    const findAppointment = await this.ormRepository.findOne({
      where: {
        date
      }
    }); // const findAppointment = this.appointments.find(appointment =>
    //   isEqual(date, appointment.date),
    // );

    return findAppointment;
  }

  async create({
    provider_id,
    date
  }) {
    const appointment = this.ormRepository.create({
      provider_id,
      date
    });
    await this.ormRepository.save(appointment);
    return appointment;
  }

}, _temp)) || _class) || _class) || _class);
var _default = AppointmentsRepository;
exports.default = _default;