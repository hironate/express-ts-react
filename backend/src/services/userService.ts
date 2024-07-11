import { CreateUserType, UserType } from '../models/user';
import { IUserRepository } from '../repositories/userRepository';

interface IUserService {
  getUserById(id: string): Promise<UserType | null>;
  createUser(user: CreateUserType): Promise<UserType>;
}

export class UserService implements IUserService {
  constructor(private userRepository: IUserRepository) {}

  getUserById(id: string): Promise<UserType | null> {
    return this.userRepository.getUserById(id);
  }

  createUser(user: CreateUserType): Promise<UserType> {
    return this.userRepository.createUser(user);
  }
}
