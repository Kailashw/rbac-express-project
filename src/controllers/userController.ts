// userController.ts
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import { UserModel } from "../lib/models/UserModel";
import { IUser } from "../lib/interfaces/User";

// Create a new user
export const createUser = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    // You may want to add more validations or checks here, e.g., checking if the user already exists

    const user: IUser = new UserModel({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error creating user" });
  }
};

// Get all users
export const getAllUsers = async (_: Request, res: Response) => {
  try {
    const users = await UserModel.find({}, { password: 0 }).lean().exec();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Error retrieving users" });
  }
};

// Get a user by ID
export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findById(id, { password: 0 }).lean().exec();
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Error retrieving user" });
  }
};

// Update a user by ID
export const updateUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { username, email, password } = req.body;

    // You may want to add more validations or checks here, e.g., checking if the user exists before updating

    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      {
        username,
        email,
        password: hashedPassword,
      },
      { new: true }
    )
      .lean()
      .exec();

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: "Error updating user" });
  }
};

// Delete a user by ID
export const deleteUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // You may want to add more validations or checks here, e.g., checking if the user exists before deleting

    const deletedUser = await UserModel.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting user" });
  }
};
