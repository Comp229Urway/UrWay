const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, "Secret");
    next();
  } catch (error) {
    res.json({ message: "Auth failed!" });
  }
};