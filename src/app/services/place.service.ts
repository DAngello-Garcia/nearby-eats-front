import { Injectable } from '@angular/core';
import { ItemNegocioDTO } from '../dto/place/item-negocio-dto';
import { PlaceServiceService } from './controllers/place-service.service';
import { UserInformationDTO } from '../dto/user/user-information-dto';
import { UserService } from './user.service';
import { TokenService } from './token.service';
import { UserServiceService } from './controllers/user-service.service';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  idPlace: string = '';
  idUser: string = '';
  places : ItemNegocioDTO[];
  user: UserInformationDTO;

  constructor(
    private placeService: PlaceServiceService,
    private userService: UserServiceService,
    private tokenService: TokenService
  ) {
      this.idUser = tokenService.getId();
      this.places = [];
      this.user = new UserInformationDTO();
   }
   
   public getIdPlaceFavorite() {
      this.userService.getUser(this.idUser).subscribe({
        next: data => {
          this.user = data.response;
          
        }
      });
      
      for (let i = 0; i < this.user.favoritePlaces.length; i++) {
        const place = this.user.favoritePlaces[i];
        this.placeService.getPlace(place).subscribe({
          next: data => {
            this.places = data.response;
          }
        })
      }
   }
}
