"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const createLog = (data) => {
    const folderPath = path_1.default.join(__dirname, process.env.LOGS_FOLDER);
    if (!fs_1.default.existsSync(folderPath)) {
        fs_1.default.mkdirSync(folderPath, { recursive: true });
    }
    const filePath = path_1.default.join(__dirname, process.env.LOGS_FOLDER, 'logs');
    fs_1.default.appendFile(filePath, data + '\n', err => {
        if (err)
            throw err;
    });
};
function logs(format) {
    return (req, _, next) => {
        const data = new Date().toISOString() +
            ' ' +
            req.url +
            ' ' +
            req.method +
            ' ' +
            (format === 'simples'
                ? ''
                : req.httpVersion + ' ' + req.get('User-Agent'));
        try {
            createLog(data);
        }
        catch (err) {
            console.log(err);
        }
        next();
    };
}
exports.default = logs;
