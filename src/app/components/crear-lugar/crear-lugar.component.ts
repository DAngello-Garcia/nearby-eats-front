import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PlaceCreateDTO } from '../../dto/place-create-dto';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crear-lugar',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './crear-lugar.component.html',
  styleUrl: './crear-lugar.component.css'
})
export class CrearLugarComponent {

  placeCreateDTO: PlaceCreateDTO;
  archivos!: FileList;

  constructor() {
    this.placeCreateDTO = new PlaceCreateDTO();
  }

  public createPlace() {
    console.log(this.placeCreateDTO);
  }

  public onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.archivos = event.target.files;
      this.placeCreateDTO.images = this.archivos[0].name;
    }
  }
}
