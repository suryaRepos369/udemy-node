const User = require('../../models/user.js')
const getUser =async()=>{
    const data = await User.find({})
    if (data && data.length > 0) {
      return data;
    } else {
      return 'no data found'
    }

}

const createUser =async(body)=>{
    const newData = new User(body)
    const a = await newData.save();
    return a ;

}


module.exports={getUser,  createUser}