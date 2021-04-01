//window.Buffer = require('buffer/').Buffer
import { Buffer } from 'buffer/'
window.Buffer = Buffer

import * as mod from 'ical-generator'
if (! window.npm) window.npm = {}
window.npm['ical-generator'] = mod
