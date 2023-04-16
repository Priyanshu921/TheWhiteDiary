import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:false,
    },
    userName:{
        type:String,
        required:true
    }
})
 export const user = mongoose.model('user',userSchema)