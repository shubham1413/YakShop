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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const stock_1 = require("./stock");
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, stock_1.calculateStock)();
    res.send('Welcome to Express & TypeScript Server');
}));
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, stock_1.calculateStock)();
    console.log(`Server is Fire at http://localhost:${port}`);
}));
