const chechTourRequiredField = (req, res, next) => {
  if (!name) throw Error("name is required");
  else if (!destinations) throw Error("destinations is required");
  else if (!rating) throw Error("rating is required");
  else if (!price) throw Error("price is required");
  else if (!image) throw Error("image is required");
  else if (!duration) throw Error("duration is required");
  else if (!startDate) throw Error("startDate is required");
  else next();
};

module.exports = chechTourRequiredField;
