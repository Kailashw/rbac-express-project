// roleRoutes.ts
import express from "express";
import { body } from "express-validator";
import {
  createRole,
  getAllRoles,
  getRoleById,
  updateRoleById,
  deleteRoleById,
} from "../controllers/roleController";
import { authenticateToken, authorizeRole } from "../utilities/authMiddleware";

/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: Roles Management
 */
const router = express.Router();

/**
 * @swagger
 * /roles:
 *   post:
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     summary: Create a new role
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 * responses:
 *       201:
 *         description: Role created successfully
 *       500:
 *         description: Internal Server Error
 */

// Route for creating a new role
router.post(
  "/roles",
  [
    body("name").notEmpty().withMessage("Role name is required"),
    body("permissions")
      .isArray({ min: 1 })
      .withMessage("At least one permission is required"),
  ],
  authenticateToken,
  authorizeRole("admin"),
  createRole
);

/**
 * @swagger
 * /roles:
 *   get:
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     summary: Get all roles
 *     responses:
 *       200:
 *         description: OK
 *       500:
 *         description: Internal Server Error
 */
// Route for getting all roles
router.get("/roles", authenticateToken, authorizeRole("admin"), getAllRoles);

/**
 * @swagger
 * /roles/{id}:
 *   get:
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     summary: Get a role by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the role to retrieve
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
router.get(
  "/roles/:id",
  authenticateToken,
  authorizeRole("admin"),
  getRoleById
);

/**
 * @swagger
 * /roles/{id}:
 *   put:
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     summary: Update a role by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the role to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *     responses:
 *       200:
 *         description: Role updated successfully
 *       404:
 *         description: Role not found
 *       500:
 *         description: Internal Server Error
 */
// Route for updating a role by ID
router.put(
  "/roles/:id",
  [
    body("name").notEmpty().withMessage("Role name is required"),
    body("permissions")
      .isArray({ min: 1 })
      .withMessage("At least one permission is required"),
  ],
  authenticateToken,
  authorizeRole("admin"),
  updateRoleById
);

/**
 * @swagger
 * /roles/{id}:
 *   delete:
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     summary: Delete a role by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the role to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Role deleted successfully
 *       404:
 *         description: Role not found
 *       500:
 *         description: Internal Server Error
 */
// Route for deleting a role by ID
router.delete(
  "/roles/:id",
  authenticateToken,
  authorizeRole("admin"),
  deleteRoleById
);

export { router as Roleroutes };
