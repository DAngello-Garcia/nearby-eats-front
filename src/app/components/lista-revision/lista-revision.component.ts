import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ItemNegocioDTO } from '../../dto/place/item-negocio-dto';
import { PlaceServiceService } from '../../services/controllers/place-service.service';
import { PublicServiceService } from '../../services/controllers/public.service';

@Component({
  selector: 'app-lista-revision',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './lista-revision.component.html',
  styleUrl: './lista-revision.component.css'
})
export class ListaRevisionComponent {

  resultados: ItemNegocioDTO[];

  constructor(private placeService: PlaceServiceService, private publicService: PublicServiceService) {
    this.resultados = [];

    this.placeService.getPlacesMod('PENDING').subscribe({
      next: data => {
        this.resultados = data.response;
      }
    });
  }


}
