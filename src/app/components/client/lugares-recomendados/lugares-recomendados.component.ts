import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TokenService } from '../../../services/token.service';
import { PlaceServiceService } from '../../../services/controllers/place-service.service';
import { PlaceResponseDTO } from '../../../dto/place/place-response-dto';
import { Subscription, interval } from 'rxjs';
import { PublicServiceService } from '../../../services/controllers/public.service';

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
  private subscription: Subscription | undefined

  constructor(
    private tokenService: TokenService,
    private placeService: PlaceServiceService,
    private publicService: PublicServiceService) {

    this.idUser = tokenService.getId();
  }

  ngOnInit(): void {
    this.getPlacesRecommend();
    this.subscription = interval(60000) // Verificar cada minuto
      .subscribe(() => this.placeResponseDTO.forEach(r => { this.checkIfOpen(r.id) }));
    this.placeResponseDTO.forEach(r => { this.checkIfOpen(r.id) })
  }

  checkIfOpen(id: string) {
    this.publicService.isOpen(id).subscribe(isOpen => {
      this.placeResponseDTO.forEach(r => { r.id === id ? r.isOpen = isOpen : r.isOpen })
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }


  public getPlacesRecommend() {

    this.placeService.recommendPlaces(this.idUser).subscribe({
      next: data => {
        this.placeResponseDTO = data.response;
      }
    });
  }

}
