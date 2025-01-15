const mongoose = require("mongoose");

const connectDatabase = () => {
  const dbURI = process.env.DB_LOCAL_URI;

  if (!dbURI) {
    console.error(
      "DB_LOCAL_URI is missing! Please check your environment variables."
    );
    process.exit(1);
  }

  // Connect to MongoDB using the provided local URI
  mongoose
    .connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((con) => {
      console.log(`MongoDB connected with HOST: ${con.connection.host}`);
    })
    .catch((err) => {
      console.error(`Database connection error: ${err.message}`);
      process.exit(1);
    });
};

module.exports = connectDatabase;
