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
    const category = new Category({
      name: req.body.name,
      parent: req.body.parent,
      description: req.body.description,
      avatar: req.file ? req.file.filename : null
    })
    await category.save()
      .then(result => res.status(201).json({
          success: true,
          data: category
        })
      )
      .catch(err => res.status(400).json(err))
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
exports.updateCategory = async (req, res) => {
  const update = {
    name: req.body.name || null,
    parent: req.body.parent || null,
    description: req.body.description || null,
    avatar: req.file ? req.file.filename : null
  }

  for (const key in update) {
    if (update.hasOwnProperty(key)) {
      const element = update[key];
      if (element === null) { delete update.key }
    }
  }

  await Category.updateOne({ _id: req.params.id }, { $set: update })
    .then(category => res.json({ success: true }))
    .catch(err => res.status(404).json({ success: false }));
};
