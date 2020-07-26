import 'reflect-metadata';

import CreateUserService from './CreateUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'
import AppError from '@shared/errors/AppError';
describe('CreateAppointment', () => {

  it('should be able to create a new user', async () => {
    const fakeAppointmentsRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUserService = new CreateUserService(fakeAppointmentsRepository, fakeHashProvider);
    const user = await createUserService.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });
    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user', async () => {
    const fakeAppointmentsRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUserService = new CreateUserService(fakeAppointmentsRepository, fakeHashProvider);
    await createUserService.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });
    await expect(
      createUserService.execute({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });


});
