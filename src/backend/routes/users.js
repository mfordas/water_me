import express from 'express';

import verify from '../Utils/googleAuth.js';

const router = express.Router();

const getAllUsersFromDB = async (req, res) => {
    try {
        const usersList = await res.locals.models.User.findAll();

        res.send(usersList);
    } catch (err) {
        console.log(err);
    }
};

router.get('/', getAllUsersFromDB);

const addUserToDB = async (req, res) => {
    const User = await res.locals.models.User;

    console.log(req.body);

    const userData = req.body;

    try {

        const user = await User.create(userData);

        res.status(200).send(user)

    } catch (err) {

        console.log(err);
    }
};

router.post('/', addUserToDB);

const registerNewGoogleUser = async (req, res) => {
    const User = await res.locals.models.User;

    const verificationResult = await verify(req.body);

    console.log(verificationResult);
  
    if (verificationResult instanceof Error) return res.status(401).send(console.error(verificationResult));
  
    let user = await res.locals.models.User.findOne( { where: {
      email: verificationResult.email
    }});
  
    if (user) return res.status(400).send('User already registered');
  
    const newUser = {
        name: verificationResult.name,
        email: verificationResult.email,
        external_id: verificationResult.sub,
      };
      
      if (newUser) return res.status(400).send("errorrrrr");
      
      user = await User.create(newUser);
  
      const token = user.generateAuthToken();
  
      return res
        .header("x-auth-token", token)
        .send(user);
  };
  
  router.post("/googleUser", registerNewGoogleUser);

export default router;