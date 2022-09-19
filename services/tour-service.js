const TourModel = require("../models/tour-model");

class TourService {
  // create a tour
  async create(tour) {
    const result = await TourModel.create(tour);
    return result;
  }

  // find data with query
  async get(filters, queries) {
    console.log(queries, "g");
    const tours = await TourModel.find(filters)
      .skip(queries?.skip)
      .limit(queries?.limit)
      .select(queries?.fields)
      .sort(queries?.sortBy);
    return tours;
  }
  // find one by id
  async findOneById(tourId) {
    const tour = await TourModel.find({_id: tourId});
    if (tour[0]._id) {
      await TourModel.updateOne(
        {_id: tour[0]._id},
        {$inc: {hitPoint: 1}},
        {runValidators: true}
      );
    }

    return tour[0];
  }

  // top 3 trending
  async topThree(type) {
    let sort = type === "cheap" ? 1 : -1;
    const result = await TourModel.find({}).sort({hitPoint: sort}).limit(3);
    return result;
  }
}

// update one

// console.log(data);

module.exports = new TourService();
