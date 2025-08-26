import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({ path: "./config.env" }); // load .env here too

function authMiddleware(req, res, next) {
  const token = req.header["authorization"];

  if (!token) {
    return res.status(401).json({ message: "No token Provided" });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid Token" });
    }
    req.userId = decoded.id;
    next();
  });
}

export default authMiddleware;
