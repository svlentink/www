const path = require('path');

module.exports = {
  mode: "none",
  entry: [
    './editor/editor.js',
    './personas/personas.js',
    './routines/routines.js',
    './tmm/tmm.js',
    './values/values.js',
    './shared.js'
  ],
  output: {
    filename: 'bundled.js',
    path: __dirname
  }
};