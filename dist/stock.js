"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateStock = void 0;
const fs = __importStar(require("fs"));
const xml2js = __importStar(require("xml2js"));
function calculateMilk(ageInDays) {
    return Math.max(0, 50 - ageInDays * 0.03);
}
function canShaveYak(ageInDays, day) {
    const shaveFrequency = 8 + ageInDays * 0.01;
    const num = day / shaveFrequency;
    return num >= 1 ? true : false;
}
function readYakDataFromFile(filename) {
    return new Promise((resolve, reject) => {
        const xml = fs.readFileSync(filename, 'utf-8');
        xml2js.parseString(xml, (err, result) => {
            if (err) {
                reject(err);
            }
            else {
                const herd = {
                    labyak: result.herd.labyak.map((yak) => ({
                        name: yak.$.name,
                        age: parseFloat(yak.$.age) * 100,
                        sex: yak.$.sex,
                    })),
                };
                resolve(herd);
            }
        });
    });
}
function calculateCumulativeStock(herd, elapsedTime) {
    let totalMilk = 0;
    let totalWool = 3;
    console.log('In Stock:');
    for (let day = 0; day < elapsedTime; day++) {
        herd.labyak.forEach((yak) => {
            const milk = calculateMilk(yak.age);
            totalMilk += milk;
            if (canShaveYak(yak.age, day)) {
                console.log(`${yak.name}-${yak.age}-day-${day}`);
                totalWool += 1;
            }
            yak.age += 1;
        });
        console.log(`    Day ${day + 1}: ${totalMilk.toFixed(3)} liters of milk`);
    }
    console.log(`    Total Wool: ${totalWool} skins`);
    console.log('Herd:');
    herd.labyak.forEach((yak) => {
        console.log(`    ${yak.name} ${(yak.age / 100).toFixed(2)} years old`);
    });
}
function calculateStock() {
    return __awaiter(this, void 0, void 0, function* () {
        const filename = 'src/herd.xml';
        const elapsedTime = 13; // Change this to the desired elapsed time
        try {
            const herd = yield readYakDataFromFile(filename);
            calculateCumulativeStock(herd, elapsedTime);
        }
        catch (error) {
            console.error('Error reading XML file:', error);
        }
    });
}
exports.calculateStock = calculateStock;
