const Place = require('../models/place')
const geocoder = require('../utils/geocoder')

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

/**
 * @description Get Adderss from coordinates
 * @param { Number } lng
 * @param { Number } lat
 * @return { String } Address
*/
exports.getAddress = async (req, res, next) => {
  try {
    // Geocode Address
    const location = req.body.location
    const loc = await geocoder.reverse({ lat: Number(location.lat), lon: Number(location.lng) })

    res.status(201).json({
      coordinates: [loc[0].longitude, loc[0].latitude],
      formattedAddress: loc[0].formattedAddress
    })
  } catch (error) {
    console.error(error)
    if (error.code === 11000) {
      return res.status(400).json({ error: 'This Place already exists' })
    }
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

    // Geocode Address
    let location = JSON.parse(req.body.location)
    const loc = await geocoder.reverse({ lat: Number(location.lat), lon: Number(location.lng) })
    console.log('After Geo: ', loc)
    location = {
      coordinates: [loc[0].longitude, loc[0].latitude],
      formattedAddress: loc[0].formattedAddress
    }

    console.log('req.user: ', req.user)
    // Create Place
    let place = new Place({
      userId: req.user.id,
      title: {
        en: JSON.parse(req.body.title).en,
        sv: JSON.parse(req.body.title).sv
      },
      beskreving: {
        en: JSON.parse(req.body.beskreving).en,
        sv: JSON.parse(req.body.beskreving).sv
      },
      bildgalleri: req.files['bildgalleri[]'] ? req.files['bildgalleri[]'].map(x => x.filename) : [],
      cover: req.files['cover[]'] ? req.files['cover[]'].map(x => x.filename) : [],
      epost: req.body.epost,
      prisperdag: req.body.prisperdag,
      prisperhelg: req.body.prisperhelg,
      prisperlanghelg: req.body.prisperlanghelg,
      prispervecka: req.body.prispervecka,
      prispermanad: req.body.prispermanad,
      prioteradpris: req.body.prioteradpris,
      egenskaper: req.body.egenskaper ? req.body.egenskaper.map(x => JSON.parse(x)) : [],
      yta: req.body.yta,
      placering: req.body.placering,
      stad: {
        en: JSON.parse(req.body.stad).en,
        sv: JSON.parse(req.body.stad).sv
      },
      plats: req.body.plats,
      location,
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
      expiry: req.body.expiry
    })

    place = await place.save()
    res.status(201).json({
      success: true,
      data: place
    })
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
  await Place.findOne({ 'title.sv': req.params.id })
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
    updata.title = {
      en: JSON.parse(updata.title).en,
      sv: JSON.parse(updata.title).sv
    }
  }

  if (updata.stad) {
    updata.stad = {
      en: JSON.parse(updata.stad).en,
      sv: JSON.parse(updata.stad).sv
    }
  }

  console.log(updata.stad)
  if (updata.beskreving) {
    updata.beskreving = {
      en: JSON.parse(updata.beskreving).en,
      sv: JSON.parse(updata.beskreving).sv
    }
  }

  if (updata.egenskaper) {
    updata.egenskaper = updata.egenskaper.map(x => JSON.parse(x))
  }

  if (updata.oppettider) {
    updata.oppettider = updata.oppettider.map(x => JSON.parse(x))
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
  if (updata.centrumgalleri) {
    updata.centrumgalleri = JSON.parse(updata.centrumgalleri)
  }
  if (!updata.prioteradpris) { updata.prioteradpris = 0 }

  // Geocode Address
  if (updata.location) {
    const location = JSON.parse(updata.location)
    const loc = await geocoder.reverse({ lat: Number(location.lat), lon: Number(location.lng) })
    console.log('After Geo: ', loc)
    updata.location = {
      coordinates: [loc[0].longitude, loc[0].latitude],
      formattedAddress: loc[0].formattedAddress
    }
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
