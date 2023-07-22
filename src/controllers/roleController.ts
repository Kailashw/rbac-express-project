// roleController.ts
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { RoleModel } from "../lib/models/RoleModel";
import { IRole } from "../lib/interfaces/Roles";

// Create a new role
export const createRole = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { name, permissions } = req.body;

    // You may want to add more validations or checks here, e.g., checking if the role already exists

    const role = new RoleModel({ name, permissions });
    await role.save();
    res.status(201).json({ message: "Role created successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error creating role" });
  }
};

// Get all roles
export const getAllRoles = async (_: Request, res: Response) => {
  try {
    const roles = await RoleModel.find({});
    res.json(roles);
  } catch (err) {
    res.status(500).json({ error: "Error retrieving roles" });
  }
};

// Get a role by ID
export const getRoleById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const role = await RoleModel.findById(id);
    if (!role) {
      return res.status(404).json({ error: "Role not found" });
    }
    res.json(role);
  } catch (err) {
    res.status(500).json({ error: "Error retrieving role" });
  }
};

// Update a role by ID
export const updateRoleById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, permissions } = req.body;

    // You may want to add more validations or checks here, e.g., checking if the role exists before updating

    const updatedRole = await RoleModel.findByIdAndUpdate(
      id,
      {
        name,
        permissions,
      },
      { new: true }
    );

    if (!updatedRole) {
      return res.status(404).json({ error: "Role not found" });
    }

    res.json(updatedRole);
  } catch (err) {
    res.status(500).json({ error: "Error updating role" });
  }
};

// Delete a role by ID
export const deleteRoleById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // You may want to add more validations or checks here, e.g., checking if the role exists before deleting

    const deletedRole = await RoleModel.findByIdAndDelete(id);

    if (!deletedRole) {
      return res.status(404).json({ error: "Role not found" });
    }

    res.json({ message: "Role deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting role" });
  }
};
