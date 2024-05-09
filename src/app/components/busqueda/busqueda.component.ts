import { Component, OnInit } from '@angular/core';
import { ItemNegocioDTO } from '../../dto/item-negocio-dto';
import { ActivatedRoute } from '@angular/router';
import { NegociosService } from '../../services/negocios.service';
import { MapaService } from '../../services/mapa.service';

@Component({
  selector: 'app-busqueda',
  standalone: true,
  imports: [],
  templateUrl: './busqueda.component.html',
  styleUrl: './busqueda.component.css'
})
export class BusquedaComponent implements OnInit{

  textoBusqueda: string;
  resultados: ItemNegocioDTO[];

  constructor(
    private route: ActivatedRoute, 
    private negocioService: NegociosService, 
    private mapaService: MapaService) {

      this.resultados = [];
      this.textoBusqueda = "";

      this.route.params.subscribe(params => {
        this.textoBusqueda = params['texto'];
        this.resultados = this.negocioService.buscar(this.textoBusqueda);
      });
  }

  ngOnInit(): void {
      this.mapaService.createMap();
      this.mapaService.paintMarcador(this.resultados)
  }
}
