const mongoose = require ('mongoose')

 const dbConnect = async ()=>{
   console.log('connecting mongo db ')
    try {
        
        const username ='admin';
        const password ='password'
        const a = await mongoose.connect(`mongodb://${username}:${password}@localhost:27017`)
        console.log('successfully connected to db')
    } catch (error) {
        
        console.log('Error connecting db ......',error)
    }
 }

 module.exports = dbConnect;