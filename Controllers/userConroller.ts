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
  name: string;
  email: string;
  password: string;
};

const createToken=(_id:string)=>{
    const jwtKey= process.env.JWT_SECRET;
    if(!jwtKey){
        throw new Error("JWT_SECRET is not defined");
    }
    return jwt.sign({_id},jwtKey);
}

const registerUser = async (req: Request, res: Response) => {
try {
    const { name, email, password }: UserType = req.body;
    let user = await userModel.findOne({ email });
    if (user) {
     return  res.status(400).json({ message: "user already exists" });
    }
    if (!name) {
      return res.status(400).json({ message: "please enter name" });
    } else if (!email) {
      return res.status(400).json({ message: "please enter email" });
    } else if (!password) {
      return res.status(400).json({ message: "please enter password" });
    }
    const result = schema.safeParse({ name, email, password });
    if (!result.success) {
      return res.status(400).json({ message: result.error.message });
    }
    user = new userModel({ name, email, password });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    const token = createToken(user._id);
      res.header("auth-token", token).json({ token,id:user._id,name:user.name,email:user.email });
  
} catch (error) {
    console.log(error);
    return res.status(500).json(error); 
    
}
};
const loginUser = async (req: Request, res: Response) => {
    const { email, password }: UserType = req.body;
    try {
        if (!email) {
        return res.status(400).json({ message: "please enter email" });
        } else if (!password) {
        return res.status(400).json({ message: "please enter password" });
        }
        const user = await userModel.findOne({ email });
        if (!user) {
        return res.status(400).json({ message: "user does not exists" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
        return res.status(400).json({ message: "invalid credentials" });
        }
        const token = createToken(user._id);
        res.status(200).header("auth-token", token).json({ token,id:user._id,name:user.name,email:user.email });
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
    }

    const findUser=async(req:Request,res:Response)=>{
        const {userId}=req.params;
        try {
            const user=await userModel.findById(userId);
            if(!user){
                return res.status(400).json({message:"user does not exists"});
            }
            res.status(200).json({user});
        }
        catch(error){
            console.log(error);
            return res.status(500).json(error);
        }
    }
    const findUsers=async(_req:Request,res:Response)=>{
        try {
            const users=await userModel.find();
            if(!users){
                return res.status(400).json({message:"user does not exists"});
            }
            res.status(200).json({users});
        }
        catch(error){
            console.log(error);
            return res.status(500).json(error);
        }
    }
export { registerUser,loginUser,findUser,findUsers};
