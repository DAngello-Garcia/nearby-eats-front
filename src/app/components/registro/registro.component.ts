import { Component } from '@angular/core';
import { RegisterClientDTO } from '../../dto/register-client-dto';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {

  registerClientDTO: RegisterClientDTO
  
  constructor() {
    this.registerClientDTO = new RegisterClientDTO();
  }

  public register() {
    console.log(this.registerClientDTO);
  }

  public theAreEqual(): boolean {
    return this.registerClientDTO.password == 
    this.registerClientDTO.confirmPassword;
  }

}
