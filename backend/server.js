const app = require('./app');
const connectDatabase = require('./config/database')
const dotenv = require('dotenv');

// Handling uncaught exceptions
process.on('uncaughtException', err => {
  console.log(`ERROR: ${err.message}`);
  console.log('Shutting down the server due to uncaught exception');
  process.exit(1);
})

// Setting up config file
dotenv.config({ path: 'backend/config/config.env' })


// Connecting to database
connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(`Serever started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
});

// Handling unHandled promises rejection errors
process.on('unhandledRejection', err => {
  console.log(`Error: ${err.message}`);
  console.log('Shutting down the server due to unhandled promise rejection');
  // Close server and exit process
  server.close(() => {
    process.exit(1);
  });
})

// process.on('unhandledRejection', (err, promise) => {
//   console.log(`Error: ${err.message}`);
//   // Close server and exit process
//   server.close(() => process.exit(1));
// }); 