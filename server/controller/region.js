const Region = require("../models/region");

// @desc  Get all regions
// @route GET /api/region
// @access Public
exports.getregion = async (req, res, next) => {
  try {
    const region = await Region.find();
    return res.status(200).json({
      success: true,
      ResultsNumber: region.length,
      data: region
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// @desc  Create a region
// @route POST /api/region
// @access Public
exports.addregion = async (req, res, next) => {
  try {
    const region = await Region.create(req.body);
    return res.status(201).json({
      success: true,
      data: region
    });
  } catch (err) {
    console.error(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: "This region already exists" });
    }
    res.status(500).json({ error: "Server error" });
  }
};

// @desc  Delete a Region
// @route Delete /api/Region/id
// @access Private
exports.deleteRegion = (req, res) => {
  Region.findById(req.params.id)
    .then(region => region.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
};

// @desc  update a Region
// @route update /api/Region/id
// @access Private
exports.updateRegion = (req, res) => {
  Region.updateOne({ _id: req.params.id }, { $set: req.body })
    .then(region => res.json({ success: true }))
    .catch(err => res.status(404).json({ success: false }));
};
