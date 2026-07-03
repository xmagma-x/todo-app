import User from "../models/users.model.js";
import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../config/env.js";
import Token from "../models/refreshToken.model.js";

export async function createUser(req, res) {
  try {
    if (!req.body.username || !req.body.email || !req.body.password) {
      return res.send({
        msg: "please insert all required fields username & password & email",
      });
    }

    const existingUser = await User.findOne({ username: req.body.username });

    if (existingUser) {
      return res.status(409).send({ msg: "username already taken" });
    }

    const hashedPassword = await hash(req.body.password, 10);

    const newUser = {
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    };

    const result = await User.create(newUser);
    res.status(201).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Internal server error" });
  }
}

export async function loginUser(req, res) {
  try {
    if (!req.body.username || !req.body.password) {
      return res.status(400).send({
        error: "please insert all required fields username & password",
      });
    }

    const result = await User.findOne({ username: req.body.username });

    if (result == null) {
      return res.status(404).send({ error: "user not found" });
    }

    const user = {
      userId: result._id,
      username: result.username,
      email: result.email,
    };

    if (await compare(req.body.password, result.password)) {
      const accessToken = jwt.sign(user, ACCESS_TOKEN_SECRET, {
        expiresIn: "15m",
      });
      const refreshToken = jwt.sign(user, REFRESH_TOKEN_SECRET, {
        expiresIn: "7d",
      });
      await Token.create({ token: refreshToken });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      return res.send({ accessToken });
    } else {
      return res.status(401).send({ error: "wrong password" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Internal server error" });
  }
}

export async function getUserInfo(req, res) {
  try {
    const { userId } = req.user;
    const result = await User.findById(userId);
    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Internal server error in getUser" });
  }
}

export async function refreshToken(req, res) {
  try {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) return res.status(403).send({ msg: "Logout" });

    const result = await Token.findOne({ token: refreshToken });

    if (!result) return res.status(403).send({ msg: "Forbidden" });

    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, async (err, user) => {
      if (err) {
        logoutUser(req, res);
        return res.status(403).send({ msg: "Logout" });
      }

      const userData = {
        userId: user.userId,
        username: user.username,
        email: user.email,
      };

      await Token.findOneAndDelete({ token: refreshToken });
      const newRefreshToken = await jwt.sign(userData, REFRESH_TOKEN_SECRET, {
        expiresIn: "7d",
      });
      const accessToken = await jwt.sign(userData, ACCESS_TOKEN_SECRET, {
        expiresIn: "15m",
      });

      await Token.create({ token: newRefreshToken });
      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      res.send({ accessToken });
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Internal server error in refreshToken" });
  }
}

export async function logoutUser(req, res) {
  try {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) return res.status(401).send({ msg: "Unauthorized" });

    const result = await Token.findOneAndDelete({ token: refreshToken });

    if (!result) return res.status(400).send({ msg: "token wasn't found " });

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    res.send({ msg: "token deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Internal server error in logoutUser" });
  }
}
