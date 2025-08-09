const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  let secret = process.env.SECRET_TOKEN;

  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    console.log("No token provided");
    const url = req.originalUrl;
    console.log("URL:", url);
    return res.sendStatus(401);
  }
  jwt.verify(token, secret, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    } else {
      req.user = user.user;
      req.token = token; 
      next();
    }
  });
};

const verifyAdmin = (req, res, next) => {
  if (req.user.group_id != 3) {
    return res
      .status(403)
      .json({ message: "Unauthorized to access admin routes" });
  }
  next();
};

module.exports = { verifyToken, verifyAdmin };
