import { Location } from "./location";

export class ItemNegocioDTO {
    constructor(
        public codigoNegocio: string = '',
        public nombre: string = '',
        public imagenDestacada: string = '',
        public tipoNegocio: string = '',
        public ubicacion: Location = new Location('', []),
        public calificacionPromedio: number = 0,
        public estadoNegocio:string = ''
        ){}
}
