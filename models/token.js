const mongoose = require('mongoose')

 const tokenTypes = {
    ACCESS :'access', 
    REFRESH:'refresh'
 }

const tokenSchema = mongoose.Schema({

    token:{
        type:String,
        required:true,
        index:true
    },
    user:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'User',
        required:true,
    },
    type:{
        type:String,
        required:true,
        enum:[tokenTypes.ACCESS, tokenTypes.REFRESH]
    },
    expires:{
        type:Date,
        required:true
    },
    blacklisted:{
        type:Boolean, 
        default:false
    }
},{timestamps:true});

const Token = mongoose.model('Token', userSchema)

module.exports  =Token;