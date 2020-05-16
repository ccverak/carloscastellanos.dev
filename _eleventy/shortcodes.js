const fs = require("fs");
const path = require("path");

const manifestPath = path.resolve(__dirname, "..", "dist", "assets", "manifest.json");
const manifest = JSON.parse(
  fs.readFileSync(manifestPath, { encoding: "utf8" })
);

module.exports = {
  manifestPath,
  

  // Adds a universal shortcode to return the URL to a webpack asset. In Nunjack templates:
  // {% webpackAsset 'main.js' %} or {% webpackAsset 'main.css' %}
  webpackAsset: (name) => {
    if (!manifest[name]) {
      throw new Error(`The asset ${name} does not exist in ${manifestPath}`);
    }
    return manifest[name];
  }
};
