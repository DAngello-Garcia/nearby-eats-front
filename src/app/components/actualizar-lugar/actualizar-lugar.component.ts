import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UpdatePlaceDTO } from '../../dto/place/update-place-dto';
import { MapaService } from '../../services/mapa.service';
import { Schedule } from '../../dto/clases/schedule';
import { PlaceServiceService } from '../../services/controllers/place-service.service';
import { PublicServiceService } from '../../services/controllers/public.service';
import e from 'express';
import { error } from 'console';

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

  constructor(
      private placeService: PlaceServiceService,
      private mapService: MapaService,
      private publicService: PublicServiceService) {

    this.updatePlaceDTO = new UpdatePlaceDTO();
    this.categories = [];
    this.schedules = [new Schedule('', '', '')];
    this.uploadCategories();
  }

  ngOnInit(): void {
    this.mapService.createMap();

    this.mapService.addMarcador().subscribe((marcador) => {
      this.updatePlaceDTO.location.coordinates[0] = marcador.lng;
      this.updatePlaceDTO.location.coordinates[1] = marcador.lat;
    })
  }

  public updatePlace() {
    this.updatePlaceDTO.schedule = this.schedules;
    this.placeService.updatePlace(this.updatePlaceDTO);

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
    this.publicService.getCategories().subscribe({
      next: (data) => {
        this.categories = data.response;
      },
      error: (error) => {
        console.log("Error al cargar las categorias")
      }
     })
  }
}
