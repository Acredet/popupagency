const mongoose = require('mongoose')

const CentrumSchema = new mongoose.Schema({
  hemsida: {
    type: String,
    required: true
  },
  centrumgalleri: {
    type: Array,
    requireq: true
  },
  centrumtextarea: {
    type: String,
    required: true
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
  routeGuidance: {
    coordinates: {
      type: [Number],
      index: '2dsphere'
    },
    formattedAddress: {
      type: String,
      required: true
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Centrum', CentrumSchema)
