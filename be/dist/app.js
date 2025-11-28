"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const project_routes_1 = __importDefault(require("./routes/project.routes"));
// Express app banaya - yeh main application hai
const app = (0, express_1.default)();
// CORS enable kiya - frontend se requests allow karne ke liye
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173', // Frontend ka URL yahan se aayega
    credentials: true // Cookies aur credentials allow karne ke liye
}));
// JSON body parser - request body ko JSON mein parse karne ke liye
app.use(express_1.default.json());
// URL encoded data ko parse karne ke liye (form data ke liye)
app.use(express_1.default.urlencoded({ extended: true }));
// Health check endpoint - server running hai ya nahi check karne ke liye
app.get('/', (req, res) => {
    res.json({
        message: 'Project Management API is running!',
        status: 'OK'
    });
});
// Project routes ko mount kiya - /api/projects se sab routes available honge
app.use('/api/projects', project_routes_1.default);
// 404 handler - agar koi route nahi mila toh yeh chalega
app.use((req, res) => {
    res.status(404).json({
        error: 'Route not found',
        message: `Yeh route exist nahi karta: ${req.method} ${req.path}`
    });
});
// Global error handler - koi bhi error aaye toh yahan handle hoga
app.use((err, req, res, next) => {
    console.error('Error aaya:', err);
    res.status(500).json({
        error: 'Internal server error',
        message: 'Kuch galat ho gaya, baad mein try karo'
    });
});
exports.default = app;
//# sourceMappingURL=app.js.map