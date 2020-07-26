"use strict";

require("reflect-metadata");

var _CreateUserService = _interopRequireDefault(require("./CreateUserService"));

var _AuthenticateUserService = _interopRequireDefault(require("./AuthenticateUserService"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _FakeHashProvider = _interopRequireDefault(require("../providers/HashProvider/fakes/FakeHashProvider"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Authenticate User', () => {
  it('should be able to authenticate', async () => {
    const fakeAppointmentsRepository = new _FakeUsersRepository.default();
    const fakeHashProvider = new _FakeHashProvider.default();
    const createUser = new _CreateUserService.default(fakeAppointmentsRepository, fakeHashProvider);
    const authenticateUser = new _AuthenticateUserService.default(fakeAppointmentsRepository, fakeHashProvider);
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    });
    const authenticate = await authenticateUser.execute({
      email: 'johndoe@example.com',
      password: '123456'
    });
    expect(authenticate).toHaveProperty('token');
    expect(authenticate.user).toEqual(user);
  });
  it('should not be able to authenticate with a non existing user', async () => {
    const fakeAppointmentsRepository = new _FakeUsersRepository.default();
    const fakeHashProvider = new _FakeHashProvider.default();
    const authenticateUser = new _AuthenticateUserService.default(fakeAppointmentsRepository, fakeHashProvider);
    expect(authenticateUser.execute({
      email: 'johndoe@example.com',
      password: '123456'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to authenticate with a existing user and wrong passworf', async () => {
    const fakeAppointmentsRepository = new _FakeUsersRepository.default();
    const fakeHashProvider = new _FakeHashProvider.default();
    const authenticateUser = new _AuthenticateUserService.default(fakeAppointmentsRepository, fakeHashProvider);
    const createUser = new _CreateUserService.default(fakeAppointmentsRepository, fakeHashProvider);
    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    });
    await expect(authenticateUser.execute({
      email: 'johndoe@example.com',
      password: '1234567'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});