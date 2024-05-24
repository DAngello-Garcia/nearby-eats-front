import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PlaceCreateDTO } from '../../../dto/place/place-create-dto';
import { ActivatedRoute, RouterLink } from '@angular/router';
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
import { ItemNegocioDTO } from '../../../dto/place/item-negocio-dto';
import { MenssageDTO } from '../../../dto/menssage-dto';
import { Observable, map } from 'rxjs';
import { UpdatePlaceDTO } from '../../../dto/place/update-place-dto';

@Component({
  selector: 'app-actualizar-lugar',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './actualizar-lugar.component.html',
  styleUrl: './actualizar-lugar.component.css'
})
export class ActualizarLugarComponent implements OnInit {

  updatePlaceDTO: UpdatePlaceDTO;
  files!: FileList;
  currentSchedule: Schedule;
  currentCategory: string;
  currentPhone: string;
  
  codePlace: string = ''
  preloadedPlace: ItemNegocioDTO

  alert!: Alert;

  categories: string[];
  weekdays: string[];

  constructor(
    private placeService: PlaceServiceService,
    private tokenService: TokenService,
    private mapService: MapaService,
    private publicService: PublicServiceService,
    private imageService: ImageServiceService,
    private route: ActivatedRoute
  ) {
    this.preloadedPlace = new ItemNegocioDTO()
    this.route.params.subscribe((params) => {
      this.codePlace = params['id'];
    });
    this.updatePlaceDTO = new UpdatePlaceDTO();
    this.currentCategory = '';
    this.currentPhone = '';
    this.currentSchedule = new Schedule('', '', '');
    this.categories = [];
    this.weekdays = [];
    this.fetchWeekdays();
    this.fetchCategories();
  }

  ngOnInit(): void {
    this.preload()
    this.mapService.createMap();
    this.mapService.addMarcador().subscribe((marcador) => {
      this.updatePlaceDTO.location.coordinates[0] = marcador.lat;
      this.updatePlaceDTO.location.coordinates[1] = marcador.lng;
    });
  }

  private preload() {
    this.placeService.getPlace(this.codePlace).subscribe({
      next: (data) => {
        this.updatePlaceDTO = data.response;
        this.preloadedPlace.categories = this.updatePlaceDTO.categories
        this.preloadedPlace.createdBy = this.updatePlaceDTO.clientId
        this.preloadedPlace.description = this.updatePlaceDTO.description
        this.preloadedPlace.id = this.codePlace
        this.preloadedPlace.location = this.updatePlaceDTO.location
        this.preloadedPlace.name = this.updatePlaceDTO.name
        this.preloadedPlace.phones = this.updatePlaceDTO.phones
        this.preloadedPlace.schedule = this.updatePlaceDTO.schedule
        this.mapService.paintMarcador([this.preloadedPlace]);
      },
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
        Swal.fire('Error', 'Error al cargar las categorias', 'error');
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
          let previousImages = this.updatePlaceDTO.pictures;
          let newImages = data.response.map(
            (response: { url: any }) => response.url
          );
          this.updatePlaceDTO.pictures = previousImages.concat(newImages);

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

    this.updatePlaceDTO.categories.push(this.currentCategory);

    this.categories = this.categories.filter(
      (category) => category != this.currentCategory
    );

    this.currentCategory = '';
  }

  public removeCategory(category: string) {
    this.updatePlaceDTO.categories = this.updatePlaceDTO.categories.filter(
      (c) => c != category
    );
  }

  public addSchedule() {
    if (this.currentSchedule.weekday == '') {
      Swal.fire('Error', 'Debe seleccionar un dia de la semana', 'error');
      return;
    }

    this.updatePlaceDTO.schedule.push(this.currentSchedule);
    this.weekdays = this.weekdays.filter(
      (weekday) => weekday != this.currentSchedule.weekday
    );
    this.currentSchedule = new Schedule('', '', '');
  }

  public removeSchedule(schedule: Schedule) {
    this.updatePlaceDTO.schedule = this.updatePlaceDTO.schedule.filter(
      (s) => s != schedule
    );
  }

  public addPhone() {
    if (this.currentPhone == '') {
      Swal.fire('Error', 'Debe ingresar un numero de telefono', 'error');
      return;
    }

    if (this.updatePlaceDTO.phones.includes(this.currentPhone)) {
      Swal.fire('Error', 'El numero de telefono ya esta agregado', 'error');
      return;
    }
    this.updatePlaceDTO.phones.push(this.currentPhone);
    this.currentPhone = '';
  }

  public removePhone(phone: string) {
    this.updatePlaceDTO.phones = this.updatePlaceDTO.phones.filter(
      (p) => p != phone
    );
  }

  public createPlace() {
    this.updatePlaceDTO.clientId = this.tokenService.getId();
    this.updatePlaceDTO.placeId = this.codePlace
    this.placeService.updatePlace(this.updatePlaceDTO).subscribe({
      next: (data) => {
        Swal.fire('Se agrego el negocio con éxito', data.response, 'success');
      },
      error: (error) => {
        Swal.fire('Error', error.error.response, 'error');
      },
    });
  }


}
