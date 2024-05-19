import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemNegocioDTO } from '../../dto/place/item-negocio-dto';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PlaceServiceService } from '../../services/controllers/place-service.service';
import { MapaService } from '../../services/mapa.service';

@Component({
  selector: 'app-detalle-negocio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './detalle-negocio.component.html',
  styleUrl: './detalle-negocio.component.css',
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

  getDummyReviews() {
    return [
      {
        reviewer: 'John Doe',
        rating: 4,
        profileImage: 'https://via.placeholder.com/50',
      },
      {
        reviewer: 'Jane Smith',
        rating: 5,
        profileImage: 'https://via.placeholder.com/50',
      },
      {
        reviewer: 'Sam Brown',
        rating: 3,
        profileImage: 'https://via.placeholder.com/50',
      },
    ];
  }

  public getStars(rating: number): number[] {
    return new Array(rating);
  }
}
