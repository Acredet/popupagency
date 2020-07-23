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
    const tag = new Tag({
      name: req.body.name,
      parent: req.body.parent,
      description: req.body.description,
      avatar: req.file.filename
    })
    await tag.save()
      .then(result => res.status(201).json({
          success: true,
          data: tag
        })
      )
      .catch(err => res.status(400).json(err))
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
exports.updateTag = async (req, res) => {
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

  await Tag.updateOne({ _id: req.params.id }, { $set: update })
    .then(tag => res.json({ success: true }))
    .catch(err => res.status(404).json({ success: false }));
};
