const Place = require("../models/place");
// @desc  Get all places
// @route GET /api/places
// @access Public
exports.getPlaces = async (req, res, next) => {
  try {
    const places = await Place.find({});
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
    let place = new Place({
      title: req.body.title,
      beskreving: req.body.beskreving,
      bildgalleri: req.files['bildgalleri[]'] ? req.files['bildgalleri[]'].map(x => x.filename) : [],
      cover: req.files['cover[]'] ? req.files['cover[]'].map(x => x.filename) : [],
      epost: req.body.epost,
      prisperdag: req.body.prisperdag,
      prisperhelg: req.body.prisperhelg,
      prisperlanghelg: req.body.prisperlanghelg,
      prispervecka: req.body.prispervecka,
      prispermanad: req.body.prispermanad,
      prioteradpris: req.body.prioteradpris,
      egenskaper: req.body.egenskaper,
      yta: req.body.yta,
      placering: req.body.placering,
      stad: req.body.stad,
      plats: req.body.plats,
      location: req.body.location,
      kategori: req.body.kategori,
      planritning: req.files['planritning[]'] ? req.files['planritning[]'].map(x => x.filename) : [],
      minstahyresperiod: req.body.minstahyresperiod,
      langstahyresperiod: req.body.langstahyresperiod,
      fasta: req.body.fasta,
      butik: req.body.butik,
      mat: req.body.mat,
      event: req.body.event,
      sasongBoxen: req.body.sasongBoxen,
      hemsida: req.body.hemsida,
      centrumtextarea: req.body.centrumtextarea,
      oppettider: req.body.oppettider.map(x => JSON.parse(x)),
      timezone: 'timezone',
      vagvisningen: req.body.vagvisningen,
      centrumgalleri: req.files['centrumgalleri[]'] ? req.files['centrumgalleri[]'].map(x => x.filename) : [],
      fran: req.body.fran,
      till: req.body.till,
      kontaktperson: req.body.kontaktperson,
      expiry: req.body.expiry,
    })
    place = await place.save()
    res.status(201).json({
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


// @desc  Delete a Place
// @route Delete /api/Place/id
// @access Private
exports.deletePlace = (req, res) => {
  Place.findById(req.params.id)
    .then(place => place.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
};

// @desc  update a Place
// @route update /api/Place/id
// @access Private
exports.updatePlace = (req, res) => {
  Place.updateOne({ _id: req.params.id }, { $set: req.body })
    .then(place => res.json({ success: true }))
    .catch(err => res.status(404).json({ success: false }));
};
