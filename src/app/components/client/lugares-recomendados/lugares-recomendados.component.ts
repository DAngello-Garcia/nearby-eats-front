import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TokenService } from '../../../services/token.service';
import { PlaceServiceService } from '../../../services/controllers/place-service.service';
import { PlaceResponseDTO } from '../../../dto/place/place-response-dto';

@Component({
  selector: 'app-lugares-recomendados',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './lugares-recomendados.component.html',
  styleUrl: './lugares-recomendados.component.css'
})
export class LugaresRecomendadosComponent implements OnInit {

  placeResponseDTO: PlaceResponseDTO[] = [];
  idUser: string = '';

  constructor(
    private tokenService: TokenService, 
    private placeService: PlaceServiceService) {

      this.idUser = tokenService.getId();
  }

  ngOnInit(): void {
    this.getPlacesRecommend();
      
  }

  public getPlacesRecommend() {

    this.placeService.recommendPlaces(this.idUser).subscribe({
      next: data => {
          this.placeResponseDTO = data.response;
      }
    });
  }

}
