"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sharp_1 = __importDefault(require("sharp"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// Usable if you want to pass the file path into the CLI command instead of hardcoding it into the JSON file
// export const customArg = process.argv.slice(2);
// console.log(customArg[0])
const data = fs_1.default.readFileSync(path_1.default.join(`resize.json`), 'utf8');
const parsedData = JSON.parse(data);
const imgPath = parsedData.imagePath; //"sample.jpg"
const folderPath = parsedData.outputPath;
const resize = (imgSize, platform) => {
    (0, sharp_1.default)(imgPath)
        .resize(imgSize)
        .toFile(`${folderPath}/${platform}/sample_${imgSize}.jpg`, function (err) {
    });
};
if (!fs_1.default.existsSync(folderPath)) {
    fs_1.default.mkdirSync(folderPath);
}
try {
    const platforms = parsedData.settings;
    Object.keys(platforms).forEach(platform => {
        if (!fs_1.default.existsSync(`${folderPath}/${platform}`)) {
            fs_1.default.mkdirSync(`${folderPath}/${platform}`);
            //Only if you want platform specific folders
        }
        const platformSizes = platforms[platform];
        platformSizes.forEach(size => {
            resize(size, platform);
        });
    });
    console.log(`Resizer has loaded images here: ${folderPath} `);
}
catch (err) {
    console.error(err);
}
