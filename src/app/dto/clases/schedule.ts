export class Schedule {

    weekday: string;
    openingTime: string;
    closingTime: string;

    constructor(weekday: string, openingTime: string, closingTime: string) {
        this.weekday = weekday;
        this.openingTime = openingTime;
        this.closingTime = closingTime;
    }
}
