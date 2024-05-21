import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TokenService } from '../../services/token.service';
import { CommonModule } from '@angular/common';
import { InicioMapaBusquedaComponent } from '../inicio-mapa-busqueda/inicio-mapa-busqueda.component';
import { InicioModeradorComponent } from '../inicio-moderador/inicio-moderador.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, InicioMapaBusquedaComponent, InicioModeradorComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

  isLogged = true;
  role: string = '';

  constructor(
    private tokenService: TokenService) {

    this.isLogged = this.tokenService.isLogged();

    if (this.isLogged) {
      this.role = this.tokenService.getRole();
    }

  }
  

}
