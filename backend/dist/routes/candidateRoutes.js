"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var client_1 = require("@prisma/client");
var candidateRepository_1 = require("../infrastructure/candidateRepository");
var candidateService_1 = require("../application/candidateService");
var candidateController_1 = require("../presentation/candidateController");
var fileService_1 = __importDefault(require("../application/fileService"));
var router = express_1.default.Router();
var prisma = new client_1.PrismaClient();
var candidateRepository = new candidateRepository_1.CandidateRepository(prisma);
var candidateService = new candidateService_1.CandidateService(candidateRepository);
var candidateController = new candidateController_1.CandidateController(candidateService);
// Ruta para añadir un nuevo candidato
router.post('/candidates', fileService_1.default.getUploadMiddleware(), function (req, res) { return candidateController.addCandidate(req, res); });
// Ruta para verificar el estado de la API
router.get('/', function (req, res) { return candidateController.ping(req, res); });
exports.default = router;
