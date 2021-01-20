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
      data: region,
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
    const region = new Region({
      name: {
        en: req.body.name.en,
        sv: req.body.name.sv,
      },
      parent: req.body.parent,
      description: {
        en: req.body.description.en,
        sv: req.body.description.sv,
      },
    });
    await region
      .save()
      .then((result) =>
        res.status(201).json({
          success: true,
          data: region,
        })
      )
      .catch((err) => res.status(400).json(err));
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
    .then((region) => region.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json(err.message));
};

// @desc  update a Region
// @route update /api/Region/id
// @access Private
exports.updateRegion = (req, res) => {
  Region.updateOne({ _id: req.params.id }, { $set: req.body })
    .then((region) => res.json({ success: true }))
    .catch((err) => res.status(404).json(err.message));
};
