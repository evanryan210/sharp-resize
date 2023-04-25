"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sharp_1 = __importDefault(require("sharp"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
console.log('test');
const customArg = process.argv.slice(2);
console.log(customArg[0]);
// const data = fs.readFileSync(path.join(`${customArg[0]}`), 'utf8');
const data = fs_1.default.readFileSync(path_1.default.join(`resize.json`), 'utf8');
console.log(data);
const parsedData = JSON.parse(data);
const imgPath = parsedData.imagePath;
const folderPath = parsedData.outputPath;
console.log(imgPath);
const resize = (imgSize, platform) => {
    console.log('resize is running');
    (0, sharp_1.default)(imgPath)
        .resize(imgSize)
        .toFile(`${folderPath}/${platform}/logo_${imgSize}.jpg`, function (err) {
        //console.error(err)
        // output.jpg is a X wide pixel high image
        // containing a scaled and cropped version of input.jpg
    });
    console.log('resize has finished');
};
if (!fs_1.default.existsSync(folderPath)) {
    fs_1.default.mkdirSync(folderPath);
}
try {
    //console.log(parsedData)
    const platforms = parsedData.settings;
    Object.keys(platforms).forEach(platform => {
        if (!fs_1.default.existsSync(`${folderPath}/${platform}`)) {
            fs_1.default.mkdirSync(`${folderPath}/${platform}`);
        }
        const platformSizes = platforms[platform];
        platformSizes.forEach(size => {
            resize(size, platform);
        });
    });
}
catch (err) {
    console.error(err);
}
