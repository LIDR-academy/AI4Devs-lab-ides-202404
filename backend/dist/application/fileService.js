"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var multer_1 = __importDefault(require("multer"));
var path_1 = __importDefault(require("path"));
var FileService = /** @class */ (function () {
    function FileService() {
        var storage = multer_1.default.diskStorage({
            destination: function (req, file, cb) {
                cb(null, 'uploads/');
            },
            filename: function (req, file, cb) {
                cb(null, file.fieldname + '-' + Date.now() + path_1.default.extname(file.originalname));
            }
        });
        this.upload = (0, multer_1.default)({ storage: storage });
    }
    FileService.prototype.getUploadMiddleware = function () {
        return this.upload.single('resume');
    };
    return FileService;
}());
exports.default = new FileService();
