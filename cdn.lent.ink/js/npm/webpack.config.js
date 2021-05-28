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
/*
{
  mode: "production",
  entry: [
    './exif.mjs'
  ],
  output: {
    filename: './exif.js',
    path: __dirname
  },
  optimization: {
    minimize: true
  },
  resolve: {
    fallback: {
      "assert": false,
      "util": false,
    }
  }
},
*/
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
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' },
      { test: /\.css$/, use: ['style-loader','css-loader'] },
    ],
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
//*/
  },
  optimization: {
    minimize: true,
  }
},
{
  mode: "production",
  entry: [ /*{
    polyfills: './polyfills.js',
    index:*/ './ical.js.mjs',
//  },
  ],
  output: {
    filename: './ical.js.js',
    path: __dirname,
  },
  optimization: {
    minimize: true,
  },
/*
  resolve: {
    fallback: {
      ICAL: false,
    },
  },
//*/
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

