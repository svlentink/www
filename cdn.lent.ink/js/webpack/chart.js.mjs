import * as mod from 'chart.js'

// https://webpack.js.org/guides/author-libraries/
// https://stackoverflow.com/questions/49562978/how-to-use-npm-modules-in-browser-is-possible-to-use-them-even-in-local-pc
// https://stackoverflow.com/questions/51023231/npm-browserify-import-and-export-may-appear-only-with-sourcetype-module
if (! window.npm) window.npm = {}
window.npm['chart.js'] = mod
