const mongoose = require("mongoose");

module.exports = () => {
  console.log("connecting to DB...", process.env.DB_NAME);
  mongoose
    .connect(
      `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASSWORD}@cluster0.pvcyw.mongodb.net/tour-management?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => console.log(`DB connection successful!`.blue.bold))
    .catch((err) => {
      console.log("DB Connection Failed !");
      console.log(`err`, err);
    });
};
