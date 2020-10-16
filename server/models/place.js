const mongoose = require('mongoose')

const PlaceSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  title: {
    en: {
      type: String,
      // required: true,
      unique: true
    },
    sv: {
      type: String,
      // required: true,
      unique: true
    }
  },
  beskreving: {
    en: String,
    sv: String
  },
  bildgalleri: Array,
  cover: Array,
  epost: String,
  prisperdag: { // ✔
    type: Number,
    min: 0
  },
  prisperhelg: { // ✔
    type: Number,
    min: 0
  },
  prisperlanghelg: { // ✔
    type: Number,
    min: 0
  },
  prispervecka: { // ✔
    type: Number,
    min: 0
  },
  prispermanad: { // ✔
    type: Number,
    min: 0
  },
  prioteradpris: { // ✔
    period: {
      type: String
    },
    val: {
      type: Number,
      min: 0
    }
  },
  egenskaper: [Object],
  yta: { // ✔
    type: Number,
    min: 0
  },
  placering: String,
  stad: {
    en: String,
    sv: String
  },
  plats: String,
  kategori: Array,
  planritning: Array,
  minstahyresperiod: String,
  langstahyresperiod: String,
  fasta: Boolean,
  butik: Boolean,
  mat: Boolean,
  event: Boolean,
  sasongBoxen: String,
  timezone: String,
  vagvisningen: String,
  centrumgalleri: Array,
  fran: Date,
  till: Date,
  kontaktperson: String,
  expiry: Date,
  views: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Place', PlaceSchema)
