import { Component } from '@angular/core';
import { RegistroComponent } from '../registro/registro.component';
import { LoginComponent } from '../login/login.component';
import { RouterLink } from '@angular/router';
import { TokenService } from '../../services/token.service';
import { UserServiceService } from '../../services/controllers/user-service.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RegistroComponent, LoginComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  title = 'Nearby Eats';
  isLogged = false;
  email: string = "";
  profilePhoto: string ="";
  id: string = ""

  constructor(
    private tokenService: TokenService,
    private userService: UserServiceService) { }

  ngOnInit(): void {

    this.isLogged = this.tokenService.isLogged();
    if (this.isLogged) {
      this.email = this.tokenService.getEmail();
      this.id = this.tokenService.getId();
    }

  }
  public logout() {
    this.tokenService.logout();
  }

  public menuToggle() {
    const menuToggle = document.querySelector('.menu');
    if (menuToggle) {
      menuToggle.classList.toggle('active');
    }
  }
}
