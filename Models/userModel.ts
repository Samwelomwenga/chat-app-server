import mongoose,{Schema,Document} from "mongoose";
import { UserType } from "../Controllers/userConroller";

interface Iuser extends Document,UserType{}

const userSchema:Schema = new mongoose.Schema<Iuser>(
  {
    name: { type: String, required: true, minlength: 3, maxlength: 30 },
    email: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 20,
    },
    password: { type: String, required: true, minlength: 8, maxlength: 1024},
  },
  {
    timestamps: true,
  }
);

const userModel=mongoose.model<Iuser>('User',userSchema);
export default userModel;