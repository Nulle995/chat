import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/userModel.js";
import { UserValidation } from "../validations/userValidation.js";
import { ACCESS_KEY, REFRESH_KEY } from "../constants/tokens.js";
import Cookies from "cookies";

export class UserController {
  static async create(req, res) {
    const { username, password, role } = req.body;
    try {
      const validatedData = await UserValidation.create({ username, password });
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await UserModel.create({
        username,
        password: hashedPassword,
        role,
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
      const user = await UserModel.login({ username });
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) throw new Error("Wrong password.");
      const accessToken = jwt.sign({ username, role: user.role }, ACCESS_KEY, {
        expiresIn: "5m",
      });
      const refreshToken = jwt.sign(
        { username, role: user.role },
        REFRESH_KEY,
        {
          expiresIn: "20d",
        }
      );

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

  static async getAll(req, res) {
    const skip = parseInt(req.query.skip) || 0;
    const limit = parseInt(req.query.limit) || 20;
    const search = req.query.search || "";
    const baseUrl = `${req.protocol}://${req.get("host")}${req.path}`;
    const nextSkip = skip + limit;

    try {
      const { allUsers, total } = await UserModel.getAll({
        skip,
        search,
        limit,
      });
      const next =
        nextSkip < total
          ? `${baseUrl}?skip=${nextSkip}&limit=${limit}${
              search ? `&search=${encodeURIComponent(search)}` : ""
            }`
          : null;

      if (!allUsers) throw new Error("No users found.");
      res.json({
        users: allUsers,
        total,
        currentPage: Math.floor(skip / limit) + 1,
        next,
      });
      console.log(Math.floor(skip / limit) + 1);
      console.log(skip);
      console.log(limit);
    } catch (e) {
      console.log(e);
    }
  }
}
