import jwt from 'jsonwebtoken';

const generateAuthToken =  (user) => {
    const token = jwt.sign({
        id: user.id,
        isAdmin: user.isAdmin
      },
      process.env.JWTPRIVATEKEY
    );
    return token;
  };

  export default generateAuthToken;