import { Component } from '@angular/core';

@Component({
    selector: 'calendar-app',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent {
    public days: Array<Date>;
    public availableSlots: Array<Date> = [];
    public selectedSlot: any = null;

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
    findFreeTimeslots = (dayIndex: any) => {
        if (+dayIndex === -1) {
            this.availableSlots = [];
        } else {
            const selectedDate: Date = new Date(this.days[dayIndex]);

            const start: Date = this.createDateWithTime(
                selectedDate,
                this.DAY_START
            );
            const end: Date = this.createDateWithTime(
                selectedDate,
                this.DAY_END
            );
            const lunchStart: Date = this.createDateWithTime(
                selectedDate,
                this.LUNCH_START
            );
            const lunchEnd: Date = this.createDateWithTime(
                selectedDate,
                this.LUNCH_END
            );

            this.availableSlots = this.generateSlots(
                start,
                end,
                lunchStart,
                lunchEnd
            );
            this.removeTakenSlots(selectedDate);
        }
    };

    getDates = (): Array<Date> => {
        let days: Array<Date> = [];
        for (
            let i = new Date(this.searchRange.from);
            i < new Date(this.searchRange.to);
            i.setDate(i.getDate() + 1)
        ) {
            days.push(new Date(i));
        }
        return days;
    };

    createDateWithTime = (date: Date, time: String): Date => {
        return new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            +time.substring(0, 2),
            +time.substring(3, 5)
        );
    };

    generateSlots = (
        start: Date,
        end: Date,
        lunchStart: Date,
        lunchEnd: Date
    ) => {
        let slots: Array<Date> = [];

        for (
            let currentSlot = start;
            currentSlot < end;
            currentSlot.setMinutes(currentSlot.getMinutes() + 30)
        ) {
            if (
                currentSlot.getTime() <= lunchStart.getTime() - 30 * 60000 ||
                currentSlot.getTime() >= lunchEnd.getTime()
            ) {
                slots.push(new Date(currentSlot.getTime()));
            }
        }

        return slots;
    };

    removeTakenSlots = (selectedDate: Date) => {
        let takenSlots: Array<any> = [];

        for (let i = 0; i < this.availableSlots.length; i++) {
            const currentSlot = this.availableSlots[i].getTime() + 30 * 60000;

            this.weeklyAppointments.forEach((appointment) => {
                const takenSlotFrom: Date = new Date(appointment.from);
                const takenSlotTo: Date = new Date(appointment.to);

                // if its not the same day
                if (takenSlotFrom.getDay() != selectedDate.getDay()) {
                    return;
                }

                if (
                    currentSlot > takenSlotFrom.getTime() &&
                    currentSlot <= takenSlotTo.getTime()
                ) {
                    takenSlots.push(i);
                    return;
                }
            });
        }

        for (var i = takenSlots.length - 1; i >= 0; i--) {
            this.availableSlots.splice(takenSlots[i], 1);
        }
    };

    selectSlot = (slotIndex: any) => {
        if (+slotIndex === -1) {
            this.selectedSlot = null;
        } else {
            this.selectedSlot = this.availableSlots[slotIndex];
        }
    };

    bookSlot = () => {
        alert('You have successfully booked an appointment!');
    };
}
