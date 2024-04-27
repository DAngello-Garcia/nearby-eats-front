import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserUpdateDTO } from '../../dto/user-update-dto';

@Component({
  selector: 'app-actualizar-cuenta',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './actualizar-cuenta.component.html',
  styleUrl: './actualizar-cuenta.component.css'
})
export class ActualizarCuentaComponent {

  userUpdateDTO: UserUpdateDTO;
  citys: string[];
  archivos!: FileList;

  constructor() {
    this.userUpdateDTO = new UserUpdateDTO();
    this.citys = [];
    this.uploadCitys();
  }

  public updateAccount() {
    if (this.userUpdateDTO.profilePicture != "") {
      console.log(this.userUpdateDTO);
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
}
