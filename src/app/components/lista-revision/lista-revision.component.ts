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
  placeStatus: string[] = []
  selectedCategory: string = 'PENDING'

  constructor(private placeService: PlaceServiceService, private publicService: PublicServiceService) {
    this.resultados = [];
    this.uploadPlaceStatus()
    this.placeService.getPlacesMod('PENDING').subscribe({
      next: data => {
        this.resultados = data.response;
        this.selectCategorySearch(data.response.categories[0])
      }
    });
  }

  public selectCategorySearch(status: string): void {
    this.selectedCategory = status;
    if (status === 'PENDING') {
      this.searchPending();
    } else {
      this.placeService.getPlacesByModerator(status).subscribe({
        next: data => {
          this.resultados = data.response;
        }
      });

    }
  }

  public searchPending() {
    this.placeService.getPlacesMod('PENDING').subscribe({
      next: data => {
        this.resultados = data.response;
      }
    });
  }

  public uploadPlaceStatus() {
    this.publicService.getPlacesStatus().subscribe({
      next: (data) => {
        this.placeStatus = data.response;
      },
      error: (error) => {
        console.log("Error al cargar los status");
      }
    })
  }

}
