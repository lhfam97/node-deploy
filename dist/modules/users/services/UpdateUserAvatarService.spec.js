"use strict";

require("reflect-metadata");

var _UpdateUserAvatarService = _interopRequireDefault(require("./UpdateUserAvatarService"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _FakeStorageProvider = _interopRequireDefault(require("../../../shared/container/providers/StorageProvider/fakes/FakeStorageProvider"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('UpdateUserAvatar', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new _FakeUsersRepository.default();
    const fakeStorageProvider = new _FakeStorageProvider.default();
    const updateAvatarService = new _UpdateUserAvatarService.default(fakeUsersRepository, fakeStorageProvider);
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    });
    await updateAvatarService.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg'
    });
    expect(user.avatar).toBe('avatar.jpg');
  });
  it('should not be able to update avatar from non existing user', async () => {
    const fakeUsersRepository = new _FakeUsersRepository.default();
    const fakeStorageProvider = new _FakeStorageProvider.default();
    const updateAvatarService = new _UpdateUserAvatarService.default(fakeUsersRepository, fakeStorageProvider);
    await expect(updateAvatarService.execute({
      user_id: 'non-existing-user',
      avatarFilename: 'avatar.jpg'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});
it('should delete old avatar when updating to a new one', async () => {
  const fakeUsersRepository = new _FakeUsersRepository.default();
  const fakeStorageProvider = new _FakeStorageProvider.default();
  const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');
  const updateAvatarService = new _UpdateUserAvatarService.default(fakeUsersRepository, fakeStorageProvider);
  const user = await fakeUsersRepository.create({
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: '123456'
  });
  await updateAvatarService.execute({
    user_id: user.id,
    avatarFilename: 'avatar.jpg'
  }); //spy - espionar

  await updateAvatarService.execute({
    user_id: user.id,
    avatarFilename: 'avatar2.jpg'
  });
  expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
  expect(user.avatar).toBe('avatar2.jpg');
});