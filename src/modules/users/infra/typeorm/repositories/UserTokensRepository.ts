// import { isEqual } from 'date-fns';
import { EntityRepository, Repository, getRepository } from 'typeorm';
import UserToken from '../entities/UserToken';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

@EntityRepository(User)
class UserTokensRepository implements IUserTokensRepository {
  private ormRepository: Repository<UserToken>;
  constructor() {
    this.ormRepository = getRepository(UserToken);
  }
  public async findByToken(token: string): Promise<UserToken | undefined>{
    const userToken = this.ormRepository.findOne({
      where: { token }
    })
    return userToken;
  }
  public async generate(){

  }


}
export default UserTokensRepository;
