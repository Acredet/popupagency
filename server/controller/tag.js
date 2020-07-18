const Tag = require("../models/tag");

// @desc  Get all tags
// @route GET /api/tag
// @access Public
exports.gettag = async (req, res, next) => {
  try {
    const tag = await Tag.find();
    return res.status(200).json({
      success: true,
      ResultsNumber: tag.length,
      data: tag
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// @desc  Create a tag
// @route POST /api/tag
// @access Public
exports.addtag = async (req, res, next) => {
  try {
    const tag = await Tag.create(req.body);
    return res.status(201).json({
      success: true,
      data: tag
    });
  } catch (err) {
    console.error(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: "This tag already exists" });
    }
    res.status(500).json({ error: "Server error" });
  }
};

// @desc  Delete a Tag
// @route Delete /api/Tag/id
// @access Private
exports.deleteTag = (req, res) => {
  Tag.findById(req.params.id)
    .then(tag => tag.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
};

// @desc  update a Tag
// @route update /api/Tag/id
// @access Private
exports.updateTag = (req, res) => {
  Tag.updateOne({ _id: req.params.id }, { $set: req.body })
    .then(tag => res.json({ success: true }))
    .catch(err => res.status(404).json({ success: false }));
};
