export class Review {
    moderatorId: string;
    date: string;
    action: string;
    commentary: string;

    constructor(moderatorId: string, date: string, action: string, commentary: string) {
        this.moderatorId = moderatorId
        this.date = date
        this.action = action
        this.commentary = commentary
    }
}
