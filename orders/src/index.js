const app = require('./app');
const logger = require('./util/logger');

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  logger.info(`Info: Orders service started on port ${PORT}`);
});

function gracefulShutdown() {
  // Prevent the server from receiving anymore incoming requests
  server.close((error) => {
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
