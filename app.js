const express = require("express");
const app = express();
const cors = require("cors");

const rateLimit = require("express-rate-limit");
const tourRoutes = require("./routers/tours.route");
const errorHandler = require("./middlewares/globalErrorHandler");

// app.use(cors(corsOptions));

app.use(express.json());

// $ CORS
app.use(cors({origin: "*"}));

const limiter = rateLimit({
  max: 100, //   max number of limits
  windowMs: 30 * 60 * 1000, // hour
  message: " Too many req from this IP , please Try  again in an Hour ! ",
});

app.use("/api", limiter);

//  Body Parser  => reading data from body into req.body protect from scraping etc
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Live!");
});

// routes
app.use("/api", tourRoutes);

// handling all (get,post,update,delete.....) unhandled routes
app.all("*", (req, res, next) => {
  next(new Error(`Can't find ${req.originalUrl} on the server`, 404));
});

// error handling middleware
app.use(errorHandler);

module.exports = app;
