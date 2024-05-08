import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PlaceCreateDTO } from '../../dto/place-create-dto';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Schedule } from '../../dto/schedule';
import { NegociosService } from '../../services/negocios.service';
import { RegistroNegocioDTO } from '../../dto/registro-negocio-dto';
import { MapaService } from '../../services/mapa.service';

@Component({
  selector: 'app-crear-lugar',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './crear-lugar.component.html',
  styleUrl: './crear-lugar.component.css'
})
export class CrearLugarComponent implements OnInit {

  registroNegocioDTO: RegistroNegocioDTO;
  placeCreateDTO: PlaceCreateDTO;
  archivos!: FileList;
  schedules: Schedule[];
  categories: string[];

  constructor(private negocioService: NegociosService, private mapService:MapaService) {
    this.registroNegocioDTO = new RegistroNegocioDTO();
    this.placeCreateDTO = new PlaceCreateDTO();
    this.categories = [];
    this.schedules = [ new Schedule('', '', '') ];
    this.uploadCategories();
  }

  ngOnInit(): void {
    this.mapService.createMap();
  }

  public createPlace() {
    this.registroNegocioDTO.horarios = this.schedules;
    this.negocioService.crear(this.registroNegocioDTO);

    console.log(this.registroNegocioDTO);
  }

  public addSchedule() {
    this.schedules.push(new Schedule('', '', ''));
  }

  public onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.archivos = event.target.files;
      this.placeCreateDTO.images = this.archivos[0].name;
    }
  }

  private uploadCategories() {
    this.categories = ["Supermercado", "Tienda", "Restaurante", "Comida Rápida",
     "Hotel", "Museo", "Café", "Otros"];
  }
}
