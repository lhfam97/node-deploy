import { hash } from 'bcryptjs';
import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';

interface Request {
  name: string;
  email: string;
  password: string;
}
@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}
  // eslint-disable-next-line class-methods-use-this
  public async execute({ name, email, password }: Request): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);
    if (checkUserExists) {
      throw new AppError('Email address already used');
    } else {
      const hashedPassword = await hash(password, 8);
      const user = await this.usersRepository.create({
        name,
        email,
        password: hashedPassword,
      });
      await this.usersRepository.save(user);
      delete user.password;
      return user;
    }
  }
}

export default CreateUserService;
