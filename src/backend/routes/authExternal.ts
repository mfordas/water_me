import jwt from 'jsonwebtoken';
import express, { Response, Request } from 'express';
import verify from '../Utils/googleAuth.js';
import { TokenPayload } from 'google-auth-library';
import { TypeUser, User } from '../models/User.js';

type GooglePayload = {
  dataValues: TypeUser;
};

const router = express.Router();

const verifyExternalUser = async (
  req: Request
): Promise<TokenPayload | Error> => {
  return await verify(req.body);
};

const checkIfUserIsInDatabase = async (
  res: Response,
  user: TokenPayload
): Promise<TypeUser | undefined> => {
  const checkedUser = await User.findOne({
    where: {
      googleId: user.sub,
    },
  });

  if (checkedUser) return checkedUser;
};

const createToken = (user: TypeUser): string => {
  const { id, googleId, name } = user;
  if (process.env.JWTPRIVATEKEY) {
    return jwt.sign(
      {
        id: id,
        googleId: googleId,
        name: name,
      },
      process.env.JWTPRIVATEKEY
    );
  } else {
    return 'Error during JWT obtain';
  }
};

const authorizeExternalUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const verificationResult = await verifyExternalUser(req);

  if (verificationResult instanceof Error)
    return res.status(400).send(console.error(verificationResult));

  const user = await checkIfUserIsInDatabase(res, verificationResult);

  if (!user) {
    return res.status(404).send('User not found, register first');
  }

  const iss =
    verificationResult.iss === 'https://accounts.google.com'
      ? verificationResult.iss.split('//')[1]
      : verificationResult.iss;

  if (
    user &&
    verificationResult.aud === process.env.REACT_APP_GOOGLE_AUTH_API_CLIENTID &&
    iss === 'accounts.google.com'
  ) {
    const token = createToken(user);
    return res.header('x-auth-token', token).send(user);
  } else {
    return res.status(401).send('Stop doing that you dumbass');
  }
};

router.post('/', authorizeExternalUser);

export default router;
