"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var express_1 = __importDefault(require("express"));
var client_1 = require("@prisma/client");
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var prisma = new client_1.PrismaClient();
exports.app = (0, express_1.default)();
exports.default = prisma;
var port = 3010;
exports.app.get('/', function (req, res) {
    res.send('Hola LTI!');
});
exports.app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.type('text/plain');
    res.status(500).send('Something broke!');
});
exports.app.listen(port, function () {
    console.log("Server is running at http://localhost:".concat(port));
});
