import { Component, OnInit } from '@angular/core';
import { ItemNegocioDTO } from '../../dto/place/item-negocio-dto';
import { ActivatedRoute } from '@angular/router';
import { MapaService } from '../../services/mapa.service';
import { PlaceServiceService } from '../../services/controllers/place-service.service';
import { MenssageDTO } from '../../dto/menssage-dto';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TokenService } from '../../services/token.service';
import { PublicServiceService } from '../../services/controllers/public.service';

@Component({
  selector: 'app-busqueda',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './busqueda.component.html',
  styleUrl: './busqueda.component.css'
})
export class BusquedaComponent implements OnInit {

  textoBusqueda: string;
  resultados: ItemNegocioDTO[];

  constructor(
    private route: ActivatedRoute,
    private negocioService: PlaceServiceService,
    private mapaService: MapaService,
    private tokenService: TokenService, private publicService: PublicServiceService) {

    this.resultados = [];
    this.textoBusqueda = "";

    this.route.params.subscribe(params => {
      this.textoBusqueda = params['texto'];
      if (!this.tokenService.getId()) {
        this.publicService.getPlacesByName(this.textoBusqueda).subscribe({
          next: data => {
            this.resultados = data.response;
          }
        });
      } else {
        this.negocioService.getPlacesByName(this.textoBusqueda).subscribe({
          next: data => {
            this.resultados = data.response;
          }
        });
      }

    });
  }

  ngOnInit(): void {
    this.mapaService.createMap();
    this.mapaService.paintMarcador(this.resultados)
  }
}
