const path = require('path');

module.exports = [
{
  mode: "production",
  entry: [
    './chart.js.mjs'
  ],
  output: {
    filename: './chart.js.js',
    path: __dirname
  },
  optimization: {
    minimize: true
  }
},
{
  mode: "production",
  entry: [
    './fullcalendar.mjs'
  ],
  output: {
    filename: './fullcalendar.js',
    path: __dirname,
/*
    library: {
      name: 'fullcalendar',
      type: 'umd',
    },
*/
  },
  optimization: {
    minimize: true
  },
},
{
  mode: "production",
  entry: [
    './ical-generator.mjs'
  ],
  output: {
    filename: './ical-generator.js',
    path: __dirname,
  },
  resolve: {
    fallback: {
      fs: false,
//      buffer: require.resolve("buffer/"),
    },
/*
    alias: {
      buffer: "buffer",
    },
*/
  },
  optimization: {
    minimize: true,
  }
},
{
  mode: "production",
  entry: [
    './ical.js.mjs'
  ],
  output: {
    filename: './ical.js.js',
    path: __dirname,
  },
  optimization: {
    minimize: true,
  }
},
{
  mode: "production",
  entry: [
    './yamljs.mjs'
  ],
  output: {
    filename: './yamljs.js',
    path: __dirname
  },
  resolve: {
    fallback: {
      fs: false
    }
  },
  optimization: {
    minimize: true
  },
}]

