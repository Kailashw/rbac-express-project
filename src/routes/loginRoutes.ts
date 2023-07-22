// roleRoutes.ts
import express, { Request, Response } from "express";
import { validationResult, check } from "express-validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../lib/models/UserModel";
import { RoleModel } from "../lib/models/RoleModel";
import { SECRET_KEY } from "../utilities/secrets";

const router = express.Router();

router.post(
  "/login",
  [
    check("username").notEmpty().withMessage("Username is required"),
    check("password").notEmpty().withMessage("Password is required"),
  ],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      const { username, password } = req.body;
      const user = await UserModel.findOne({ username }).lean().exec();
      if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const token = jwt.sign({ _id: user._id }, SECRET_KEY);
      res.json({ token });
    } catch (err) {
      res.status(500).json({ error: "Error during login" });
    }
  }
);

router.post(
  "/roles",
  [
    check("name").notEmpty().withMessage("Name is required"),
    check("permissions")
      .isArray({ min: 1 })
      .withMessage("At least one permission is required"),
  ],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      const { name, permissions } = req.body;
      const role = new RoleModel({ name, permissions });
      await role.save();
      res.status(201).json({ message: "Role created successfully" });
    } catch (err) {
      res.status(500).json({ error: "Error creating role" });
    }
  }
);

router.post(
  "/assign-role",
  [
    check("username").notEmpty().withMessage("Username is required"),
    check("role").notEmpty().withMessage("Role is required"),
  ],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      const { username, role } = req.body;
      const user = await UserModel.findOne({ username });
      if (!user) return res.status(404).json({ error: "User not found" });
      user.roles.push(role);
      user.roles = Array.from(new Set(user.roles));
      await user.save();
      res.json({ message: "Role assigned successfully" });
    } catch (err) {
      res.status(500).json({ error: "Error assigning role" });
    }
  }
);

export { router as Loginroutes };
