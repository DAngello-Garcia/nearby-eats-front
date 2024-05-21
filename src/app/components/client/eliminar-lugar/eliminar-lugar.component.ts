import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PlaceServiceService } from '../../../services/controllers/place-service.service';
import { TokenService } from '../../../services/token.service';
import { DeletePlaceDTO } from '../../../dto/place/delete-place-dto';
import { ItemNegocioDTO } from '../../../dto/place/item-negocio-dto';

@Component({
  selector: 'app-eliminar-lugar',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './eliminar-lugar.component.html',
  styleUrl: './eliminar-lugar.component.css'
})
export class EliminarLugarComponent {

  place: ItemNegocioDTO;
  deletePlaceDTO: DeletePlaceDTO;
  idUser: string = '';
  idPlace: string = ''


  constructor(
    private negocioService: PlaceServiceService,
    private tokenService: TokenService) {

      this.idUser = tokenService.getId();
      this.place = new ItemNegocioDTO();
      this.deletePlaceDTO = new DeletePlaceDTO();
  }

  public deletePlace() {
    this.negocioService.deletePlace(this.deletePlaceDTO).subscribe({
      next: data => {
        
        console.log(data)
      }
    })
  }
}
