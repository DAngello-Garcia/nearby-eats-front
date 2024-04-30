import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PlaceCreateDTO } from '../../dto/place-create-dto';

@Component({
  selector: 'app-crear-lugar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './crear-lugar.component.html',
  styleUrl: './crear-lugar.component.css'
})
export class CrearLugarComponent {

  placeCreateDTO: PlaceCreateDTO;

  constructor() {
    this.placeCreateDTO = new PlaceCreateDTO();
  }

  public createPlace() {
    console.log(this.placeCreateDTO);
  }
}
