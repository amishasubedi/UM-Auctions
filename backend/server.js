const app = require("./app");
const connectDatabase = require("./config/database");

const dotenv = require("dotenv");

//set up config file
dotenv.config({ path: "backend/config/config.env" });

// connect to mongodb, call the function
connectDatabase();

app.listen(process.env.PORT, () => {
  console.log(
    `SERVER started on port: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
  );
});
