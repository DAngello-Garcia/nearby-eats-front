import { Component } from '@angular/core';
import { LoginDTO } from '../../dto/user/login-dto';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/controllers/auth.service';
import { MenssageDTO } from '../../dto/menssage-dto';
import { TokenService } from '../../services/token.service';
import { Alert } from '../../dto/clases/alert';
import { AlertComponent } from "../alert/alert.component";

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [FormsModule, RouterLink, CommonModule, AlertComponent]
})
export class LoginComponent {

  loginDTO: LoginDTO;
  negocio: MenssageDTO | undefined;
  alert!: Alert

  constructor(
    private authService: AuthService,
    private tokenService: TokenService) {

    this.loginDTO = new LoginDTO();
  }

  public login() {
    this.authService.loginClient(this.loginDTO).subscribe({
      next: data => {
        this.tokenService.login(data.response);
      },
      error: error => {
        this.alert = new Alert(error.error.response, "danger");
      }
    });
  }
}
