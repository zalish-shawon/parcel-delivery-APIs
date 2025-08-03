"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const database_1 = require("./database");
const config_1 = require("./config");
(0, database_1.connectDB)().then(() => {
    app_1.default.listen(config_1.config.port, () => {
        console.log(`Server running on port ${config_1.config.port}`);
    });
});
