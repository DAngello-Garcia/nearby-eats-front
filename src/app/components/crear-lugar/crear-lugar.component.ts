import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PlaceCreateDTO } from '../../dto/place/place-create-dto';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Schedule } from '../../dto/clases/schedule';
import { MapaService } from '../../services/mapa.service';
import { PublicServiceService } from '../../services/controllers/public.service';
import { error } from 'console';
import { PlaceServiceService } from '../../services/controllers/place-service.service';

@Component({
  selector: 'app-crear-lugar',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './crear-lugar.component.html',
  styleUrl: './crear-lugar.component.css'
})
export class CrearLugarComponent implements OnInit {

  placeCreateDTO: PlaceCreateDTO;
  archivos!: FileList;
  schedules: Schedule[];
  categories: string[];

  constructor(
    private placeService: PlaceServiceService,
    private mapService: MapaService,
    private publicService: PublicServiceService) {
    this.placeCreateDTO = new PlaceCreateDTO();
    this.categories = [];
    this.schedules = [new Schedule('', '', '')];
    this.uploadCategories();
  }

  ngOnInit(): void {
    this.mapService.createMap();

    this.mapService.addMarcador().subscribe((marcador) => {
      this.placeCreateDTO.location.coordinates[0] = marcador.lat;
      this.placeCreateDTO.location.coordinates[1] = marcador.lng;
    })
  }

  public createPlace() {
    this.placeCreateDTO.schedule = this.schedules;
    this.placeService.createPlace(this.placeCreateDTO);

    console.log(this.placeCreateDTO);
  }

  public addSchedule() {
    this.schedules.push(new Schedule('', '', ''));
  }

  public onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.archivos = event.target.files;
      Array.from(this.archivos).forEach(file => { this.placeCreateDTO.images.push(file.name) });
    }
  }

  private uploadCategories() {
    this.publicService.getPlacesByCategory(this.categories).subscribe({
      next: (data) => {
        this.categories = data.response;
      },
      error: (error) => {
        console.log("Error al cargar las categorias");
      }
    })
  }
}
