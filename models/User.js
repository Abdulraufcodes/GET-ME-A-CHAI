//Role: The "Blueprint" for a user.

import mongoose from "mongoose";

const {Schema,model} = mongoose

const UserSchema = new Schema({
    email: {type: String , required: true},
    name: {type: String },
    username: {type: String, required: true},
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    },
    profilepic: {type: String},
    coverpic: {type: String},
    razorpayid:{type: String},
    razorpaysecret:{type: String},
    createdAt:{type:Date, default:Date.now},
    updatedAt:{type:Date, default:Date.now}
})

export default mongoose.models.User || model("User",UserSchema);