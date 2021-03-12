import { Component } from '@angular/core';

@Component({
    selector: 'calendar-app',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent {
    public days: Array<Date>;

    constructor() {
        this.days = this.getDates();
    }

    // This is the range where our patient wants to have an appointment
    searchRange = { from: '2021-01-04', to: '2021-01-07' };

    // The dentists' current appointments, these times are blocked.
    weeklyAppointments = [
        { from: '2021-01-04T10:15:00', to: '2021-01-04T10:30:00' },
        { from: '2021-01-05T11:00:00', to: '2021-01-05T11:30:00' },
        { from: '2021-01-05T15:30:00', to: '2021-01-05T16:30:00' },
        { from: '2021-01-06T10:00:00', to: '2021-01-06T10:30:00' },
        { from: '2021-01-06T11:00:00', to: '2021-01-06T12:30:00' },
        { from: '2021-01-06T17:30:00', to: '2021-01-06T18:00:00' },
    ];

    // FIXME: actual date objects could be useful... (ಠ⌣ಠ)
    DAY_START = '08:00';
    DAY_END = '18:00';
    LUNCH_START = '12:00';
    LUNCH_END = '13:00';

    // TODO: implement this
    findFreeTimeslots = () => [];

    getDates = () => {
        let days: Array<Date> = [];
        for (let i = new Date(this.searchRange.from); i < new Date(this.searchRange.to); i.setDate(i.getDate() + 1)) {
            days.push(new Date(i));
        }
        return days;
    }
}
