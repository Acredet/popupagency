const Place = require("../models/place");

// @desc  Get all places
// @route GET /api/places
// @access Public
exports.getPlaces = async (req, res, next) => {
  try {
    const places = await Place.find();
    return res.status(200).json({
      success: true,
      ResultsNumber: places.length,
      data: places
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// @desc  Create a place
// @route POST /api/places
// @access Public
exports.addPlace = async (req, res, next) => {
  try {
    const place = await Place.create(req.body);
    return res.status(201).json({
      success: true,
      data: place
    });
  } catch (err) {
    console.error(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: "This Place already exists" });
    }
    res.status(500).json({ error: "Server error" });
  }
};
