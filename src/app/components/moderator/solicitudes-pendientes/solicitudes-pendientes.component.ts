import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { table } from 'console';
import { PlaceServiceService } from '../../../services/controllers/place-service.service';
import { ItemNegocioDTO } from '../../../dto/place/item-negocio-dto';

@Component({
  selector: 'app-solicitudes-pendientes',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './solicitudes-pendientes.component.html',
  styleUrl: './solicitudes-pendientes.component.css'
})
export class SolicitudesPendientesComponent implements OnInit {

  negocios: ItemNegocioDTO[] = [];
  status: string = 'PENDING';

  constructor(
    private placeService: PlaceServiceService
  ) { }

  ngOnInit(): void {
    this.getPlacesByMod();
  }

  public getPlacesByMod() {

    this.placeService.getPlacesMod(this.status).subscribe({
      next: data => {
        this.negocios = data.response;
      }
    })
  }

  public setStatus(tab: string) {
    this.status = tab;
    this.getPlacesByMod()
  }
}
