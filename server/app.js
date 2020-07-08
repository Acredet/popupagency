const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();

// Bodyparser Middleware  cors
app.use(cors());
app.get("/api/places", (req, res) => {
  res.send("hello places");
});

const { Nuxt, Builder } = require("nuxt");

// Import and Set Nuxt.js options
const nuxtConfig = require("../nuxt.config");
nuxtConfig.dev = process.env.NODE_ENV !== "production";

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(nuxtConfig);
  const { host, port } = nuxt.options.server;
  await nuxt.ready();
  // Build only in dev mode
  if (nuxtConfig.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  }
  // Give nuxt middleware to express
  app.use(nuxt.render);
  // Listen the server
  app.listen(port, host);
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  });
}
start();
