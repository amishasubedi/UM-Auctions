const app = require("./app");
const connectDatabase = require("./config/database");

const dotenv = require("dotenv");

//set up config file
dotenv.config({ path: "backend/config/config.env" });

// connect to mongodb, call the function
connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(
    `SERVER started on port: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
  );
});

const serverCloseHandler = () => {
  process.exit(1);
};

// promise rejections errors
process.on("unhandledRejection", (err) => {
  console.log(`ERROR: ${err.message}`);
  console.log("Server down due to unhandled promise rejection");
  server.close(serverCloseHandler());
});
