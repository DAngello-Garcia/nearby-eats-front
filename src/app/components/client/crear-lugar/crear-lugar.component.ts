import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PlaceCreateDTO } from '../../../dto/place/place-create-dto';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Schedule } from '../../../dto/clases/schedule';
import { MapaService } from '../../../services/mapa.service';
import { PublicServiceService } from '../../../services/controllers/public.service';
import { PlaceServiceService } from '../../../services/controllers/place-service.service';
import { Alert } from '../../../dto/clases/alert';
import { ImageServiceService } from '../../../services/controllers/image-service.service';
import { AlertComponent } from '../../alert/alert.component';
import { TokenService } from '../../../services/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-lugar',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, AlertComponent],
  templateUrl: './crear-lugar.component.html',
  styleUrl: './crear-lugar.component.css',
})
export class CrearLugarComponent implements OnInit {

  placeCreateDTO: PlaceCreateDTO;
  files!: FileList;
  currentSchedule: Schedule;
  currentCategory: string;
  currentPhone: string;

  alert!: Alert;

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
      'MONDAY',
      'TUESDAY',
      'WEDNESDAY',
      'THURSDAY',
      'FRIDAY',
      'SATURDAY',
      'SUNDAY',
    ];
  }

  private fetchCategories() {
    this.publicService.getCategories().subscribe({
      next: (data) => {
        this.categories = data.response;
      },
      error: (error) => {
        console.log('Error al cargar las categorias');
        Swal.fire('Error', 'Error al cargar las categorias', 'error');
      }
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
          let previousImages = this.placeCreateDTO.pictures;
          let newImages = data.response.map(
            (response: { url: any }) => response.url
          );
          this.placeCreateDTO.pictures = previousImages.concat(newImages);

          Swal.fire('Éxito', 'Se ha subido la foto', 'success');
        },
        error: (error) => {
          Swal.fire('Error', error.error, 'error');
        },
      });
    } else {
      Swal.fire('Error', 'Debe seleccionar una imagen y subirla', 'error');
    }
  }

  public addCategory() {
    if (this.currentCategory == '') {
      Swal.fire('Error', 'Debe seleccionar una categoria', 'error');
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
      Swal.fire('Error', 'Debe seleccionar un dia de la semana', 'error');
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
      Swal.fire('Error', 'Debe ingresar un numero de telefono', 'error');
      return;
    }

    if (this.placeCreateDTO.phones.includes(this.currentPhone)) {
      Swal.fire('Error', 'El numero de telefono ya esta agregado', 'error');
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
        Swal.fire('Se agrego el negocio con éxito', data.response, 'success');
      },
      error: (error) => {
        Swal.fire('Error', error.error.response, 'error');
      },
    });
  }
}
