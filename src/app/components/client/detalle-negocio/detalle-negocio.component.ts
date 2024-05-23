import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemNegocioDTO } from '../../../dto/place/item-negocio-dto';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PlaceServiceService } from '../../../services/controllers/place-service.service';
import { MapaService } from '../../../services/mapa.service';
import { TokenService } from '../../../services/token.service';
import { ComentarioComponent } from '../comentario/comentario.component';

@Component({
  selector: 'app-detalle-negocio',
  standalone: true,
  templateUrl: './detalle-negocio.component.html',
  styleUrl: './detalle-negocio.component.css',
  imports: [CommonModule, FormsModule, ComentarioComponent, RouterModule],
})
export class DetalleNegocioComponent implements OnInit {

  codePlace: string = '';
  negocio: ItemNegocioDTO;
  canEdit: boolean = false;
  star: number[] = [];
  end: number[] = []

  constructor(
    private tokenService: TokenService,
    private route: ActivatedRoute,
    private placeService: PlaceServiceService,
    private mapaService: MapaService
  ) {
    this.negocio = new ItemNegocioDTO();
    this.route.params.subscribe((params) => {
      this.codePlace = params['id'];
    });
  }

  ngOnInit(): void { 
    this.mapaService.createMap( );
    this.mapaService.agregarDirections();
    this.mapaService.getCurrentPosition().subscribe({
      next: data => {
        this.star = [  data.longitude, data.latitude ];
        this.mapaService.paintMarcadorUser( this.star );
        this.getPlace();
      }
    });
  
  }

  private getPlace() {
    this.placeService.getPlace(this.codePlace).subscribe({
      next: (data) => {
        this.negocio = data.response;
        this.canEdit = this.tokenService.getId() === this.negocio.createdBy;

        this.end = [ this.negocio.location.coordinates[1], this.negocio.location.coordinates[0] ];
        this.mapaService.paintMarcadorUser( this.end );

        if(this.star.length != 0){
          this.mapaService.setRoute(this.star, this.end);
        }

      },
    });
  }
}
