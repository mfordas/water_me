import multer from 'multer';

const fileUpload = multer({
    limits: {
        fileSize: 4 * 648 * 648,
    }
});

export default fileUpload;