import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { z } from "zod";

import userModel from "../Models/userModel";

const schema = z.object({
  name: z.string().min(3).max(30),
  email: z.string().email().min(3).max(20),
  password: z.string().min(8).max(20),
});
export type UserType = {
  name: String;
  email: String;
  password: String;
};
const registerUser = async (req: Request, res: Response) => {
  const { name, email, password }: UserType = req.body;
  let user = await userModel.findOne({ email });
  if (user) {
    res.status(400).json({ message: "user already exists" });
  }
  if (!name) {
    res.status(400).json({ message: "please enter name" });
  } else if (!email) {
    res.status(400).json({ message: "please enter email" });
  } else if (!password) {
    res.status(400).json({ message: "please enter password" });
  }
  const result = schema.safeParse({ name, email, password });
  if (!result.success) {
    res.status(400).json({ message: result.error.message });
  }
  user = new userModel({ name, email, password });
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);
  await user.save();

  res.json({ message: "register user" });
};
export { registerUser };
