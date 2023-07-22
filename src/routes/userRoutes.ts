// userRoutes.ts
import express from "express";
import { body } from "express-validator";
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} from "../controllers/userController";
import { authenticateToken, authorizeRole } from "../utilities/authMiddleware";

const router = express.Router();

// Route for creating a new user
router.post(
  "/users",
  [
    body("username").notEmpty().withMessage("Username is required"),
    body("email").isEmail().withMessage("Invalid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  createUser
);

// Route for getting all users
router.get("/users", authenticateToken, authorizeRole("admin"), getAllUsers);

// Route for getting a user by ID
router.get(
  "/users/:id",
  authenticateToken,
  authorizeRole("admin"),
  getUserById
);

// Route for updating a user by ID
router.put(
  "/users/:id",
  [
    body("username").notEmpty().withMessage("Username is required"),
    body("email").isEmail().withMessage("Invalid email"),
    body("password")
      .isLength({ min: 6 })
      .optional()
      .withMessage("Password must be at least 6 characters long"),
  ],
  authenticateToken,
  authorizeRole("admin"),
  updateUserById
);

// Route for deleting a user by ID
router.delete(
  "/users/:id",
  authenticateToken,
  authorizeRole("admin"),
  deleteUserById
);

export { router as UserRoutes };
