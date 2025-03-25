import jwt from "jsonwebtoken";
import { ACCESS_KEY } from "../constants/tokens";

export function authenticateAccessToken(req, res, next) {
  const accessToken = req.cookies.accessToken;
  if (!accessToken) return res.status(401).json({ error: "Invalid Token." });
  jwt.verify(accessToken, ACCESS_KEY, (err, user) => {
    if (err) {
      if (err.name === "TokenExpiredError")
        return res.status(440).json({ error: "Token expired." });
      return res.status(403).json({ error: "Token invalid." });
    }
    req.user = user;
    next();
  });
}
