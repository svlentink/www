//const path = require('path')
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")

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
    './marked.mjs'
  ],
  output: {
    filename: './marked.js',
    path: __dirname
  },
  optimization: {
    minimize: true
  }
},

{
  mode: "production",
  entry: [
    './dompurify.mjs'
  ],
  output: {
    filename: './dompurify.js',
    path: __dirname
  },
  optimization: {
    minimize: true
  }
},

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
    minimize: true,
  },
  // https://stackoverflow.com/questions/64557638/how-to-polyfill-node-core-modules-in-webpack-5
  resolve: {
    fallback: {
      "fs": false,
      "tls": false,
      "net": false,
      "path": false,
      "zlib": false,
      "http": false,
      "https": false,
      "stream": false,
      "crypto": false,
    },
  },
  plugins: [
    new NodePolyfillPlugin()
  ],
},

{
  mode: "production",
  entry: [
    './exifreader.mjs'
  ],
  output: {
    filename: './exifreader.js',
    path: __dirname
  },
  optimization: {
    minimize: true,
  },
  // https://github.com/mattiasw/ExifReader
  resolve: {
    fallback: {
      "Buffer": false,
      "buffer": false,
    },
  },
},

{
  mode: "production",
  entry: [
    './exif-js.mjs'
  ],
  output: {
    filename: './exif-js.js',
    path: __dirname
  },
  optimization: {
    minimize: true,
  },
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

