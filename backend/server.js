const app = require("./app");
const connectDatabase = require("./config/database");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config({ path: "./backend/config/config.env" });

// Error handling for uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error(`ERROR: ${err.message}`);
  console.error("Server down due to uncaught exceptions");
  process.exit(1);
});

// Connect to the database
connectDatabase();

// Start the server
const server = app.listen(process.env.PORT, () => {
  console.log(
    `SERVER started on port: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
  );
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error(`ERROR: ${err.stack}`);
  console.error("Server down due to unhandled promise rejection");
  server.close(() => process.exit(1));
});
