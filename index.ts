import sharp from 'sharp';
import fs from 'fs';
import path from 'path'
import { platform } from 'os';

interface PlatformData {
    imagePath: string,
    outputPath: string,
    settings: Record<string, number[]>
}
// Usable if you want to pass the file path into the CLI command instead of hardcoding it into the JSON file
// export const customArg = process.argv.slice(2);
// console.log(customArg[0])

const data = fs.readFileSync(path.join(`resize.json`), 'utf8');

// console.log(data)
const parsedData: PlatformData = JSON.parse(data);
const imgPath = parsedData.imagePath
const folderPath = parsedData.outputPath

const resize = (imgSize: number, platform: string) =>{
    sharp(imgPath)
        .resize(imgSize)
        .toFile(`${folderPath}/${platform}/logo_${imgSize}.jpg`, function (err) {
            //console.error(err)
            // output.jpg is a X wide pixel high image
            // containing a scaled and cropped version of input.jpg
        });
}


if (!fs.existsSync(folderPath)){
    fs.mkdirSync(folderPath)
}
try {
    console.log(parsedData)

    const platforms = parsedData.settings
    Object.keys(platforms).forEach(platform => {
        if (!fs.existsSync(`${folderPath}/${platform}`)) {
            fs.mkdirSync(`${folderPath}/${platform}`)
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