export class Location {

    type: string;
    coordinates: number[];

    constructor(type: string, coordinates: number[]) {
        this.type = type;
        this.coordinates = coordinates;
    }
}
