import { Request, Response } from "express";
import messageModel from "../Models/messageModel";

const createMessage = async (req: Request, res: Response) => {
    const {chatId,senderId,text} = req.body;
    const message = new messageModel({chatId,senderId,text});
    try {
        const newMessage =await message.save();
        res.status(200).json(newMessage);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    }



const getMessages = async (req: Request, res: Response) => {
    const {chatId} = req.body;
  try {
    const messages = await messageModel.find({chatId});
    res.status(200).json({ messages });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
 export {createMessage,getMessages};

