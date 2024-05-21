import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ItemNegocioDTO } from '../../../dto/place/item-negocio-dto';
import { MatDialog } from '@angular/material/dialog';
import { TokenService } from '../../../services/token.service';
import { PlaceServiceService } from '../../../services/controllers/place-service.service';
import { error } from 'console';
import { DeletePlaceDTO } from '../../../dto/place/delete-place-dto';
import { CommentServiceService } from '../../../services/controllers/comment-service.service';

@Component({
  selector: 'app-gestion-negocios',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './gestion-negocios.component.html',
  styleUrl: './gestion-negocios.component.css',
})
export class GestionNegociosComponent {
  @ViewChild('confirmModal') confirmModal: any;

  negocios: ItemNegocioDTO[];
  seleccionados: ItemNegocioDTO[];
  textoBtnDelete: string;
  deletePlaceDTO: DeletePlaceDTO | undefined;

  constructor(
    private tokenService: TokenService,
    private placeService: PlaceServiceService,
    private commentService: CommentServiceService
  ) {
    this.negocios = [];
    this.seleccionados = [];
    this.textoBtnDelete = '';
    this.listarNegocios();
  }

  public listarNegocios() {
    const idUser = this.tokenService.getId();

    this.placeService.getPlacesByClientId(idUser).subscribe({
      next: (data) => {
        this.negocios = data.response;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  public seleccionar(producto: ItemNegocioDTO, estado: boolean) {
    if (estado) {
      this.seleccionados.push(producto);
    } else {
      this.seleccionados.splice(this.seleccionados.indexOf(producto, 1));
    }
    this.updateMessage();
  }

  private updateMessage() {
    const size = this.seleccionados.length;

    if (size != 0) {
      if (size == 1) {
        this.textoBtnDelete = '1 Elemento';
      } else {
        this.textoBtnDelete = size + ' Elementos';
      }
    } else {
      this.textoBtnDelete = '';
    }
  }

  public deletePlaces() {
    this.seleccionados.forEach((n) => {
      this.deletePlaceDTO = new DeletePlaceDTO();
      this.placeService.deletePlace(this.deletePlaceDTO).subscribe({
        next: (data) => {
          this.negocios = data.response;
        },
      });
      this.negocios = this.negocios.filter((negocio) => negocio.id !== n.id);
    });

    this.seleccionados = [];
    this.updateMessage();
  }

  public openModalDelete() {
    this.confirmModal.show();
  }
}
