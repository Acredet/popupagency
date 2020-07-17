const Category = require("../models/category");

// @desc  Get all categorys
// @route GET /api/category
// @access Public
exports.getcategory = async (req, res, next) => {
  try {
    const category = await Category.find();
    return res.status(200).json({
      success: true,
      ResultsNumber: category.length,
      data: category
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// @desc  Create a category
// @route POST /api/category
// @access Public
exports.addcategory = async (req, res, next) => {
  try {
    const category = await Category.create(req.body);
    return res.status(201).json({
      success: true,
      data: category
    });
  } catch (err) {
    console.error(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: "This category already exists" });
    }
    res.status(500).json({ error: "Server error" });
  }
};
