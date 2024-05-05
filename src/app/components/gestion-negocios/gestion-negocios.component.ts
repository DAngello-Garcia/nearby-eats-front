import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ItemNegocioDTO } from '../../dto/item-negocio-dto';
import { NegociosService } from '../../services/negocios.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-gestion-negocios',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './gestion-negocios.component.html',
  styleUrl: './gestion-negocios.component.css'
})
export class GestionNegociosComponent {
  @ViewChild('confirmModal') confirmModal: any;

  negocios: ItemNegocioDTO[];
  seleccionados: ItemNegocioDTO[];
  textoBtnDelete: string;

  constructor(
    private negocioService: NegociosService,
    private dialog: MatDialog
  ) {
    this.negocios = [];
    this.seleccionados = [];
    this.textoBtnDelete = '';
    this.listarNegocios();
  }

  public listarNegocios() {
    this.negocios = this.negocioService.listar();
  }

  public seleccionar(producto: ItemNegocioDTO, estado: boolean) {
    if(estado) {
      this.seleccionados.push(producto);
    } else {
      this.seleccionados.splice(this.seleccionados.indexOf(producto, 1))
    }
    this.updateMessage();
  }

  private updateMessage() {
    const size = this.seleccionados.length;

    if(size != 0) {
      if(size == 1) {
        this.textoBtnDelete = "1 Elemento";
      } else {
        this.textoBtnDelete = size + " Elementos";
      }
    } else {
      this.textoBtnDelete = "";
    }
  }

  public deletePlaces() {
    
    this.seleccionados.forEach(n => {
      this.negocioService.eliminar(n.codigoNegocio);
      this.negocios = this.negocios.filter(negocio =>
         negocio.codigoNegocio !== n.codigoNegocio);
    });

    this.seleccionados = [];
    this.updateMessage();
  }

  public openModalDelete() {
    this.confirmModal.show();
  }
}
