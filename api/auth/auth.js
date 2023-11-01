require("dotenv").config();
const jwt = require("jsonwebtoken");

const authenticateJwt = (req, res, next) => {
  const authHeader = req?.headers?.authorization;
  
  if (authHeader == null) return res.sendStatus(401);

  jwt.verify(authHeader, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.sendStatus(403);
    }
    console.log("User successfully verified", user);
    req.user = user;
    next();
  });
};

module.exports = authenticateJwt;
