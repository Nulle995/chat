import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/userModel.js";
import { UserValidation } from "../validations/userValidation.js";
import { ACCESS_KEY, REFRESH_KEY } from "../constants/tokens.js";
import Cookies from "cookies";

export class UserController {
  static async create(req, res) {
    const { username, password } = req.body;
    try {
      const validatedData = await UserValidation.create({ username, password });
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await UserModel.create({
        username,
        password: hashedPassword,
      });
      if (!newUser) throw new Error("Couln't create the user.");
      res.status(201).json(newUser);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }

  static async login(req, res) {
    const { username, password } = req.body;
    try {
      const validatedData = await UserValidation.create({ username, password });
      const hashedPassword = await UserModel.login({ username });
      const isValidPassword = await bcrypt.compare(password, hashedPassword);
      if (!isValidPassword) throw new Error("Wrong password.");
      const accessToken = jwt.sign({ username }, ACCESS_KEY, {
        expiresIn: "5m",
      });
      const refreshToken = jwt.sign({ username }, REFRESH_KEY, {
        expiresIn: "20d",
      });

      const saveRefreshToken = await UserModel.createRefreshToken({
        token: refreshToken,
      });
      res.cookie("accessToken", accessToken, { httpOnly: true });
      res.cookie("refreshToken", refreshToken, { httpOnly: true });
      res.status(201).json({ user: username });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }

  static async logout(req, res) {
    try {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) throw new Error("Invalid token.");
      const deletedToken = await UserModel.logout({ token: refreshToken });
      if (!deletedToken) throw new Error("Invalid token.");
      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");
      res.status(200).json({ message: "Logout successfully" });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }
}
