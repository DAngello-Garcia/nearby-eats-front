import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PlaceReviewDTO } from '../../dto/place/place-review-dto';
import { PlaceServiceService } from '../../services/controllers/place-service.service';
import { ActivatedRoute } from '@angular/router';
import { PublicServiceService } from '../../services/controllers/public.service';

@Component({
  selector: 'app-revision',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './revision.component.html',
  styleUrl: './revision.component.css'
})
export class RevisionComponent {
  placeReviewDTO: PlaceReviewDTO
  placeId: string
  placeStatus: string[];

  constructor(private placeService: PlaceServiceService, private publicService: PublicServiceService, private ruta: ActivatedRoute) {
    this.placeReviewDTO = new PlaceReviewDTO()
    this.placeId = ruta.snapshot.params['id']
    this.placeStatus = []
    this.uploadPlaceStatus()
  }

  public review() {
    this.placeReviewDTO.placeId = this.placeId
    this.placeService.reviewPlace(this.placeReviewDTO).subscribe({
      next: (data) => {
        console.log("Revisión creado");
      },
      error: (error) => {
        console.log("Error al revisar");
      }
    });
  }

  public uploadPlaceStatus() {
    this.publicService.getPlacesStatus().subscribe({
      next: (data) => {
        this.placeStatus = data.response;
      },
      error: (error) => {
        console.log("Error al cargar los status");
      }
    })
  }

}
