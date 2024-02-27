const mongoose = require ('mongoose');
const log = require('../config/logger')
const {logger} =log
const config = require('../config/config')
 const dbConnect = async ()=>{
   logger.info('connecting to  mongo db ....')
    try {
        
        const a = await mongoose.connect(config.mongodb_url)
       logger.info('successfully connected to db')
    } catch (error) {
        
        logger.info('Error connecting db ......',error)
    }
 }

 module.exports = dbConnect;