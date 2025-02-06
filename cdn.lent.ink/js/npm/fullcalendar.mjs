
// ICAL is needed by iCalendarPlugin
// https://github.com/fullcalendar/fullcalendar/blob/master/packages/icalendar/src/main.ts
import * as hack from './polyfills.mjs'

import { Calendar } from '@fullcalendar/core'
import iCalendarPlugin from '@fullcalendar/icalendar'
import timeGridPlugin from '@fullcalendar/timegrid'
import rrulePlugin from '@fullcalendar/rrule'
/*
@fullcalendar/interaction
@fullcalendar/bootstrap
import dayGridPlugin from '@fullcalendar/daygrid'
import listPlugin from '@fullcalendar/list'
// NOTE: google requires API key
import googleCalendarPlugin from '@fullcalendar/google-calendar'
// NOTE: there is simple recurrence build in; https://fullcalendar.io/docs/rrule-plugin
import rrulePlugin from '@fullcalendar/rrule'
*/

let needed = {
	Calendar,
	timeGridPlugin,
	iCalendarPlugin,
	rrulePlugin,
}

if (! window.npm) window.npm = {}
window.npm['fullcalendar'] = needed

