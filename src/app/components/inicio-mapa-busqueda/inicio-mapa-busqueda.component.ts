import { Component, OnInit } from '@angular/core';
import { MapaService } from '../../services/mapa.service';
import { TokenService } from '../../services/token.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inicio-mapa-busqueda',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './inicio-mapa-busqueda.component.html',
  styleUrl: './inicio-mapa-busqueda.component.css'
})
export class InicioMapaBusquedaComponent implements OnInit{

  constructor(
    private mapaService: MapaService,
    private router: Router) {

  }

  ngOnInit(): void {
    this.mapaService.createMap();
  }

  public iraBusqueda(valor: string) {
    if (valor) {
      this.router.navigate(["/busqueda", valor]);
    }
  }

}
