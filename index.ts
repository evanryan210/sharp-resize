import sharp from 'sharp';
import fs from 'fs';
import path from 'path'
import { platform } from 'os';
console.log('test')
const customArg = process.argv.slice(2);
console.log(customArg[0])

// const data = fs.readFileSync(path.join(`${customArg[0]}`), 'utf8');
const data = fs.readFileSync(path.join(`resize.json`), 'utf8');

console.log(data)
const parsedData: PlatformData = JSON.parse(data);
const imgPath = parsedData.imagePath
const folderPath = parsedData.outputPath
console.log(imgPath)

const resize = (imgSize: number, platform: string) =>{
    console.log('resize is running')
    sharp(imgPath)
        .resize(imgSize)
        .toFile(`${folderPath}/${platform}/logo_${imgSize}.jpg`, function (err) {
            //console.error(err)
            // output.jpg is a X wide pixel high image
            // containing a scaled and cropped version of input.jpg
        });
    console.log('resize has finished')
}
interface PlatformData {
    imagePath: string,
    outputPath: string,
    settings: Record<string, number[]>
  }

if(!fs.existsSync(folderPath)){
    fs.mkdirSync(folderPath)
}
try {
    //console.log(parsedData)

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

  } catch (err) {
    console.error(err);
  }