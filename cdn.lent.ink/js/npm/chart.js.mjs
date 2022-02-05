import * as mod from 'chart.js'
let Chart = mod.Chart
import 'chartjs-adapter-moment';
mod.Chart = Chart
if (! window.npm) window.npm = {}
window.npm['chart.js'] = mod
