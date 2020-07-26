import 'reflect-metadata';

import CreateUserService from './CreateUserService';
import AuthenticateUserService from './AuthenticateUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'
import AppError from '@shared/errors/AppError';
describe('Authenticate User', () => {

  it('should be able to authenticate', async () => {
    const fakeAppointmentsRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(fakeAppointmentsRepository, fakeHashProvider);
    const authenticateUser = new AuthenticateUserService(fakeAppointmentsRepository, fakeHashProvider);
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const authenticate = await authenticateUser.execute({
      email: 'johndoe@example.com',
      password: '123456',
    })
    expect(authenticate).toHaveProperty('token');
    expect(authenticate.user).toEqual(user);
  });


  it('should not be able to authenticate with a non existing user', async () => {
    const fakeAppointmentsRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const authenticateUser = new AuthenticateUserService(fakeAppointmentsRepository, fakeHashProvider);

    expect(authenticateUser.execute({
      email: 'johndoe@example.com',
      password: '123456',
    }),
    ).rejects.toBeInstanceOf(AppError)
  });


  it('should not be able to authenticate with a existing user and wrong passworf', async () => {
    const fakeAppointmentsRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const authenticateUser = new AuthenticateUserService(fakeAppointmentsRepository, fakeHashProvider);
    const createUser = new CreateUserService(fakeAppointmentsRepository, fakeHashProvider);
    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await expect(authenticateUser.execute({
      email: 'johndoe@example.com',
      password: '1234567',
    })).rejects.toBeInstanceOf(AppError)
  });

});
