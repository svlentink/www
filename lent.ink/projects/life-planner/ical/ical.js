/* @license GPLv3 */
//https://github.com/sebbo2002/ical-generator
import ical from 'ical-generator';

(function (glob) { // IIFE pattern
  'use strict';

glob.ical = ical
/*
//the following is raw test data copied from github
event.repeating({
    freq: 'MONTHLY', // required
    count: 5,
    interval: 2,
    until: new Date('Jan 01 2014 00:00:00 UTC'),
    byDay: ['su', 'mo'], // repeat only sunday and monday
    byMonth: [1, 2], // repeat only in january und february,
    byMonthDay: [1, 15], // repeat only on the 1st and 15th
    exclude: [new Date('Dec 25 2013 00:00:00 UTC')] // exclude these dates
});

cal.prodId({
    company: 'My Company',
    product: 'My Product',
    language: 'EN' // optional, defaults to EN
});

cal.createEvent({
    start: moment(),
    end: moment().add(1, 'hour'),
    summary: 'Example Event',
    description: 'It works ;)',
    location: 'my room',
    url: 'http://sebbo.net/'
});

// create a new event
const event = cal.createEvent({
    start: moment(),
    end: moment().add(1, 'hour'),
    timestamp: moment(),
    summary: 'My Event',
    organizer: 'Sebastian Pekarek <mail@example.com>'
});

// like above, you can also set/change values like this…
event.summary('My Super Mega Awesome Event');

// get the iCal string
cal.toString(); // --> "BEGIN:VCALENDAR…"

const cal = ical({
    domain: 'sebbo.net',
    prodId: {company: 'superman-industries.com', product: 'ical-generator'},
    name: 'My Testfeed',
    timezone: 'Europe/Berlin'
});

const event = cal.createEvent({
    start: moment(),
    end: moment().add(1, 'hour'),
    timestamp: moment(),
    summary: 'My Event',
    organizer: 'Sebastian Pekarek <mail@example.com>'
});

event.createCategory({
    name: 'MEETING'
});

const cal = ical();
const event = cal.createEvent({summary: 'My Event'});

// overwrite event summary
event.summary('Your Event');

const cal = ical({domain: 'github.com', name: 'my first iCal'});
*/

}(typeof window !== 'undefined' ? window : global))
