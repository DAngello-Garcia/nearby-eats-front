import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PlaceCreateDTO } from '../../dto/place/place-create-dto';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Schedule } from '../../dto/clases/schedule';
import { MapaService } from '../../services/mapa.service';
import { PublicServiceService } from '../../services/controllers/public.service';
import { PlaceServiceService } from '../../services/controllers/place-service.service';
import { Alert } from '../../dto/clases/alert';
import { ImageServiceService } from '../../services/controllers/image-service.service';
import { AlertComponent } from '../alert/alert.component';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-crear-lugar',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, AlertComponent],
  templateUrl: './crear-lugar.component.html',
  styleUrl: './crear-lugar.component.css',
})
export class CrearLugarComponent implements OnInit {
  // FORM
  placeCreateDTO: PlaceCreateDTO;
  files!: FileList;
  currentSchedule: Schedule;
  currentCategory: string;
  currentPhone: string;

  // ALERT
  alert!: Alert;

  // THE SELECT INPUT DATA
  categories: string[];
  weekdays: string[];

  constructor(
    private placeService: PlaceServiceService,
    private tokenService: TokenService,
    private mapService: MapaService,
    private publicService: PublicServiceService,
    private imageService: ImageServiceService
  ) {
    this.placeCreateDTO = new PlaceCreateDTO();
    this.currentCategory = '';
    this.currentPhone = '';
    this.currentSchedule = new Schedule('', '', '');
    this.categories = [];
    this.weekdays = [];
    this.fetchWeekdays();
    this.fetchCategories();
  }

  ngOnInit(): void {
    this.mapService.createMap();

    this.mapService.addMarcador().subscribe((marcador) => {
      this.placeCreateDTO.location.coordinates[0] = marcador.lat;
      this.placeCreateDTO.location.coordinates[1] = marcador.lng;
    });
  }

  private fetchWeekdays() {
    this.weekdays = [
      'Lunes',
      'Martes',
      'Miercoles',
      'Jueves',
      'Viernes',
      'Sabado',
      'Domingo',
    ];
  }

  private fetchCategories() {
    this.publicService.getCategories().subscribe({
      next: (data) => {
        this.categories = data.response;
      },
      error: (error) => {
        console.log('Error al cargar las categorias');
      },
    });
  }

  public onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const files = event.target.files;
      console.log('this.files', files);
      this.files = event.target.files;
    }
  }

  public uploadImages() {
    if (this.files != null && this.files.length > 0) {
      const formData = new FormData();

      for (let i = 0; i < this.files.length; i++) {
        formData.append('files', this.files[i]);
      }

      this.imageService.uploadImages(formData).subscribe({
        next: (data) => {
          let previousImages = this.placeCreateDTO.images;
          let newImages = data.response.map(
            (response: { url: any }) => response.url
          );
          this.placeCreateDTO.images = previousImages.concat(newImages);

          this.alert = new Alert('Se ha subido la foto', 'success');
        },
        error: (error) => {
          this.alert = new Alert(error.error, 'danger');
        },
      });
    } else {
      this.alert = new Alert('Debe seleccionar una imagen y subirla', 'danger');
    }
  }

  public addCategory() {
    if (this.currentCategory == '') {
      this.alert = new Alert('Debe seleccionar una categoria', 'danger');
      return;
    }

    this.placeCreateDTO.categories.push(this.currentCategory);

    this.categories = this.categories.filter(
      (category) => category != this.currentCategory
    );

    this.currentCategory = '';
  }

  public removeCategory(category: string) {
    this.placeCreateDTO.categories = this.placeCreateDTO.categories.filter(
      (c) => c != category
    );
  }

  public addSchedule() {
    if (this.currentSchedule.weekday == '') {
      this.alert = new Alert('Debe seleccionar un dia de la semana', 'danger');
      return;
    }

    // Agregar el horario actual y eliminar el weekDay
    this.placeCreateDTO.schedule.push(this.currentSchedule);
    // Eliminar el weekday
    this.weekdays = this.weekdays.filter(
      (weekday) => weekday != this.currentSchedule.weekday
    );
    this.currentSchedule = new Schedule('', '', '');
  }

  public removeSchedule(schedule: Schedule) {
    this.placeCreateDTO.schedule = this.placeCreateDTO.schedule.filter(
      (s) => s != schedule
    );
  }

  public addPhone() {
    if (this.currentPhone == '') {
      this.alert = new Alert('Debe ingresar un numero de telefono', 'danger');
      return;
    }

    if (this.placeCreateDTO.phones.includes(this.currentPhone)) {
      this.alert = new Alert(
        'El numero de telefono ya esta agregado',
        'danger'
      );
      return;
    }
    this.placeCreateDTO.phones.push(this.currentPhone);
    this.currentPhone = '';
  }

  public removePhone(phone: string) {
    this.placeCreateDTO.phones = this.placeCreateDTO.phones.filter(
      (p) => p != phone
    );
  }

  public createPlace() {
    this.placeCreateDTO.clientId = this.tokenService.getId();
    console.log('this.placeCreateDTO', this.placeCreateDTO);
    this.placeService.createPlace(this.placeCreateDTO).subscribe({
      next: (data) => {
        this.alert = new Alert(data.response, 'success');
      },
      error: (error) => {
        this.alert = new Alert(error.error.response, 'danger');
      },
    });
  }
}
