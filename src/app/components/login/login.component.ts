import { Component } from '@angular/core';
import { LoginDTO } from '../../dto/user/login-dto';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserServiceService } from '../../services/controllers/user-service.service';
import { AuthService } from '../../services/controllers/auth.service';
import { MenssageDTO } from '../../dto/menssage-dto';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginDTO: LoginDTO;
  negocio: MenssageDTO | undefined;

  constructor(
    private userService: UserServiceService,
    private authService: AuthService) {
    
      this.loginDTO = new LoginDTO();
  }

  public login() {
    this.authService.loginClient(this.loginDTO).subscribe(res => {
      this.negocio = res;
    })
    console.log(this.loginDTO);
  }
}
