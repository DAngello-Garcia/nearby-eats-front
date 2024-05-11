import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemNegocioDTO } from '../../dto/place/item-negocio-dto';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PlaceServiceService } from '../../services/controllers/place-service.service';


@Component({
  selector: 'app-detalle-negocio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './detalle-negocio.component.html',
  styleUrl: './detalle-negocio.component.css'
})
export class DetalleNegocioComponent {

  codePlace: string = '';
  negocio: ItemNegocioDTO | undefined;

  constructor(
    private route: ActivatedRoute,
    private placeService: PlaceServiceService
  ) {
    this.route.params.subscribe((params) => {
      this.codePlace = params['codigo'];
      this.getPlace();
    });
  }

  public getPlace() {
    const placeConsulted = this.placeService.getPlace(this.codePlace);

    if (placeConsulted != undefined) {
      this.negocio = placeConsulted;
    }
  }
}
