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

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User Management
 */
const router = express.Router();

/**
 * @swagger
 * /users:
 *   post:
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *     responses:
 *       201:
 *         description: User created successfully
 *       500:
 *         description: Internal Server Error
 */
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
  authenticateToken,
  authorizeRole("admin"),
  createUser
);

/**
 * @swagger
 * /users:
 *   get:
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: OK
 *       500:
 *         description: Internal Server Error
 */
// Route for getting all users
router.get("/users", authenticateToken, authorizeRole("admin"), getAllUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     summary: Get a user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */
// Route for getting a user by ID
router.get(
  "/users/:id",
  authenticateToken,
  authorizeRole("admin"),
  getUserById
);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     summary: Update a user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */
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

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     summary: Delete a user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */
// Route for deleting a user by ID
router.delete(
  "/users/:id",
  authenticateToken,
  authorizeRole("admin"),
  deleteUserById
);

export { router as UserRoutes };
