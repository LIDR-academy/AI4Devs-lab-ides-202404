"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var db_1 = require("../db");
var router = (0, express_1.Router)();
// Get all documents
router.get('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, error_1, message;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, db_1.pool.query('SELECT * FROM Documents')];
            case 1:
                result = _a.sent();
                res.status(200).json(result.rows);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                message = (error_1 instanceof Error) ? error_1.message : 'Unknown error';
                res.status(500).json({ error: message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Get a single document
router.get('/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, result, error_2, message;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, db_1.pool.query('SELECT * FROM Documents WHERE document_id = $1', [id])];
            case 2:
                result = _a.sent();
                if (result.rows.length > 0) {
                    res.status(200).json(result.rows[0]);
                }
                else {
                    res.status(404).send('Document not found');
                }
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                message = (error_2 instanceof Error) ? error_2.message : 'Unknown error';
                res.status(500).json({ error: message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// Create a new document
router.post('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, candidateId, type, fileUrl, result, error_3, message;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, candidateId = _a.candidateId, type = _a.type, fileUrl = _a.fileUrl;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, db_1.pool.query('INSERT INTO Documents (candidate_id, type, file_url) VALUES ($1, $2, $3) RETURNING *', [candidateId, type, fileUrl])];
            case 2:
                result = _b.sent();
                res.status(201).json(result.rows[0]);
                return [3 /*break*/, 4];
            case 3:
                error_3 = _b.sent();
                message = (error_3 instanceof Error) ? error_3.message : 'Unknown error';
                res.status(500).json({ error: message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// Update a document
router.put('/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, type, fileUrl, result, error_4, message;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = req.params.id;
                _a = req.body, type = _a.type, fileUrl = _a.fileUrl;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, db_1.pool.query('UPDATE Documents SET type = $1, file_url = $2 WHERE document_id = $3 RETURNING *', [type, fileUrl, id])];
            case 2:
                result = _b.sent();
                if (result.rows.length > 0) {
                    res.status(200).json(result.rows[0]);
                }
                else {
                    res.status(404).send('Document not found');
                }
                return [3 /*break*/, 4];
            case 3:
                error_4 = _b.sent();
                message = (error_4 instanceof Error) ? error_4.message : 'Unknown error';
                res.status(500).json({ error: message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// Delete a document
router.delete('/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, result, error_5, message;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, db_1.pool.query('DELETE FROM Documents WHERE document_id = $1 RETURNING *', [id])];
            case 2:
                result = _a.sent();
                if (result.rows.length > 0) {
                    res.status(200).json({ message: 'Document deleted' });
                }
                else {
                    res.status(404).send('Document not found');
                }
                return [3 /*break*/, 4];
            case 3:
                error_5 = _a.sent();
                message = (error_5 instanceof Error) ? error_5.message : 'Unknown error';
                res.status(500).json({ error: message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
exports.default = router;
