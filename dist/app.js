"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const auth_route_1 = __importDefault(require("./modules/auth/auth.route"));
const parcel_route_1 = __importDefault(require("./modules/parcel/parcel.route"));
const admin_route_1 = __importDefault(require("./modules/admin/admin.route"));
const user_route_1 = __importDefault(require("./modules/user/user.route"));
const error_middleware_1 = require("./modules/common/middleware/error.middleware");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use('/api/auth', auth_route_1.default);
app.use('/api/parcels', parcel_route_1.default);
app.use('/api/admin', admin_route_1.default);
app.use('/api/users', user_route_1.default);
app.get('/', (req, res) => {
    res.json({ message: 'Parcel Delivery API is running 🚀' });
});
app.use(error_middleware_1.errorMiddleware);
exports.default = app;
