import { Location } from "../clases/location";
import { Schedule } from "../clases/schedule";

export class ItemNegocioDTO {
    constructor(
        public id: string = '',
        public name: string = '',
        public outstandingImage: string = '',
        public category: string = '',
        public location: Location = new Location('', []),
        public scorePromedy: number = 0,
        public status: string = '',
        ) { }
}
