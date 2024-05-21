import { Component, OnInit } from '@angular/core';
import { MapaService } from '../../services/mapa.service';
import { Router, RouterLink } from '@angular/router';
import { TokenService } from '../../services/token.service';
import { UserInformationDTO } from '../../dto/user/user-information-dto';
import { UserServiceService } from '../../services/controllers/user-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit {

  isLogged = false;
  role: string = '';
  id: string = '';
  moderator: UserInformationDTO;

  constructor(
    private mapaService: MapaService, 
    private router: Router,
    private tokenService: TokenService,
    private userService: UserServiceService) { 

      this.moderator = new UserInformationDTO;
     }

  ngOnInit(): void {
      this.mapaService.createMap();
  }

  public iraBusqueda(valor: string) {
    if(valor) {
      this.router.navigate(["/busqueda", valor]);
    }

    this.isLogged = this.tokenService.isLogged();
    if (this.isLogged) {
      this.id = this.tokenService.getId();
      this.role = this.tokenService.getRole()
      this.getModerator();
    }

  }
  public getModerator() {
    this.userService.getUser(this.id).subscribe({
      next: data => {
        this.moderator = data.response
      }
    })
  }
}
