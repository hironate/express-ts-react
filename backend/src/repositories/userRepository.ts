import { CreateUserType, User, UserType } from '../models/user';

export interface IUserRepository {
  getUserById(id: string): Promise<UserType | null>;
  createUser(user: CreateUserType): Promise<UserType>;
}

export class UserRepository implements IUserRepository {
  async getUserById(id: string): Promise<UserType | null> {
    const user = await User.findById(id);
    if (!user) {
      return null;
    }
    return user.toObject();
  }
  async createUser(user: CreateUserType): Promise<UserType> {
    const newUser = new User(user);
    await newUser.save();
    return newUser.toObject();
  }
}
