import jwt from "jsonwebtoken";
import { ACCESS_KEY, REFRESH_KEY } from "../constants/tokens.js";

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

export function getNewAccessToken(req, res) {
  const { refreshToken } = req.cookies;
  try {
    if (!refreshToken) throw new Error("Invalid token.");
    jwt.verify(refreshToken, REFRESH_KEY, (err, user) => {
      if (err) throw new Error("Token expired.");
      const newAccessToken = jwt.sign(user, ACCESS_KEY);
      res.cookie("accessToken", newAccessToken, { httpOnly: true });
      res.json({ newAccessToken });
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}

export function decodeAccessToken(req, res) {
  const { user } = req;
  res.json({ user });
}
