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
    './fullcalendar-v4.mjs'
  ],
  output: {
    filename: './fullcalendar-v4.js',
    path: __dirname,
/*
    library: {
      name: 'fullcalendarV4',
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
      Buffer: require.resolve("buffer"),
    },
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

