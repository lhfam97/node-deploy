import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUserTokensRepository from '../repositories/IUserTokensRepository';

interface IRequest {
  email: string;
}
@injectable()
class SendForgotPasswordEmail {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private MailProvider: IMailProvider,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
  ) { }
  // eslint-disable-next-line class-methods-use-this
  public async execute({email}: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if(!user){
      throw new AppError('User does not exists.')
    }

    await this.userTokensRepository.generate(user.id)

    this.MailProvider.sendMail(email,'Pedido de recuperação de senha recebido')
  }
}

export default SendForgotPasswordEmail;
