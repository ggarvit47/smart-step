const jwt = require("jsonwebtoken");
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      console.log(err, "err");
      return res.sendStatus(403);
    }

    //req.user = user;
    req.userId = decoded.userId;

    next();
  });
};

module.exports = { authenticateToken };
