import {Request,Response} from "express";
// import userModel from "../Models/userModel";

const registerUser=(_req:Request,res:Response)=>{
    res.json({message:"register user"})
}
export {registerUser};
