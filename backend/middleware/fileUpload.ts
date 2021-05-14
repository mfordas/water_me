import multer from 'multer';

export const fileUpload = multer({
    limits: {
        fileSize: 10000000,
    }
});
