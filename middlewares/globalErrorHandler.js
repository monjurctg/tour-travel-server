const errorHandler = (err, req, res, next) => {
  console.log(err, err?.message);
  console.log("ERR CAUGHT IN GLOBAL MIDDLEWARE".red.bold);
  console.log(`ERR ${err}`.brightRed.bgBrightWhite.bold);

  res.send(err.message);
};

module.exports = errorHandler;
