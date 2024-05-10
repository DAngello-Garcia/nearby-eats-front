import { Location } from "../location";
import { Schedule } from "../schedule";

export class UpdatePlaceDTO {

    constructor(
        public name: string = '',
        public description: string = '',
        public location: Location = new Location('', []),
        public images: string[] = [],
        public schedule: Schedule[] = [],
        public phones: string = '',
        public categories: string[] = [],
        public clientId: string = '',
        public placeId: string = ''

    ) { }

}
