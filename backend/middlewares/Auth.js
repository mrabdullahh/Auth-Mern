const jwt = require("jsonwebtoken");

const ensureAuthenticated = (req, res, next) => {
  const auth = req.headers["authorization"];
  if (!auth) {
    return res.status(403).json({
      message: "Unauthorize, jwt token is require",
    });
  }
  try {
    const decoded = jwt.verify(auth, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    // console.log(error);
    res
      .status(401)
      .json({ message: "Unauthorized, jwt token is expire or expire" });
  }
};

module.exports = ensureAuthenticated;
