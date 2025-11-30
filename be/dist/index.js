"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const database_service_1 = __importDefault(require("./services/database.service"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PORT = process.env.PORT || 3000;
const startServer = async () => {
    try {
        await (0, database_service_1.default)();
        app_1.default.listen(PORT, () => {
            console.log(`Server successfully running  on port ${PORT}`);
            console.log(`API available at: http://localhost:${PORT}`);
            console.log(`Projects API: http://localhost:${PORT}/api/projects`);
        });
    }
    catch (error) {
        console.error('Server start nahi kar paya:', error);
        process.exit(1);
    }
};
startServer();
//# sourceMappingURL=index.js.map