const mongoose = require ('mongoose');

const config = require('../config/config')
 const dbConnect = async ()=>{
   console.log('connecting mongo db ')
    try {
        
        const a = await mongoose.connect(config.mongodb_url)
        console.log('successfully connected to db')
    } catch (error) {
        
        console.log('Error connecting db ......',error)
    }
 }

 module.exports = dbConnect;