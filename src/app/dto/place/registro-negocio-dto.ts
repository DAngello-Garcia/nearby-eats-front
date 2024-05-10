import { Location } from '../clases/location';
import { Schedule } from "../clases/schedule";

export class RegistroNegocioDTO {
    constructor(
        public nombre: string = '',
        public descripcion: string = '',
        public codigoCliente: string = '',
        public ubicacion: Location = new Location('', []),
        public imagenes: string[] = [],
        public tipoNegocio: string = '',
        public horarios: Schedule[] = [],
        public telefonos: string[] = []
        ) { }
}