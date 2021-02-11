import multer from 'multer';

const fileUpload = multer({
    limits: {
        fileSize: 10000000,
    }
});

export default fileUpload;