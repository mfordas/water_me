import express, { Request, Response } from 'express';

const router = express.Router();

const showMainPage = (req: Request, res: Response): void => {
  res.send('Main page');
};

router.get('/', showMainPage);

export default router;
