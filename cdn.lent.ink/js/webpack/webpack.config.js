const path = require('path');

module.exports = [
{
  mode: "production",
  entry: [
    './chart.js.mjs'
  ],
  output: {
    filename: '../chart.js.mjs',
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
    filename: '../fullcalendar-v4.mjs',
    path: __dirname
  },
  optimization: {
    minimize: true
  }
},
{
  mode: "production",
  entry: [
    './ical-generator.mjs'
  ],
  output: {
    filename: '../ical-generator.mjs',
    path: __dirname
  },
  resolve: {
    fallback: {
      fs: false
    }
  },
  optimization: {
    minimize: true
  }
},
{
  mode: "production",
  entry: [
    './yamljs.mjs'
  ],
  output: {
    filename: '../yamljs.mjs',
    path: __dirname
  },
  optimization: {
    minimize: true
  }
}];

