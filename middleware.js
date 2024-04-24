import jwt from "jsonwebtoken";

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, "random_secret", (err, decoded) => {
      if (err) {
        return res.status(403).json({ error: "Failed to authenticate token" });
      }
      // req.user = decoded;
      req.id = decoded.id;
      next();
    });
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
};

const authenticateWhitoutJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, "random_secret", (err, decoded) => {
      if (err) {
        return res.status(403).json({ error: "Failed to authenticate token" });
      }
      // req.user = decoded;
      req.id = decoded.id;
      next();
    });
  } else {
    next();
    // res.status(401).json({ error: "Unauthorized" });
  }
};

export { authenticateJWT, authenticateWhitoutJWT };
