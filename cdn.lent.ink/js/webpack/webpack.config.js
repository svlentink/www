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
    filename: './fullcalendar-v4.js',
    path: __dirname,
    library: {
      name: 'fullcalendarV4',
      type: 'umd',
    },
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
    library: {
      name: 'fullcalendarV4',
      type: 'umd',
    },
  },
  resolve: {
    fallback: {
      fs: false
    },
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
  }
}];

