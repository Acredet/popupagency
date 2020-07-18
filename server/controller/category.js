const Category = require("../models/category");

// @desc  Get all categorys
// @route GET /api/category
// @access Private
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
// @access Private
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

// @desc  Delete a category
// @route Delete /api/category/id
// @access Private
exports.deleteCategory = (req, res) => {
  Category.findById(req.params.id)
    .then(category => category.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
};

// @desc  update a category
// @route update /api/category/id
// @access Private
exports.updateCategory = (req, res) => {
  Category.updateOne({ _id: req.params.id }, { $set: req.body })
    .then(category => res.json({ success: true }))
    .catch(err => res.status(404).json({ success: false }));
};
