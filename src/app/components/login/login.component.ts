import { Component } from '@angular/core';
import { LoginDTO } from '../../dto/login-dto';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginDTO: LoginDTO;

  constructor() {
    this.loginDTO = new LoginDTO();
  }

  public login() {
    console.log(this.loginDTO);
  }
}
