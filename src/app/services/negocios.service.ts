import { Injectable } from '@angular/core';
import { ItemNegocioDTO } from '../dto/place/item-negocio-dto';
import { Location } from '../dto/clases/location';
import { RegistroNegocioDTO } from '../dto/place/registro-negocio-dto';
import { UpdatePlaceDTO } from '../dto/place/update-place-dto';
import { PlaceCreateDTO } from '../dto/place/place-create-dto';

@Injectable({
  providedIn: 'root'
})
export class NegociosService {

  negocios: ItemNegocioDTO[];

  constructor() {
    this.negocios = [];

    this.negocios.push(new ItemNegocioDTO('1', 'Bar Armenia', 'https://picsum.photos/100',
      'BAR', new Location('Armenia', [4.531456060381842, -75.68035469963664]), 4.5, 'APROBADO'));
    this.negocios.push(new ItemNegocioDTO('2', 'Restaurante La Casona',
      'https://picsum.photos/100', 'RESTAURANTE', new Location('Armenia', [4.551298538672697,
        -75.65858458442557]), 4.0, 'APROBADO'));
    this.negocios.push(new ItemNegocioDTO('3', 'Peluquería La 33', 'https://picsum.photos/100',
      'PELUQUERIA', new Location('Armenia', [4.541984423452234, -75.68579829641877]), 4.0, 'RECHAZADO'));
    this.negocios.push(new ItemNegocioDTO('4', 'Veterinaria Los Amigos',
      'https://picsum.photos/100', 'VETERINARIA', new Location('Armenia', [4.539872786267409,
        -75.65011488244343]), 4.0, 'APROBADO'));
  }

  public listar(): ItemNegocioDTO[] {
    return this.negocios;
  }

  public obtener(codigo: string): ItemNegocioDTO | undefined {
    return this.negocios.find(negocios => negocios.id == codigo);
  }

  public crear(negocioNuevo: PlaceCreateDTO) {
    const codigo = (this.negocios.length + 1).toString();
    this.negocios.push(new ItemNegocioDTO(codigo, negocioNuevo.name,
      negocioNuevo.images[0], negocioNuevo.categories[0], negocioNuevo.location, 0, 'PENDIENTE'));
  }

  public actualizar(negocio: UpdatePlaceDTO) {
    // pendiente
    const codigo = (this.negocios.length + 1).toString();
    this.negocios[this.negocios.length - 1] = new ItemNegocioDTO(codigo, negocio.name,
      negocio.images[0], negocio.categories[0], negocio.location, 0, 'PENDIENTE');
  }

  public eliminar(codigo: string) {
    this.negocios = this.negocios.filter(n => n.id != codigo);
  }

  public buscar(busqueda: string) {
    return this.negocios.filter(negocios =>
      negocios.name.toLowerCase().includes(busqueda.toLowerCase()))
  }
}
