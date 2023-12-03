import mongoose,{Schema,Document} from "mongoose";

interface Iuser extends Document{
    name:string;
    email:string;
    password:string;

}

const userSchema:Schema = new mongoose.Schema(
  {
    name: { type: String, required: true, minlength: 3, maxlength: 30 },
    email: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 254,
    },
    password: { type: String, required: true, minlength: 8, maxlength: 1024 },
  },
  {
    timestamps: true,
  }
);

const userModel=mongoose.model<Iuser>('User',userSchema);
export default userModel;