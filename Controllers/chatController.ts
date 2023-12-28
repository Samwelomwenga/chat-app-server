import {Request,Response} from "express";
import chatModel from "../Models/chatModel";

export type ChatRequest={
    firstId:string,
    secondId:string,
}


const createChat = async (req: Request, res:Response) => {
    const {firstId,secondId}:ChatRequest = req.body;
    try {
        const chat = await chatModel.findOne({members:{$all:[firstId,secondId]}});
        if(chat){
            return res.status(200).json({chat});
        }
        const newChat = new chatModel({
            members:[firstId,secondId],
        });
        const newSavedChat= await newChat.save();
        return res.status(200).json({newSavedChat});
        
    } catch (error) {
        
        console.log(error);
        return res.status(500).json({error});
    }
};
const findUserChats = async (req: Request, res: Response) => {
    const userId = req.params.userId;
    try {
        const chats = await chatModel.find({members:{$in:[userId]}});
        return res.status(200).json({chats});
    } catch (error) {
        console.log(error);
        return res.status(500).json({error});
    }
}

const findChat = async (req: Request, res: Response) => {
    const {firstId,secondId}= req.params as ChatRequest;
    try {
        const chat = await chatModel.findOne({members:{$all:[firstId,secondId]}});
        return res.status(200).json({chat});
    } catch (error) {
        console.log(error);
        return res.status(500).json({error});
    }
}
export {createChat,findUserChats,findChat};