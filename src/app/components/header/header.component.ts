import { Component } from '@angular/core';
import { RegistroComponent } from '../client/registro/registro.component';
import { LoginComponent } from '../login/login.component';
import { RouterLink } from '@angular/router';
import { TokenService } from '../../services/token.service';
import { UserServiceService } from '../../services/controllers/user-service.service';
import { UserInformationDTO } from '../../dto/user/user-information-dto';

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
  profilePhoto: string = "";
  role: string = '';
  id: string = "";
  client: UserInformationDTO;


  constructor(
    private tokenService: TokenService,
    private userService: UserServiceService) {
    this.client = new UserInformationDTO()
  }

  ngOnInit(): void {

    this.isLogged = this.tokenService.isLogged();
    if (this.isLogged) {
      this.email = this.tokenService.getEmail();
      this.id = this.tokenService.getId();
      this.role = this.tokenService.getRole()
      this.getUser();
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

  public getUser() {
    this.userService.getUser(this.id).subscribe({
      next: data => {
        this.client = data.response
      }
    })
  }
}
