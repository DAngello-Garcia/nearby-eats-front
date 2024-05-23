import { Location } from "../clases/location";
import { Schedule } from "../clases/schedule";

export class UpdatePlaceDTO {

    constructor(
        public name: string = '',
        public description: string = '',
        public location: Location = new Location('', []),
        public pictures: string[] = [],
        public schedule: Schedule[] = [],
        public phones: string[] = [],
        public categories: string[] = [],
        public clientId: string = '',
        public placeId: string = ''

    ) { }

}
