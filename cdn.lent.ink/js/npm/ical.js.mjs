import * as hack from './polyfills.mjs'
import * as mod from 'ical.js'
if (!window.npm) window.npm = {}
window.npm['ical.js'] = mod
