
// ICAL is needed by iCalendarPlugin
// https://github.com/fullcalendar/fullcalendar/blob/master/packages/icalendar/src/main.ts
import * as ICAL from 'ical.js'
window.ICAL = ICAL

import { Calendar } from '@fullcalendar/core'
import iCalendarPlugin from '@fullcalendar/icalendar'
import timeGridPlugin from '@fullcalendar/timegrid'
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
	iCalendarPlugin
}

if (! window.npm) window.npm = {}
window.npm['fullcalendar'] = needed
window.npm['ical.js'] = ICAL

