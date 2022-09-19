const mongoose = require("mongoose");

module.exports = () => {
  console.log("connecting to DB...");
  mongoose
    .connect("mongodb://localhost:27017/Tour-Mangement", {
      useNewUrlParser: true,

      useUnifiedTopology: true,
    })
    .then(() => console.log(`DB connection successful!`.blue.bold))
    .catch((err) => {
      console.log("DB Connection Failed !");
      console.log(`err`, err);
    });
};
