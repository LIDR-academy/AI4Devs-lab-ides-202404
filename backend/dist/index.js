"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var candidates_1 = __importDefault(require("./routes/candidates"));
dotenv_1.default.config();
exports.app = (0, express_1.default)();
var port = process.env.PORT || 3010;
exports.app.use(express_1.default.json());
exports.app.use('/candidates', candidates_1.default);
exports.app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.type('text/plain');
    res.status(500).send('Something broke!');
});
exports.app.listen(port, function () {
    console.log("Server is running at http://localhost:".concat(port));
});
