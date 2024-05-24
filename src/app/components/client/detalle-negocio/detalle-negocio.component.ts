import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemNegocioDTO } from '../../../dto/place/item-negocio-dto';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PlaceServiceService } from '../../../services/controllers/place-service.service';
import { MapaService } from '../../../services/mapa.service';
import { TokenService } from '../../../services/token.service';
import { ComentarioComponent } from '../comentario/comentario.component';
import { Subscription, interval } from 'rxjs';
import { PublicServiceService } from '../../../services/controllers/public.service';
import { FavoritePlaceDTO } from '../../../dto/place/favorite-place-dto';
import Swal from 'sweetalert2';


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
  favoritePlaceDTO: FavoritePlaceDTO;
  isFavorited: any;
  isOpen: boolean | null = null
  private subscription: Subscription | undefined

  constructor(
    private tokenService: TokenService,
    private route: ActivatedRoute,
    private placeService: PlaceServiceService,
    private mapaService: MapaService,
    private publicService: PublicServiceService
  ) {
    this.negocio = new ItemNegocioDTO();
    this.favoritePlaceDTO = new FavoritePlaceDTO();
    this.tokenService.getId();
    this.route.params.subscribe((params) => {
      this.codePlace = params['id'];
    });
  }

  ngOnInit(): void {
    this.mapaService.createMap();
    this.mapaService.agregarDirections();
    this.mapaService.getCurrentPosition().subscribe({
      next: data => {
        this.star = [data.longitude, data.latitude];
        this.mapaService.paintMarcadorUser(this.star);
        this.getPlace();
      }
    });
    this.subscription = interval(60000) // Verificar cada minuto
      .subscribe(() => this.checkIfOpen(this.codePlace));
    this.checkIfOpen(this.codePlace)
  }

  checkIfOpen(id: string) {
    this.publicService.isOpen(id).subscribe(isOpen => {
      this.isOpen = isOpen;
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private getPlace() {
    this.placeService.getPlace(this.codePlace).subscribe({
      next: (data) => {
        this.negocio = data.response;
        this.canEdit = this.tokenService.getId() === this.negocio.createdBy;

        this.end = [this.negocio.location.coordinates[1], this.negocio.location.coordinates[0]];
        this.mapaService.paintMarcadorUser(this.end);

        if (this.star.length != 0) {
          this.mapaService.setRoute(this.star, this.end);
        }

      },
    });
  }

  public toggleFavorite() {

    if (this.isFavorited) {
      this.deleteFavorite();
    } else {
      this.addFavorite();
    }
  }

  public addFavorite() {
    this.placeService.saveFavoritePlace(this.codePlace).subscribe({
      next: (data) => {
        this.favoritePlaceDTO = data.response;
        this.isFavorited = true;
        localStorage.setItem('isFavorited_' + this.codePlace, 'true');
      },
      error: (error) => {
        console.log('Error al guardar en favoritos');
        Swal.fire('Error', 'No se puede agregar otra vez a favoritos', 'error');
      }
    });
  }


  public deleteFavorite() {
    this.placeService.deleteFavoritePlace(this.codePlace).subscribe({
      next: data => {
        this.favoritePlaceDTO = data.response;
        this.isFavorited = false;
        localStorage.removeItem('isFavorited_' + this.codePlace);
      },
      error: (error) => {
        console.log('Error al eliminar el lugar en favorito', error);
        Swal.fire('Error', 'No se puede eliminar de favoritos este lugar ', 'error');
      }
    });
  }
}
