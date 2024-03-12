const http = require('http');
const config = require('./config/config');
const log = require('./config/logger');
const dbConnect = require('./db/db');
const app = require('./server');
const fs = require('fs');
let server;

async function startServer() {
  try {
    await dbConnect();
    const httpServer = http.createServer(app);
    server = httpServer.listen(config.port, () => {
      log.logger.info(`Server is running on port ${config.port}`);
    });
    //create uploads directory for file uploads
    await fs.access('uploads', fs.constants.F_OK, async (err) => {
      if (err) {
        await fs.promises.mkdir('uploads');
      }
    });
  } catch (error) {
    log.logger.error('Error starting server:', error);
    exitHandler();
  }
}

function exitHandler() {
  if (server) {
    server.close(() => {
      log.logger.info('Server closed due to error');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
}

function gracefulShutdown() {
  log.logger.info('Received SIGINT signal. Shutting down gracefully...');
  if (server) {
    server.close(() => {
      log.logger.info('HTTP server closed.');
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
}

async function gracefulShutdownSIGTERM() {
  log.logger.info('SIGTERM received. Shutting down gracefully...');
  if (server) {
    try {
      await new Promise((resolve, reject) => {
        server.close((err) => {
          if (err) {
            log.logger.error('Error while closing server:', err);
            reject(err);
          } else {
            log.logger.info('Server closed successfully.');
            resolve();
          }
        });
      });
    } catch (error) {
      log.logger.error('Error while closing server:', error);
      process.exit(1);
    }
  }
  process.exit(0);
}

// Start server
startServer();

// Event handlers
process.on('unhandledRejection', (reason, promise) => {
  log.logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
  log.logger.error('Uncaught Exception:', error);
  exitHandler();
});

process.on('SIGINT', gracefulShutdown);

process.on('SIGTERM', gracefulShutdownSIGTERM);
