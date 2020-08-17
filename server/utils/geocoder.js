const NodeGeocoder = require('node-geocoder')
require('dotenv')

const options = {
  provider: 'google',
  httpAdapter: 'https',
  apiKey: process.env.VUE_APP_GOOGLE_MAPS_API_KEY, // for Mapquest, OpenCage, Google Premier
  formatter: null
}

const geocoder = NodeGeocoder(options)

module.exports = geocoder
