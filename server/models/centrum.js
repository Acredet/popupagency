const mongoose = require("mongoose");

const CentrumSchema = new mongoose.Schema({
  title: {
    en: {
      type: String,
      required: true,
    },
    sv: {
      type: String,
      required: true,
    },
  },
  hemsida: {
    type: String,
    required: true,
  },
  centrumgalleri: {
    type: Array,
    requireq: true,
  },
  centrumtextarea: {
    en: {
      type: String,
      required: true,
    },
    sv: {
      type: String,
      required: true,
    },
  },
  oppettider: [
    {
      day: String,
      oppettider: String,
      times: [
        {
          opening: String,
          closing: String,
        },
      ],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Centrum", CentrumSchema);
