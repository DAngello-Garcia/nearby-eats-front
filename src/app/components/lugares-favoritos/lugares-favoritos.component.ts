import { Component, OnInit } from '@angular/core';
import { UserInformationDTO } from '../../dto/user/user-information-dto';
import { ItemNegocioDTO } from '../../dto/place/item-negocio-dto';
import { UserService } from '../../services/user.service';
import { PlaceService } from '../../services/place.service';
import { RouterLink } from '@angular/router';
import { UserServiceService } from '../../services/controllers/user-service.service';
import { PlaceServiceService } from '../../services/controllers/place-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lugares-favoritos',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './lugares-favoritos.component.html',
  styleUrl: './lugares-favoritos.component.css'
})
export class LugaresFavoritosComponent implements OnInit {

  client: UserInformationDTO;
  places: ItemNegocioDTO[];
  idUser: string = ''
  

  constructor(
    private userService: UserServiceService,
    private placeService: PlaceServiceService
  ) {
      this.client = new UserInformationDTO();
      this.places = []
  }

  ngOnInit(): void {
    }

    public getIdPlaceFavorite() {
      this.userService.getUser(this.idUser).subscribe({
        next: data => {
          this.client = data.response;
          
        }
      });
      
      for (let i = 0; i < this.client.favoritePlaces.length; i++) {
        const place = this.client.favoritePlaces[i];
        this.placeService.getPlace(place).subscribe({
          next: data => {
            this.places = data.response;
          }
        })
      }
   }
}
