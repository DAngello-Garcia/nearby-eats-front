import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserUpdateDTO } from '../../dto/user/user-update-dto';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { UserInformationDTO } from '../../dto/user/user-information-dto';
import { ImageServiceService } from '../../services/controllers/image-service.service';
import { Alert } from '../../dto/clases/alert';
import { UserServiceService } from '../../services/controllers/user-service.service';
import { error } from 'console';
import { AlertComponent } from "../alert/alert.component";

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

  constructor(
    private userDataService: UserService,
    private imageService: ImageServiceService,
    private userService: UserServiceService ) {
    this.client = new UserInformationDTO();
    this.userUpdateDTO = new UserUpdateDTO();
    this.citys = [];
  }

  ngOnInit(): void {
    this.uploadCitys();
    this.userDataService.getUser();

  }

  public updateAccount() {
    if (this.userUpdateDTO.profilePicture != "") {

      this.userService.updateUserUSer(this.userUpdateDTO).subscribe({
        next: (data) => {
          this.alert = new Alert(data.response, "success");
          window.location.reload();
        },
        error: (error) => {
          this.alert = new Alert(error.error.response, "danger")
        }
      });
      
    } else {
      console.log("Debe cargar una foto");
    }
  }

  private uploadCitys() {
    this.citys = ["Bogotá", "Medellín", "Cali", "Barranquilla", "Cartagena"];
  }

  public onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.archivos = event.target.files;
      this.userUpdateDTO.profilePicture = this.archivos[0].name;
    }
  }

  
  public uploadImage() {

    if (this.archivos != null && this.archivos.length > 0) {

      const formData = new FormData();
      formData.append('file', this.archivos[0]);

      this.imageService.uploadImage(formData).subscribe({
        next: data => {
          this.userUpdateDTO.profilePicture = data.response.url;
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
