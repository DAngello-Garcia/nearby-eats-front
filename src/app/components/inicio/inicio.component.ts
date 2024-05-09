import { Component, OnInit } from '@angular/core';
import { MapaService } from '../../services/mapa.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit {

  constructor(private mapaService: MapaService, private router: Router) {  }

  ngOnInit(): void {
      this.mapaService.createMap();
  }

  public iraBusqueda(valor: string) {
    if(valor) {
      this.router.navigate(["/busqueda", valor]);
    }
  }
}
