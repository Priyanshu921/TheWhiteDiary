import mongoose from 'mongoose';

const userNameSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    }

},{
    timestamps:true
});

export const userName = mongoose.model('userName',userNameSchema)

