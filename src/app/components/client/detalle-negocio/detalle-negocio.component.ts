import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemNegocioDTO } from '../../../dto/place/item-negocio-dto';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PlaceServiceService } from '../../../services/controllers/place-service.service';
import { MapaService } from '../../../services/mapa.service';
import { ComentarioComponent } from "../comentario/comentario.component";

@Component({
    selector: 'app-detalle-negocio',
    standalone: true,
    templateUrl: './detalle-negocio.component.html',
    styleUrl: './detalle-negocio.component.css',
    imports: [CommonModule, FormsModule, ComentarioComponent]
})
export class DetalleNegocioComponent implements OnInit {
  codePlace: string = '';
  negocio: ItemNegocioDTO;

  constructor(
    private route: ActivatedRoute,
    private placeService: PlaceServiceService,
    private mapaService: MapaService
  ) {
    this.negocio = new ItemNegocioDTO();
    this.route.params.subscribe((params) => {
      this.codePlace = params['id'];
      this.getPlace();
    });
  }

  ngOnInit(): void {
    this.mapaService.createMap();
  }

  private getPlace() {
    this.placeService.getPlace(this.codePlace).subscribe({
      next: (data) => {
        this.negocio = data.response;
        this.mapaService.paintMarcador([this.negocio]);
      },
    });
  }
}
