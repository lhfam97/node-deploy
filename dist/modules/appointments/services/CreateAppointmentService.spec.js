"use strict";

require("reflect-metadata");

var _CreateAppointmentService = _interopRequireDefault(require("./CreateAppointmentService"));

var _FakeAppointmentsRepository = _interopRequireDefault(require("../repositories/fakes/FakeAppointmentsRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new _FakeAppointmentsRepository.default();
    const createAppointmentService = new _CreateAppointmentService.default(fakeAppointmentsRepository);
    const appointment = await createAppointmentService.execute({
      date: new Date(),
      provider_id: '123123123'
    });
    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123123123');
  });
  it('should not be able to create two appointments on the same time', async () => {
    const fakeAppointmentsRepository = new _FakeAppointmentsRepository.default();
    const createAppointmentService = new _CreateAppointmentService.default(fakeAppointmentsRepository);
    const appointmentDate = new Date(2020, 4, 20, 11);
    await createAppointmentService.execute({
      date: appointmentDate,
      provider_id: '123123123'
    });
    await expect(createAppointmentService.execute({
      date: appointmentDate,
      provider_id: '123123123'
    })).rejects.toBeInstanceOf(Error);
  });
});