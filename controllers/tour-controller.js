const {topThree} = require("../services/tour-service");
const tourService = require("../services/tour-service");

class TourController {
  // create a tour
  async createTour(req, res) {
    try {
      const result = await tourService.create(req.body);

      //   result.logger();

      res.status(200).json({
        success: true,
        messgae: "Data inserted successfully!",
        data: result,
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({
        success: false,
        message: "Tour not created",
        error: err.message,
      });
    }
  }

  // get all tour from service and send response to the client
  async getTour(req, res) {
    const filters = {...req.query};

    const excludeFields = ["sort", "page", "limit"];
    excludeFields.forEach((field) => delete filters[field]);
    // Example: /tours?fields=name,image

    const queries = {};
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      queries.sortBy = sortBy;
    }
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      queries.fields = fields;
      console.log(fields);
    }

    if (req.query.page) {
      const {page = 1, limit = 10} = req.query;
      const skip = (page - 1) * parseInt(limit);
      queries.limit = parseInt(limit);
      console.log(skip, "skip");

      queries.skip = skip;
    }

    try {
      const tour = await tourService.get(filters, queries);
      res.status(200).json({
        success: true,
        message: "Toure not created",
        data: tour,
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({
        success: false,
        message: "Tour not find",
        error: err.message,
      });
    }
  }

  // find s tour information by id and send response to  the client
  async showSingleTour(req, res) {
    const {id} = req.params;
    if (!id) {
      throw Error("tour id is required");
    }

    try {
      const tour = await tourService.findOneById(id);
      tour.hitPoint = tour.hitPoint + 1;

      res.status(200).json({
        success: true,
        data: tour,
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: "faild to get data",
        error: err.message,
      });
    }
  }
  // top theree trend
  async topThreeTrend(req, res) {
    try {
      const result = await tourService.topThree("trend");
      res.status(200).json({
        success: true,

        data: result,
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: "Tour not find",
        error: err.message,
      });
    }
  }
  // topThereCheapest

  async topThereCheapest(req, res) {
    try {
      const result = await tourService.topThree("cheap");
      res.status(200).json({
        success: true,

        data: result,
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: "Tour not find",
        error: err.message,
      });
    }
  }
}

module.exports = new TourController();
