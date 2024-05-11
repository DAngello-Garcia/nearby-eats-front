import { Component } from '@angular/core';
import { RegisterClientDTO } from '../../dto/user/register-client-dto';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PublicServiceService } from '../../services/controllers/public.service';
import { error } from 'console';
import { AuthService } from '../../services/controllers/auth.service';
import { UserServiceService } from '../../services/controllers/user-service.service';
import { AlertComponent } from '../alert/alert.component';
import { Alert } from '../../dto/clases/alert';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {

  registerClientDTO: RegisterClientDTO;
  citys: string[];
  archivos!: FileList;
  alert!: Alert

  constructor(private publicService: PublicServiceService, private userService: UserServiceService) {
    this.registerClientDTO = new RegisterClientDTO();
    this.citys = [];
    this.uploadCitys();
  }

  public register() {
    if (this.registerClientDTO.profilePicture != "") {
      
      this.userService.registerUser(this.registerClientDTO).subscribe({
        next: (data) => {
          console.log("Cliente registrado");
        },
        error: (error) => {
          console.log("Error al registrar el cliente");
        }
      });

    } else {
      console.log("Debe cargar una foto");
    }
  }

  public equalPassword(): boolean {
    return this.registerClientDTO.password ==
      this.registerClientDTO.confirmPassword;
  }

  private uploadCitys() {
    this.publicService.getPlacesByLocation().subscribe({
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

}
