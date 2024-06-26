import mongoose, {Schema} from "mongoose";
import User from "./User.js";

const TokenSchema = mongoose.Schema(
    {
        userId : {
            type : Schema.Types.ObjectId,
            required : true,
            ref : User
        },
        token : {
            type : String,
            required : true
        },
        createdAt : {
            type : Date,
            dafault : Date.now,
            expires : 300
        }
    }
);

export default mongoose.model("Token", TokenSchema);
