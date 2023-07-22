// roleRoutes.ts
import express, { Request, Response } from "express";
import { validationResult, check } from "express-validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../lib/models/UserModel";
import { RoleModel } from "../lib/models/RoleModel";
import { SECRET_KEY } from "../utilities/secrets";

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication
 */
const router = express.Router();

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Role not found
 *       500:
 *         description: Internal Server Error
 */
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

/**
 * @swagger
 * /assign-role:
 *   post:
 *     tags: [Authentication]
 *     summary: Get a role by ID
 *     parameters:
 *       - in: path
 *         username: id
 *         required: true
 *         role: name of the role to add
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Role not found
 *       500:
 *         description: Internal Server Error
 */
// Route for getting a role by ID
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
