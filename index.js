const mongoose = require ('mongoose')
const dbConnect = require('./db/db')
const app = require('./server')
const http = require('http')
const config = require('./config/config')
const log = require('./config/logger')

dbConnect();
const httpServer = http.createServer(app);
const server = httpServer.listen(config.port, () => {
log.logger.info(`Server is running on port ${config.port}`);
});

const exitHandler=()=>{
    if(server){
        server.close(()=>{
            log.logger.info('server closed due to error');
            process.exit(1)
        })
    }
    else{
        process.exit(1)
    }
}

const unExpectedErrorHandler =(error)=>{
    console.log(error);
    exitHandler();
}

process.on('unhandledRejection', unExpectedErrorHandler)
process.on('uncaughtException', unExpectedErrorHandler)
process.on("SIGTERM", ()=>{
    console.log("sigterm received")
    if(server){
        server.close()
    }
})


