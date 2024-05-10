import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DeletePlaceDTO } from '../../dto/place/delete-place-dto';
import { NegociosService } from '../../services/negocios.service';

@Component({
  selector: 'app-eliminar-lugar',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './eliminar-lugar.component.html',
  styleUrl: './eliminar-lugar.component.css'
})
export class EliminarLugarComponent {
  deletePlaceDTO: DeletePlaceDTO;

  constructor(private negocioService: NegociosService) {
    this.deletePlaceDTO = new DeletePlaceDTO();
  }

  public deletePlace() {
    this.negocioService.eliminar(this.deletePlaceDTO.placeId)
    console.log(this.deletePlaceDTO)
  }
}
