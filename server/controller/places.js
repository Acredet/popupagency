const Place = require('../models/place')

// @desc  Get all places
// @route GET /api/places
// @access Public
exports.getPlaces = async (req, res, next) => {
  try {
    const places = await Place.find({})
    return res.status(200).json({
      success: true,
      ResultsNumber: places.length,
      data: places
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
}

// @desc  Create a place
// @route POST /api/places
// @access Public
exports.addPlace = async (req, res, next) => {
  try {
    // Delete null values
    for (const key in req.body) {
      const element = req.body[key]
      req.body[key] = element !== 'null' ? element : null
    }

    const newPlace = req.body

    newPlace.userId = req.user.id
    newPlace.title = JSON.parse(newPlace.title)
    newPlace.beskreving = JSON.parse(newPlace.beskreving)
    newPlace.prioteradpris = JSON.parse(newPlace.prioteradpris)
    newPlace.stad = JSON.parse(newPlace.stad)
    newPlace.bildgalleri = req.files['bildgalleri[]'] ? req.files['bildgalleri[]'].map(x => x.filename) : []
    newPlace.cover = req.files['cover[]'] ? req.files['cover[]'].map(x => x.filename) : []
    newPlace.planritning = req.files['planritning[]'] ? req.files['planritning[]'].map(x => x.filename) : []

    console.log(newPlace)

    newPlace.egenskaper = req.body.egenskaper ? req.body.egenskaper.map(x => JSON.parse(x)) : []
    newPlace.kategori = req.body.kategori ? req.body.kategori.map(x => JSON.parse(x)) : []

    // Create Place
    const place = await new Place(newPlace).save()
    res.status(201).json({ success: true, data: place })
  } catch (err) {
    console.error(err)
    if (err.code === 11000) {
      return res.status(400).json({ error: 'This Place already exists' })
    }
    res.status(500).json({ error: 'Server error' })
  }
}

// @desc  Delete a Place
// @route Delete /api/Place/id
// @access Private
exports.deletePlace = (req, res) => {
  Place.findById(req.params.id)
    .then(place => place.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json(err.message))
}

/**
 * @description Get one place
 * @method GET
 * @route /api/place/:id
 * @access Private
 */
exports.getOnePlace = async (req, res) => {
  await Place.findOne({ 'title.sv': req.params.id.replace(/[-]/g, ' ') })
    .then(async (place) => {
      await Place.find({ 'stad.sv': place.stad.sv })
        .then((places) => {
          res.json({ success: true, place, similar: places })
        })
        .catch(err => res.status(404).json(err.message))
    })
    .catch(err => res.status(404).json(err.message))
}

// @desc  update a Place
// @route update /api/Place/id
// @access Private
exports.updatePlace = async (req, res) => {
  for (const key in req.body) {
    const element = req.body[key]
    req.body[key] = element !== 'null' ? element : null
  }
  const updata = req.body

  if (updata.title) {
    updata.title = JSON.parse(updata.title)
  }

  if (updata.stad) {
    updata.stad = JSON.parse(updata.stad)
  }

  console.log(updata.stad)
  if (updata.beskreving) {
    updata.beskreving = JSON.parse(updata.beskreving)
  }
  if (updata.prioteradpris) {
    updata.prioteradpris = JSON.parse(req.body.prioteradpris)
  } else { updata.prioteradpris = 0 }

  if (updata.egenskaper) {
    updata.egenskaper = updata.egenskaper.map(x => JSON.parse(x))
  }

  if (updata.bildgalleri) {
    updata.bildgalleri = JSON.parse(updata.bildgalleri)
  }
  if (updata.cover) {
    updata.cover = JSON.parse(updata.cover)
  }
  if (updata.planritning) {
    updata.planritning = JSON.parse(updata.planritning)
  }

  await Place.updateOne({ _id: req.params.id }, { $set: updata })
    .then(place => res.json({ success: true }))
    .catch(err => res.status(404).json(err.message))
}

/**
 * @description Get Places Added By User
 * @route /api/places/userPlaces
 * @private
 */
exports.getPlacesAddedByUser = async (req, res) => {
  await Place.find({ userId: req.params.userid })
    .then(places => res.status(200).json(places))
    .catch(err => res.status(400).json(err))
}

exports.addWatch = async (req, res) => {
  await Place.updateOne({ _id: req.params.id }, { $inc: { views: 1 } })
    .then(place => res.json({ place }))
    .catch(err => res.status(404).json(err.message))
}
