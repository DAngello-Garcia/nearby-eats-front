import { Component } from '@angular/core';
import { RegisterClientDTO } from '../../dto/register-client-dto';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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

  constructor() {
    this.registerClientDTO = new RegisterClientDTO();
    this.citys = [];
    this.uploadCitys();
  }

  public register() {
    if (this.registerClientDTO.profilePicture != "") {
      console.log(this.registerClientDTO);
    } else {
      console.log("Debe cargar una foto");
    }
  }

  public equalPassword(): boolean {
    return this.registerClientDTO.password ==
      this.registerClientDTO.confirmPassword;
  }

  private uploadCitys() {
    this.citys = ["Bogotá", "Medellín", "Cali", "Barranquilla", "Cartagena"];
  }

  public onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.archivos = event.target.files;
      this.registerClientDTO.profilePicture = this.archivos[0].name;
    }
  }

}
