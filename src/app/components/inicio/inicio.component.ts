import { Component, OnInit } from '@angular/core';
import { MapaService } from '../../services/mapa.service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit {

  constructor(private mapaService: MapaService) {  }

  ngOnInit(): void {
      this.mapaService.createMap();
  }
}
