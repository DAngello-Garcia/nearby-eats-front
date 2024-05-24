import { Component } from '@angular/core';
import { RegisterClientDTO } from '../../../dto/user/register-client-dto';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PublicServiceService } from '../../../services/controllers/public.service';
import { UserServiceService } from '../../../services/controllers/user-service.service';
import { AlertComponent } from '../../alert/alert.component';
import { Alert } from '../../../dto/clases/alert';
import { ImageServiceService } from '../../../services/controllers/image-service.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css',
  imports: [FormsModule, CommonModule, AlertComponent]
})
export class RegistroComponent {

  registerClientDTO: RegisterClientDTO;
  citys: string[];
  archivos!: FileList;
  alert!: Alert

  constructor(
    private publicService: PublicServiceService,
    private userService: UserServiceService,
    private router: Router,
    private imageService: ImageServiceService) {

    this.registerClientDTO = new RegisterClientDTO();
    this.citys = [];
    this.uploadCitys();

  }

  public register() {
    if (this.registerClientDTO.profilePicture != "") {

      this.userService.registerUser(this.registerClientDTO).subscribe({
        next: (data) => {

          Swal.fire({
            title: '¡Se registró el usuario con éxito!',
            text: data.response,
            icon: 'success',
            timer: 3000,
            showConfirmButton: false,
            timerProgressBar: true
          });

          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 3000); 
        },
        error: (error) => {
          Swal.fire('Error en el registro', error.response, 'error');
        }
      });

    } else {
      Swal.fire({
        icon: "error",
        title: "Campo requerido", 
        text: "Debe subir una imagen",
      });
    }
  }

  public equalPassword(): boolean {
    return this.registerClientDTO.password ==
      this.registerClientDTO.confirmPassword;
  }

  private uploadCitys() {
    this.publicService.getCities().subscribe({
      next: (data) => {
        this.citys = data.response;
      },
      error: (error) => {
        console.log("Error al cargar las ciudades" + error);
      }
    })
  }

  public onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.archivos = event.target.files;
      this.registerClientDTO.profilePicture = this.archivos[0].name;
    }
  }

  public uploadImage() {

    if (this.archivos != null && this.archivos.length > 0) {

      const formData = new FormData();
      formData.append('file', this.archivos[0]);

      this.imageService.uploadImage(formData).subscribe({
        next: data => {
          this.registerClientDTO.profilePicture = data.response.url;
          Swal.fire('Se subió la foto correctamente', data.response, 'success');
        },
        error: error => {
          Swal.fire('No se pudo subir la foto', error.response, 'error');
        }
      });

    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Debe seleccionar una imagen para subirla",
      });
    }
  }
}
