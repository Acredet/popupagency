const Place = require("../models/place");
const geocoder = require("../utils/geocoder");

/**
 * @description Get Adderss from coordinates
 * @param { String } country Name
 */
exports.getAddressByCountryName = async (req, res, next) => {
  try {
    // Geocode Address
    const loc = await geocoder.geocode(req.body.country);
    res.status(201).json(loc);
  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      return res.status(400).json({ error: "This Place already exists" });
    }
    res.status(500).json({ error: "Server error" });
  }
};

/**
 * @description Get Adderss from coordinates
 * @param { Number } lng
 * @param { Number } lat
 * @return { String } Address
 */
exports.getAddress = async (req, res, next) => {
  try {
    // Geocode Address
    const location = req.body.location;
    const loc = await geocoder.reverse({
      lat: Number(location.lat),
      lon: Number(location.lng),
    });

    res.status(201).json({
      coordinates: [loc[0].longitude, loc[0].latitude],
      formattedAddress: loc[0].formattedAddress,
    });
  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      return res.status(400).json({ error: "This Place already exists" });
    }
    res.status(500).json({ error: "Server error" });
  }
};

/**
 * @description Get all published places
 * @method get
 * @route /api/places
 * @access Public
 */
exports.getPublishedPlaces = async (req, res, next) => {
  try {
    const places = await Place.find({ draft: false });
    return res.status(200).json({
      success: true,
      ResultsNumber: places.length,
      data: places,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

/**
 * @description Get user Draft places
 * @method get
 * @route /api/places/draft
 * @access Private
 */
exports.getDraftPlaces = async (req, res, next) => {
  try {
    const places = await Place.find({ userId: req.user.id, draft: true });
    return res.status(200).json({
      success: true,
      ResultsNumber: places.length,
      data: places,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

/**
 * @description Get one place
 * @method GET
 * @route /api/places/:id
 * @access Private
 */
exports.getOnePlace = async (req, res) => {
  await Place.findOne({ "title.sv": req.params.id.replace(/[-]/g, " ") })
    .then(async (place) => {
      await Place.find({ "stad.sv": place.stad.sv })
        .then((places) => {
          res.json({ success: true, place, similar: places });
        })
        .catch((err) => res.status(404).json(err.message));
    })
    .catch((err) => res.status(404).json(err.message));
};

/**
 * @description Create a place
 * @method POST
 * @route /api/places/
 * @access Private
 */
exports.addPlace = async (req, res, next) => {
  try {
    // Delete null values
    for (const key in req.body) {
      const element = req.body[key];
      req.body[key] = element !== "null" ? element : null;
    }

    // Geocode Address
    let routeGuidance = JSON.parse(req.body.routeGuidance);
    const loc = await geocoder.reverse({
      lat: Number(routeGuidance.lat),
      lon: Number(routeGuidance.lng),
    });
    routeGuidance = {
      coordinates: [loc[0].longitude, loc[0].latitude],
      formattedAddress: loc[0].formattedAddress,
    };

    const newPlace = req.body;

    console.log(req.files);

    newPlace.userId = req.user.id;
    newPlace.title = JSON.parse(newPlace.title);
    newPlace.beskreving = JSON.parse(newPlace.beskreving);
    newPlace.prioteradpris = JSON.parse(newPlace.prioteradpris);
    newPlace.stad = JSON.parse(newPlace.stad);
    newPlace.bildgalleri = req.files["bildgalleri[]"]
      ? req.files["bildgalleri[]"].map((x) => x.filename)
      : [];
    newPlace.cover = req.files["cover[]"]
      ? req.files["cover[]"].map((x) => x.filename)
      : [];
    newPlace.planritning = req.files["planritning[]"]
      ? req.files["planritning[]"].map((x) => x.filename)
      : [];
    newPlace.egenskaper = req.body.egenskaper
      ? req.body.egenskaper.map((x) => JSON.parse(x))
      : [];
    newPlace.kategori = req.body.kategori
      ? req.body.kategori.map((x) => JSON.parse(x))
      : [];
    newPlace.routeGuidance = routeGuidance;

    // Create Place
    const place = await new Place(newPlace).save();
    res.status(201).json({ success: true, data: place });
  } catch (err) {
    console.error(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: "This Place already exists" });
    }
    res.status(500).json({ error: err });
  }
};

// @desc  Delete a Place
// @route Delete /api/places/id
// @access Private
exports.deletePlace = (req, res) => {
  Place.findById(req.params.id)
    .then((place) => place.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json(err.message));
};

exports.deleteAllPlace = (req, res) => {
  Place.deleteMany({})
    .then((place) => res.json({ success: true }))
    .catch((err) => res.status(404).json(err.message));
};

/**
 * @description Update a Place
 * @method PATCH
 * @route /api/places/:placeid
 * @access Private
 */
exports.updatePlace = async (req, res) => {
  for (const key in req.body) {
    const element = req.body[key];
    req.body[key] = element !== "null" ? element : null;
  }
  const updata = req.body;

  console.log(req.body);

  if (updata.title) {
    updata.title = JSON.parse(updata.title);
  }

  if (updata.stad) {
    updata.stad = JSON.parse(updata.stad);
  }

  if (updata.beskreving) {
    updata.beskreving = JSON.parse(updata.beskreving);
  }
  if (updata.prioteradpris) {
    updata.prioteradpris = JSON.parse(req.body.prioteradpris);
  } else {
    updata.prioteradpris = 0;
  }

  if (updata.egenskaper) {
    updata.egenskaper = updata.egenskaper.map((x) => JSON.parse(x));
  }

  if (updata.bildgalleri) {
    updata.bildgalleri = JSON.parse(updata.bildgalleri);
  }
  if (updata.cover) {
    updata.cover = JSON.parse(updata.cover);
  }
  if (updata.planritning) {
    updata.planritning = JSON.parse(updata.planritning);
  }

  if (updata.routeGuidance) {
    const location = JSON.parse(updata.routeGuidance);
    const loc = await geocoder.reverse({
      lat: Number(location.lat),
      lon: Number(location.lng),
    });

    updata.routeGuidance = {
      coordinates: [loc[0].longitude, loc[0].latitude],
      formattedAddress: loc[0].formattedAddress,
    };
  }

  await Place.updateOne({ _id: req.params.id }, { $set: updata })
    .then((place) => res.json({ success: true }))
    .catch((err) => res.status(404).json(err.message));
};

/**
 * @description Get Places Added By User
 * @route /api/places/userPlaces
 * @private
 */
exports.getPlacesAddedByUser = async (req, res) => {
  await Place.find({ userId: req.params.userid, draft: false })
    .then((places) => res.status(200).json(places))
    .catch((err) => res.status(400).json(err));
};

/**
 * @description Increase place views
 * @route /api/places/view/:id
 * @method POST
 * @public
 */
exports.addWatch = async (req, res) => {
  await Place.updateOne({ _id: req.params.id }, { $inc: { views: 1 } })
    .then((place) => res.json({ place }))
    .catch((err) => res.status(404).json(err.message));
};
