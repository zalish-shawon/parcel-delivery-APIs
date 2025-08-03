"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../database");
const bcrypt_1 = require("../modules/common/utils/bcrypt");
const user_model_1 = require("../modules/user/user.model");
(async () => {
    await (0, database_1.connectDB)();
    const existingAdmin = await user_model_1.UserModel.findOne({ role: 'admin' });
    if (!existingAdmin) {
        const password = await (0, bcrypt_1.hashPassword)('Admin@123');
        await user_model_1.UserModel.create({ name: 'Admin', email: 'admin@parcel.com', password, role: 'admin' });
        console.log('Default admin created: admin@parcel.com / Admin@123');
    }
    else {
        console.log('Admin already exists');
    }
    process.exit();
})();
