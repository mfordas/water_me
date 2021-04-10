import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface IBodyRequestForAuthComp extends Request {
  user: Object;
}

const auth = (req: Request, res: Response, next: NextFunction): void => {
  const requestWithType = req as IBodyRequestForAuthComp;
  const token = req.header('x-auth-token');

  if (!token) res.status(401).send('Access denied. No token provided.');

  if (token && process.env.JWTPRIVATEKEY) {
    try {
      const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
      requestWithType.user = decoded;
      next();
    } catch (ex) {
      res.status(400).send('Invalid token.');
    }
  }
};

export default auth;
