import { Location } from "../clases/location";
import { Schedule } from "../clases/schedule";

export class ItemNegocioDTO {
    constructor(
        public id: string = '',
        public name: string = '',
        public description: string = '',
        public location: Location = new Location('', []),
        public pictures: string[] = [],
        public schedule: Schedule[] = [],
        public phones: string[] = [],
        public categories: string = '',
        public calificacionPromedio: number = 0,
        public estadoNegocio: string = ''
    ) { }
}
