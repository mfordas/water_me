import jwt from 'jsonwebtoken';
import express from 'express';

import verify from '../Utils/googleAuth.js';

const router = express.Router();

const verifyExternalUser = async (req) => {
  return await verify(req.body);
};

const checkIfUserIsInDatabase = async (res, user) => {
  const checkedUser = await res.locals.models.User.findOne({
    where: {
      googleId: user.sub,
    },
  });
  return checkedUser;
};

const createToken = (user) => {
  const { id, googleId, name } = user.dataValues;
  return jwt.sign(
    {
      id: id,
      googleId: googleId,
      name: name,
    },
    process.env.JWTPRIVATEKEY
  );
};

const authorizeExternalUser = async (req, res) => {
  const verificationResult = await verifyExternalUser(req);

  if (verificationResult instanceof Error)
    return res.status(400).send(console.error(verificationResult));

  const user = await checkIfUserIsInDatabase(res, verificationResult);

  if (!user) {
    return res.status(404).send('User not found, register first');
  }

  const iss =
    verificationResult.iss === 'https//accounts.google.com'
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
    res.status(401).send('Stop doing that you dumbass');
  }
};

router.post('/', authorizeExternalUser);

export default router;
