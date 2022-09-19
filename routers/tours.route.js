const express = require("express");
const tourController = require("../controllers/tour-controller");
const chechTourRequiredField = require("../middlewares/checkTourRequireField");

const router = express.Router();
// const productController = require('../controllers/product.controller')
router.route("/tour/trending").get(tourController.topThreeTrend);
router.route("/tour/cheapest").get(tourController.topThereCheapest);

router
  .route("/tours")
  .get(tourController.getTour)

  .post(tourController.createTour);
// get by id
router
  .route("/tours:id")
  .get(tourController.showSingleTour)
  .delete((req, res) => {
    res.send("tour delete");
  });

module.exports = router;
