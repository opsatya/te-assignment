"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const project_routes_1 = __importDefault(require("./routes/project.routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.json({
        message: 'Project Management API is running!',
        status: 'OK'
    });
});
app.use('/api/projects', project_routes_1.default);
app.use((req, res) => {
    res.status(404).json({
        error: 'Route not found',
        message: `Yeh route exist nahi karta: ${req.method} ${req.path}`
    });
});
app.use((err, req, res, next) => {
    console.error('Error aaya:', err);
    res.status(500).json({
        error: 'Internal server error',
        message: 'Kuch galat ho gaya, baad mein try karo'
    });
});
exports.default = app;
//# sourceMappingURL=app.js.map