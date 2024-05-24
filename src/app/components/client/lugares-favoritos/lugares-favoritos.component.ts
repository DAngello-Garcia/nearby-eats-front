import { Component, OnInit } from '@angular/core';
import { UserInformationDTO } from '../../../dto/user/user-information-dto';
import { ItemNegocioDTO } from '../../../dto/place/item-negocio-dto';
import { RouterLink } from '@angular/router';
import { UserServiceService } from '../../../services/controllers/user-service.service';
import { PlaceServiceService } from '../../../services/controllers/place-service.service';
import { CommonModule } from '@angular/common';
import { TokenService } from '../../../services/token.service';
import { Subscription, forkJoin, interval } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { MapaService } from '../../../services/mapa.service';
import { FavoritePlaceDTO } from '../../../dto/place/favorite-place-dto';
import Swal from 'sweetalert2';
import { PublicServiceService } from '../../../services/controllers/public.service';

@Component({
  selector: 'app-lugares-favoritos',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './lugares-favoritos.component.html',
  styleUrl: './lugares-favoritos.component.css'
})
export class LugaresFavoritosComponent implements OnInit {

  client: UserInformationDTO;
  favoritePlaceDTO: FavoritePlaceDTO;
  places: ItemNegocioDTO[] = [];
  idUser: string = '';
  idPlace: string = '';
  private subscription: Subscription | undefined

  constructor(
    private userService: UserServiceService,
    private placeService: PlaceServiceService,
    private tokenService: TokenService,
    private mapaService: MapaService,
    private publicService: PublicServiceService
  ) {
    this.idUser = tokenService.getId();
    this.client = new UserInformationDTO();
    this.favoritePlaceDTO = new FavoritePlaceDTO();
    this.getIdPlaceFavorite();
    this.getPlacesFavorite();

  }

  ngOnInit(): void {
    this.mapaService.createMap();
    this.subscription = interval(60000) // Verificar cada minuto
      .subscribe(() => this.places.forEach(r => { this.checkIfOpen(r.id) }));
    this.places.forEach(r => { this.checkIfOpen(r.id) })
  }

  checkIfOpen(id: string) {
    this.publicService.isOpen(id).subscribe(isOpen => {
      this.places.forEach(r => { r.id === id ? r.isOpen = isOpen : r.isOpen })
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public getIdPlaceFavorite() {
    this.userService.getUser(this.idUser).pipe(
      switchMap(userResponse => {
        this.client = userResponse.response;
        const placeRequests = this.client.favoritePlaces.map(placeId =>
          this.placeService.getPlace(placeId).pipe(map(placeResponse => placeResponse.response))
        );
        return forkJoin(placeRequests);
      })
    ).subscribe({
      next: places => {
        this.places = places;
      },
      error: err => {
        console.error('Error fetching places', err);
      }
    });
  }

  public getPlacesFavorite() {

    for (let i = 0; i < this.client.favoritePlaces.length; i++) {
      const place = this.client.favoritePlaces[i];
      this.placeService.getPlace(place).subscribe({
        next: data => {
          this.places = data.response;
        }
      });
    }
  }

}
