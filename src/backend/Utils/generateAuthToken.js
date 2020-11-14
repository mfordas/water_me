import jwt from "jsonwebtoken";

const generateAuthToken = function () {
    const token = jwt.sign({
        _id: this._id,
        isAdmin: this.isAdmin
      },
      process.env.JWTPRIVATEKEY
    );
    return token;
  };

  export default generateAuthToken;