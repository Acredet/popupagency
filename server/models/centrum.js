const mongoose = require('mongoose')

const CentrumSchema = new mongoose.Schema({
  hemsida: String,
  centrumgalleri: Array,
  centrumtextarea: String,
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
  routeGuidance: {
    coordinates: {
      type: [Number],
      index: '2dsphere'
    },
    formattedAddress: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Centrum', CentrumSchema)
