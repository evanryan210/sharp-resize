import sharp from 'sharp';
import fs from 'fs';
import path from 'path'
import { platform } from 'os';

type PlatformData = {
    imagePath: string,
    outputPath: string,
    settings: Record<string, number[]>
}

// Usable if you want to pass the file path into the CLI command instead of hardcoding it into the JSON file
// export const customArg = process.argv.slice(2);
// console.log(customArg[0])

const data = fs.readFileSync(path.join(`resize.json`), 'utf8');
const parsedData: PlatformData = JSON.parse(data);
const imgPath = parsedData.imagePath //"sample.jpg"
const folderPath = parsedData.outputPath

const resize = (imgSize: number, platform: string) =>{
    sharp(imgPath)
        .resize(imgSize)
        .toFile(`${folderPath}/${platform}/sample_${imgSize}.jpg`, function (err) {
        });
}


if (!fs.existsSync(folderPath)){
    fs.mkdirSync(folderPath)
}
try {
    const platforms = parsedData.settings
    Object.keys(platforms).forEach(platform => {
        if (!fs.existsSync(`${folderPath}/${platform}`)) {
            fs.mkdirSync(`${folderPath}/${platform}`)
            //Only if you want platform specific folders
        }
        const platformSizes = platforms[platform]
        platformSizes.forEach(size => {
            resize(size, platform)
        })
    })
    console.log(`Resizer has loaded images here: ${folderPath} `)
} catch (err) {
    console.error(err);
}