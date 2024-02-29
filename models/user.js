const mongoose = require('mongoose')
const userSchema = mongoose.Schema({

    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:5
    },
},{timestamps:true});

userSchema.statics.isEmailTaken=async function(email){
    const user = await this.findOne({email})
    return !!user;
}

const User = mongoose.model('User', userSchema)

module.exports  =User;