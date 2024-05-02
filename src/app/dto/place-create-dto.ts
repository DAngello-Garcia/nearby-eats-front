export class PlaceCreateDTO {

    constructor(
        public name: string = '',
        public description: string = '',
        public location: string = '',
        public images: string = '',
        public schedule: string = '',
        public phones: string = '',
        public categories: string = '',
        public clientId: string = ''
    ) {}
}
