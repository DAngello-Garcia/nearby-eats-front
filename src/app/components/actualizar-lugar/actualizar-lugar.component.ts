import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UpdatePlaceDTO } from '../../dto/place/update-place-dto';
import { NegociosService } from '../../services/negocios.service';
import { MapaService } from '../../services/mapa.service';
import { Schedule } from '../../dto/clases/schedule';

@Component({
  selector: 'app-actualizar-lugar',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './actualizar-lugar.component.html',
  styleUrl: './actualizar-lugar.component.css'
})
export class ActualizarLugarComponent implements OnInit {
  updatePlaceDTO: UpdatePlaceDTO
  archivos!: FileList;
  schedules: Schedule[];
  categories: string[];

  constructor(private negocioService: NegociosService, private mapService: MapaService) {
    this.updatePlaceDTO = new UpdatePlaceDTO();
    this.categories = [];
    this.schedules = [new Schedule('', '', '')];
    this.uploadCategories();
  }

  ngOnInit(): void {
    this.mapService.createMap();

    this.mapService.addMarcador().subscribe((marcador) => {
      this.updatePlaceDTO.location.coordinates[0] = marcador.lat;
      this.updatePlaceDTO.location.coordinates[1] = marcador.lng;
    })
  }

  public updatePlace() {
    this.updatePlaceDTO.schedule = this.schedules;
    this.negocioService.actualizar(this.updatePlaceDTO);

    console.log(this.updatePlaceDTO);
  }

  public addSchedule() {
    this.schedules.push(new Schedule('', '', ''));
  }

  public onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.archivos = event.target.files;
      Array.from(this.archivos).forEach(file => { this.updatePlaceDTO.images.push(file.name) });
    }
  }

  private uploadCategories() {
    this.categories = ["Supermercado", "Tienda", "Restaurante", "Comida Rápida",
      "Hotel", "Museo", "Café", "Otros"];
  }
}
