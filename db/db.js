const mongoose = require ('mongoose')

 const dbConnect = async ()=>{
   console.log('connecting mongo db ')
    try {
        const a = await mongoose.connect('mongodb://127.0.0.1:27017/blog_app')
        console.log('successfully connected to db')
        
    } catch (error) {
        
        console.log('Error connecting db ......',error)
    }
 }

 module.exports = dbConnect;