// const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const cors = require('cors')
const { Nuxt, Builder } = require('nuxt')
const nuxtConfig = require('../nuxt.config.js')
const places = require('./routes/places')
const users = require('./routes/users')
const app = express()
// Bodyparser Middleware  cors
app.use(express.json());
app.use(cors());
const connectDB = require("./config/db");
connectDB();
app.use("/api/places", places);
app.use("/api/users", users);

// Import and Set Nuxt.js options
nuxtConfig.dev = true
// process.env.NODE_ENV !== 'production'
app.use(express.json({ extended: true }))
app.use(express.urlencoded({ extended: true }))

async function start () {
  // Init Nuxt.js
  const nuxt = new Nuxt(nuxtConfig)
  const { host, port } = nuxt.options.server
  await nuxt.ready()
  // Build only in dev mode
  if (nuxtConfig.dev) {
    console.log('building')
    const builder = new Builder(nuxt)
    await builder.build()
  }
  // Give nuxt middleware to express
  app.use(nuxt.render)
  // Listen the server
  app.listen(port, host);
  console.log(`Server listening on port:${port}`);
}
start()
