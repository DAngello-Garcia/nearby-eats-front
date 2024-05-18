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
import { Alert } from '../../dto/clases/alert';
import { ImageServiceService } from '../../services/controllers/image-service.service';
import { AlertComponent } from '../alert/alert.component';
import { response } from 'express';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-crear-lugar',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, AlertComponent],
  templateUrl: './crear-lugar.component.html',
  styleUrl: './crear-lugar.component.css'
})
export class CrearLugarComponent implements OnInit {

  placeCreateDTO: PlaceCreateDTO;
  archivos!: FileList;
  schedules: Schedule[];
  categories: string[];
  phones: string[];
  alert!: Alert;
  currentCategory: string

  constructor(
    private placeService: PlaceServiceService,
    private mapService: MapaService,
    private publicService: PublicServiceService,
    private imageService: ImageServiceService,
    private tokenService: TokenService) {

    this.phones = [''];
    this.placeCreateDTO = new PlaceCreateDTO();
    this.categories = [];
    this.currentCategory = ''
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
    this.placeService.createPlace(this.placeCreateDTO).subscribe({
      next: (data) => {
        this.placeCreateDTO.clientId = this.tokenService.getId();
        this.alert = new Alert(data.response, "sucess");
      },
      error: (error) => {
        this.alert = new Alert(error.error.response, "danger")
      }
    })
  }

  public addSchedule() {
    this.schedules.push(new Schedule('', '', ''));
  }

  public addPhones() {
    this.phones.push('');
  }

  public onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.archivos = event.target.files;
      Array.from(this.archivos).forEach(file => { this.placeCreateDTO.images.push(file.name) });
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

  public addCategory() {
    if (this.currentCategory && !this.placeCreateDTO.categories.includes(this.currentCategory)) {
      this.placeCreateDTO.categories.push(this.currentCategory);
      this.currentCategory = '';
    }
  }

  public uploadImages() {

    if (this.archivos != null && this.archivos.length > 0) {

      const formData = new FormData();

      for (let i = 0; i < this.archivos.length; i++) {
        formData.append('files', this.archivos[i])
      }

      this.imageService.uploadImages(formData).subscribe({
        next: data => {
          this.placeCreateDTO.images = data.response.map((response: { url: any; }) => response.url);
          this.alert = new Alert("Se ha subido la foto", "success");
        },
        error: error => {
          this.alert = new Alert(error.error, "danger");
        }
      });

    } else {
      this.alert = new Alert("Debe seleccionar una imagen y subirla", "danger");
    }
  }
}
