"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors")); // Importa cors
var candidateRoutes_1 = __importDefault(require("./routes/candidateRoutes"));
var app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: 'http://localhost:3000' })); // Usa el middleware cors con origen específico
app.use(express_1.default.json()); // Middleware para parsear JSON
app.use('/api', candidateRoutes_1.default); // Usar las rutas de candidatos
var port = 3010;
app.listen(port, function () {
    console.log("Server running on http://localhost:".concat(port));
});
