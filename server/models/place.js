const mongoose = require('mongoose')
// const { min } = require("~/static/plugins/moment/moment");
// const geocoder = require("../utils/geocoder");

const PlaceSchema = new mongoose.Schema({
  beskreving: {
    type: String
  },
  bildgalleri: {
    type: Array,
    default: []
  },
  cover: {
    type: Array,
    default: []
  },
  Epost: {
    type: String
  },
  prisperdag: {
    type: Number,
    min: 0
  },
  prisperhelg: {
    type: Number,
    min: 0
  },
  prisperlanghelg: {
    type: Number,
    min: 0
  },
  prispervecka: {
    type: Number,
    min: 0
  },
  prispermanad: {
    type: Number,
    min: 0
  },
  prioteradpris: {
    type: Number,
    min: 0
  },
  egenskaper: {
    type: Array,
    default: []
  },
  yta: {
    type: Number,
    min: 0
  },
  placering: {
    type: String
  },
  stad: {
    type: String
  },
  plats: {
    type: String
  },
  location: {
    type: {
      type: String,
      enum: ['Point']
    },
    coordinates: {
      type: [Number],
      index: '2dsphere'
    },
    formattedAddress: String
  },
  kategori: {
    type: Array,
    default: []
  },
  planritning: {
    type: Array,
    default: []
  },
  minstahyresperiod: {
    type: String
  },
  langstahyresperiod: {
    type: String
  },
  fasta: {
    type: Boolean
  },
  butik: {
    type: Boolean
  },
  mat: {
    type: Boolean
  },
  event: {
    type: Boolean
  },
  SasongBoxen: {
    type: String
  },
  hemsida: {
    type: String
  },
  centrumtextarea: {
    type: String
  },
  oppettider: [
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
  timezone: {
    type: String
  },
  vagvisningen: {
    type: String
  },
  centrumgalleri: {
    type: String
  },
  fran: {
    type: Date
  },
  till: {
    type: Date
  },
  kontaktperson: {
    type: String
  },
  expiry: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

// Geocode & create location
/* PlaceSchema.pre("save", async function(next) {
  const loc = await geocoder.geocode(this.address);
  this.location = {
    type: "Point",
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress
  };

  // Do not save address
  this.address = undefined;
  next();
}); */

module.exports = mongoose.model('Place', PlaceSchema)
