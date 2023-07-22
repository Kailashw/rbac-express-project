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

const router = express.Router();

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

// Route for getting all roles
router.get("/roles", authenticateToken, authorizeRole("admin"), getAllRoles);

// Route for getting a role by ID
router.get(
  "/roles/:id",
  authenticateToken,
  authorizeRole("admin"),
  getRoleById
);

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

// Route for deleting a role by ID
router.delete(
  "/roles/:id",
  authenticateToken,
  authorizeRole("admin"),
  deleteRoleById
);

export { router as Roleroutes };
