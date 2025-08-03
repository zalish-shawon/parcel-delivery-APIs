import { connectDB } from '../database';
import { hashPassword } from '../modules/common/utils/bcrypt';
import { UserModel } from '../modules/user/user.model';

(async () => {
  await connectDB();
  const existingAdmin = await UserModel.findOne({ role: 'admin' });
  if (!existingAdmin) {
    const password = await hashPassword('Admin@123');
    await UserModel.create({ name: 'Admin', email: 'admin@parcel.com', password, role: 'admin' });
    console.log('Default admin created: admin@parcel.com / Admin@123');
  } else {
    console.log('Admin already exists');
  }
  process.exit();
})();