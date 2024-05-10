import { Schedule } from "../clases/schedule";

export class PlaceCreateDTO {

    constructor(
        public name: string = '',
        public description: string = '',
        public location: string = '',
        public images: string = '',
        public schedule: Schedule[] = [] ,
        public phones: string = '',
        public categories: string = '',
        public clientId: string = ''
    ) {}
}
