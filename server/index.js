// const path = require('path')
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const { Nuxt, Builder } = require("nuxt");
const nuxtConfig = require("../nuxt.config.js");
const places = require("./routes/places");
const users = require("./routes/users");
const region = require("./routes/region");
const tag = require("./routes/tag");
const category = require("./routes/category");
const app = express();

// Bodyparser Middleware  cors
app.use(express.json());
app.use(cors());
const connectDB = require("./config/db");
connectDB();
app.use("/api/places", places);
app.use("/api/users", users);
app.use("/api/region", region);
app.use("/api/category", category);
app.use("/api/tag", tag);

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

// Export express app
module.exports = app


// Import and Set Nuxt.js options
// nuxtConfig.dev = process.env.NODE_ENV !== 'production';
// async function start() {
//   // Init Nuxt.js
//   const nuxt = new Nuxt(nuxtConfig);
//   // const { host, port } = nuxt.options.server;
//   await nuxt.ready();
//   // Build only in dev mode
//   if (nuxtConfig.dev) {
//     console.log("building");
//     const builder = new Builder(nuxt);
//     await builder.build();
//   }
//   // Give nuxt middleware to express
//   app.use(nuxt.render);
//   // Listen the server
//   const port = process.env.PORT || 3000
//   app.listen(port);

//   console.log(`Server listening on port:${port}`);
// }
// start();
