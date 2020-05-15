const app = require('./app');
const logger = require('./util/logger');

const PORT = process.env.PORT || 3001;

const server = app.listen(PORT, () => {
  logger.info(`Info: User service started on port ${PORT}`);
});

function gracefulShutdown() {
  // Prevent the server from receiving anymore incoming requests
  server.close((error) => {
    // TODO Disconnect from database
    if (error) {
      process.exit(error ? 1 : 0);
    }
    logger.info('Info: Shutting down server');
  });
}

process.on('SIGINT', () => {
  gracefulShutdown();
});

process.on('SIGTERM', () => {
  gracefulShutdown();
});

module.exports = server;
