const Centrum = require("../models/centrum");

/**
 * @desc Get one Centrums
 * @route GET /api/centrum/:id
 * @access Public
 */
exports.getOneCentrum = async (req, res, next) => {
  try {
    const centrum = await Centrum.findById(req.params.id);
    return res.status(200).json(centrum);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

/**
 * @desc Get all Centrums
 * @route GET /api/centrum
 * @access Public
 */
exports.getCentrums = async (req, res, next) => {
  try {
    const centrum = await Centrum.find();
    return res.status(200).json({
      success: true,
      ResultsNumber: centrum.length,
      data: centrum,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

/**
 * @desc Create a centrum
 * @route POST /api/centrum
 * @param { String } centrumtextarea
 * @param { String } hemsida
 * @param { Array } oppettider oppning times
 * @param { Array } centrumgalleri images for the centrum
 * @access Public
 */
exports.addCentrum = async (req, res, next) => {
  const {
    centrumtextarea,
    centrumgalleri,
    oppettider,
    hemsida,
    title,
  } = req.body;

  try {
    const centrum = new Centrum({
      centrumgalleri: JSON.parse(centrumgalleri),
      oppettider: oppettider.map((x) => JSON.parse(x)),
      centrumtextarea: JSON.parse(centrumtextarea),
      title: JSON.parse(title),
      hemsida,
    });
    await centrum
      .save()
      .then((_) => res.status(201).json({ success: true, data: centrum }))
      .catch((err) => res.status(400).json(err));
  } catch (err) {
    console.error(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: "This centrum already exists" });
    }
    res.status(500).json({ error: "Server error" });
  }
};

/**
 * @desc  Delete a Centrum
 * @route Delete /api/Centrum/id
 * @access Private
 */
exports.deleteCentrum = (req, res) => {
  Centrum.findById(req.params.id)
    .then((centrum) => centrum.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json(err.message));
};

/**
 * @desc  update a Centrum
 * @route update /api/Centrum/id
 * @access Private
 */
exports.updateCentrum = async (req, res) => {
  for (const key in req.body) {
    const element = req.body[key];
    req.body[key] = element !== "null" ? element : null;
  }
  const updata = req.body;

  if (updata.centrumgalleri) {
    updata.centrumgalleri = JSON.parse(updata.centrumgalleri);
  }

  if (updata.oppettider) {
    updata.oppettider = updata.oppettider.map((x) => JSON.parse(x));
  }

  if (updata.centrumtextarea) {
    updata.centrumtextarea = JSON.parse(updata.centrumtextarea);
  }

  if (updata.title) {
    updata.title = JSON.parse(updata.title);
  }

  await Centrum.updateOne({ _id: req.params.id }, { $set: updata })
    .then((centrum) => res.json({ success: true }))
    .catch((err) => res.status(404).json(err.message));
};
