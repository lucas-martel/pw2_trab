"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const validateEnv_1 = __importDefault(require("./utils/validateEnv"));
const morgan_1 = __importDefault(require("morgan"));
const logsOnStore_1 = __importDefault(require("utils/logsOnStore"));
dotenv_1.default.config();
(0, validateEnv_1.default)();
const app = (0, express_1.default)();
app.use((0, morgan_1.default)('combined'));
app.use(logsOnStore_1.default);
app.get('/', (req, res) => {
    res.send('funcionando atualizado no serkcnkasd');
});
app.listen(process.env.PORT, () => {
    console.log('backend api funcionado em:  http://localhost:' + process.env.PORT);
});
