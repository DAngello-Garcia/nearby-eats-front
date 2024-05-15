import { Component } from '@angular/core';
import { RegisterClientDTO } from '../../dto/user/register-client-dto';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PublicServiceService } from '../../services/controllers/public.service';
import { AuthService } from '../../services/controllers/auth.service';
import { UserServiceService } from '../../services/controllers/user-service.service';
import { AlertComponent } from '../alert/alert.component';
import { Alert } from '../../dto/clases/alert';
import { Location } from '../../dto/clases/location';
import { TokenService } from '../../services/token.service';
import { ImageServiceService } from '../../services/controllers/image-service.service';
import { error } from 'console';

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
    private tokenService: TokenService,
    private imageService: ImageServiceService) {

    this.registerClientDTO = new RegisterClientDTO();
    this.citys = [];
    this.uploadCitys();
  }

  public register() {
    if (this.registerClientDTO.profilePicture != "") {

      this.userService.registerUser(this.registerClientDTO).subscribe({
        next: (data) => {
          this.alert = new Alert(data.response, "success");
        },
        error: (error) => {
          this.alert = new Alert(error.error.response, "danger")
        }
      });

    } else {
      this.alert = new Alert("Debe subir una imagen", "danger");
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
        console.log("Error al cargar las ciudades");
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
