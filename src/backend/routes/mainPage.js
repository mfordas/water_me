import express from 'express';

const router = express.Router();

const showMainPage = (req, res) => {
    res.send('Main page');
}


router.get('/', showMainPage);

export default router;