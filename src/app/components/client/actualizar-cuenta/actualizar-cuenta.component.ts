import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserUpdateDTO } from '../../../dto/user/user-update-dto';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { UserInformationDTO } from '../../../dto/user/user-information-dto';
import { ImageServiceService } from '../../../services/controllers/image-service.service';
import { Alert } from '../../../dto/clases/alert';
import { UserServiceService } from '../../../services/controllers/user-service.service';
import { error } from 'console';
import { AlertComponent } from "../../alert/alert.component";
import { TokenService } from '../../../services/token.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-actualizar-cuenta',
    standalone: true,
    templateUrl: './actualizar-cuenta.component.html',
    styleUrl: './actualizar-cuenta.component.css',
    imports: [FormsModule, CommonModule, RouterLink, AlertComponent]
})
export class ActualizarCuentaComponent implements OnInit {

  userUpdateDTO: UserUpdateDTO;
  citys: string[];
  archivos!: FileList;
  client: UserInformationDTO;
  alert!: Alert

  preloadUser: UserInformationDTO;
  idUser: string = '';

  constructor(
    private userDataService: UserService,
    private imageService: ImageServiceService,
    private userService: UserServiceService,
    private tokenService: TokenService ) {

      this.preloadUser = new UserInformationDTO();
      this.client = new UserInformationDTO();
      this.userUpdateDTO = new UserUpdateDTO();
      this.citys = [];
      this.idUser = tokenService.getId();
  }

  ngOnInit(): void {
    this.preload();
    this.uploadCitys();
    this.userDataService.getUser();

  }

  private preload() {
    this.userService.getUser(this.idUser).subscribe({
      next: data => {
        this.userUpdateDTO = data.response;
        this.preloadUser.city = this.userUpdateDTO.city
        this.preloadUser.email = this.userUpdateDTO.email
        this.preloadUser.firstName = this.userUpdateDTO.firstName
        this.preloadUser.lastName = this.userUpdateDTO.lastName
        this.preloadUser.profilePicture = this.userUpdateDTO.profilePicture
      }
    })
  }

  public updateAccount() {
    if (this.userUpdateDTO.profilePicture != "") {

      this.userService.updateUserUSer(this.userUpdateDTO).subscribe({
        next: (data) => {
          this.alert = new Alert(data.response, "success");
          window.location.reload();
        },
        error: (error) => {
          Swal.fire('Error', error.error, 'error');   
        }
      });
      
    } else {
      console.log("Debe cargar una foto");
      Swal.fire('Error', 'Debe seleccionar una imagen y subirla', 'error');
    }
  }

  private uploadCitys() {
    this.citys = [
      "Bogotá", 
      "Medellín", 
      "Cali", 
      "Barranquilla",
      "Cartagena", 
      "Armenia", 
      "Pereira", 
      "Manizales", 
      "Ibagué"
    ];
  }

  public onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const files = event.target.files;
      console.log('this.files', files);
      this.archivos = event.target.files;
    }
  }

  public uploadImage() {
    if (this.archivos != null && this.archivos.length > 0) {

      const formData = new FormData();
      formData.append('file', this.archivos[0]);

      this.imageService.uploadImage(formData).subscribe({
        next: data => {
          this.userUpdateDTO.profilePicture = data.response.url;
          Swal.fire('Éxito', 'Se ha subido la foto', 'success');
        },
        error: error => {
          Swal.fire('Error', error.error, 'error');
        }
      });

    } else {
      Swal.fire('Error', 'Debe seleccionar una imagen y subirla', 'error');
    }
  }
}
