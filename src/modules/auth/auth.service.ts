import { UserModel } from '../user/user.model';
import { hashPassword, comparePassword } from '../common/utils/bcrypt';
import { generateToken } from '../common/utils/jwt';

export const AuthService = {
  async register(name: string, email: string, password: string, role: string) {
    const hash = await hashPassword(password);
    const user = await UserModel.create({ name, email, password: hash, role });
    return user;
  },
  async login(email: string, password: string) {
    const user = await UserModel.findOne({ email });
    if (!user) throw new Error('User not found');
    if (user.isBlocked) throw new Error('User is blocked');

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) throw new Error('Invalid credentials');

    const token = generateToken({ id: user._id, role: user.role });
    return { token, user };
  }
};