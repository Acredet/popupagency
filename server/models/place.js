const mongoose = require('mongoose')
// const { min } = require("~/static/plugins/moment/moment");
const geocoder = require("../utils/geocoder");

const PlaceSchema = new mongoose.Schema({
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
    type: Number,
    min: 0
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
  location: {
    type: String
    // type: {
    //   type: String,
    //   enum: ['Point']
    // },
    // coordinates: {
    //   type: [Number],
    //   index: '2dsphere'
    // },
    // formattedAddress: String
  },
  kategori: Array,
  planritning: Array,
  minstahyresperiod: String,
  langstahyresperiod: String,
  fasta: Boolean,
  butik: Boolean,
  mat: Boolean,
  event: Boolean,
  sasongBoxen: String,
  hemsida: String,
  centrumtextarea: String,
  oppettider: [ // ✔
    {
      day: String,
      oppettider: String,
      times: [
        {
          opening: String,
          closing: String
        }
      ]
    }
  ],
  timezone: String,
  vagvisningen: String,
  centrumgalleri: Array,
  fran: Date,
  till: Date,
  kontaktperson: String,
  expiry: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
})

// Geocode & create location
PlaceSchema.pre("save", async function(next) {
  const loc = await geocoder.geocode(this.plats);
  console.log(loc);
  // this.location = {
  //   type: "Point",
  //   coordinates: [loc[0].longitude, loc[0].latitude],
  //   formattedAddress: loc[0].formattedAddress
  // };

  // // Do not save plats
  this.plats = loc;
  next();
});

module.exports = mongoose.model('Place', PlaceSchema)
