import { UserModel } from './user.model';
import { IUser } from './user.interface';
import { hashPassword } from '../common/utils/bcrypt';

export const UserService = {
  async createUser(userData: IUser) {
    const hash = await hashPassword(userData.password);
    const user = await UserModel.create({ ...userData, password: hash });
    return user;
  },

  async findUserByEmail(email: string) {
    return UserModel.findOne({ email });
  },

  async findUserById(id: string) {
    return UserModel.findById(id);
  },

  async getAllUsers() {
    return UserModel.find();
  },

  async blockUser(id: string) {
    return UserModel.findByIdAndUpdate(id, { isBlocked: true }, { new: true });
  },

  async unblockUser(id: string) {
    return UserModel.findByIdAndUpdate(id, { isBlocked: false }, { new: true });
  }
};