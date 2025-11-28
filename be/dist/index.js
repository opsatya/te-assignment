"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const database_service_1 = __importDefault(require("./services/database.service"));
const dotenv_1 = __importDefault(require("dotenv"));
// Environment variables ko load kiya - .env file se sab config aayega
dotenv_1.default.config();
// Port number - environment se lelo ya default 3000 use karo
const PORT = process.env.PORT || 3000;
// Server start karne se pehle database connect karo
const startServer = async () => {
    try {
        // MongoDB connection establish karo
        await (0, database_service_1.default)();
        // Server ko start karo aur listen karo
        app_1.default.listen(PORT, () => {
            console.log(`✅ Server successfully running hai on port ${PORT}`);
            console.log(`🌐 API available at: http://localhost:${PORT}`);
            console.log(`📡 Projects API: http://localhost:${PORT}/api/projects`);
        });
    }
    catch (error) {
        // Agar database connect nahi hua ya koi error aaya
        console.error('❌ Server start nahi kar paya:', error);
        process.exit(1); // Process ko exit karo agar error aaya
    }
};
// Server ko start karo
startServer();
//# sourceMappingURL=index.js.map