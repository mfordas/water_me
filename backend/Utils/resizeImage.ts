import sharp from 'sharp';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export const resizeImage = async (fileBuffer: Buffer, imagesFolder: string) => {
    const fileName = uuidv4();
    const filePath = path.resolve(`${imagesFolder}/${fileName}.png`);

    await sharp(fileBuffer)
        .resize(300, 300, {
            fit: sharp.fit.inside,
            withoutEnlargement: true,
        })
        .toFile(filePath);

    return fileName;
};
