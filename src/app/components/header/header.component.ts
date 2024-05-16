import { Component } from '@angular/core';
import { RegistroComponent } from '../registro/registro.component';
import { LoginComponent } from '../login/login.component';
import { RouterLink } from '@angular/router';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RegistroComponent, LoginComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  title = 'nearby-eats-front';
  isLogged = false;
  email: string = "";

  constructor(private tokenService: TokenService) { }
  ngOnInit(): void {
    this.isLogged = this.tokenService.isLogged();
    if (this.isLogged) {
      this.email = this.tokenService.getEmail();
    }
  }
  public logout() {
    this.tokenService.logout();
  }
}
