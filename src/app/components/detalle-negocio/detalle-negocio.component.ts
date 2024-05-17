import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemNegocioDTO } from '../../dto/place/item-negocio-dto';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PlaceServiceService } from '../../services/controllers/place-service.service';
import { MenssageDTO } from '../../dto/menssage-dto';


@Component({
  selector: 'app-detalle-negocio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './detalle-negocio.component.html',
  styleUrl: './detalle-negocio.component.css'
})
export class DetalleNegocioComponent {

  codePlace: string = '';
  negocio: ItemNegocioDTO;

  constructor(
    private route: ActivatedRoute,
    private placeService: PlaceServiceService
  ) {
    this.negocio = new ItemNegocioDTO()
    this.route.params.subscribe((params) => {
      this.codePlace = params['id'];
      this.getPlace();
    });
  }

  public getPlace() {
    this.placeService.getPlace(this.codePlace).subscribe({
      next: data => {
        this.negocio = data.response
      }
    });
  }
}
