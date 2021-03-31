import jwt from 'jsonwebtoken';
import { TypeUser } from '../models/User';

const generateAuthToken = (user: TypeUser): void | string => {
  if (process.env.JWTPRIVATEKEY) {
    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWTPRIVATEKEY
    );
    return token;
  } else {
    console.error('No private token provided in env variables');
  }
};

export default generateAuthToken;
