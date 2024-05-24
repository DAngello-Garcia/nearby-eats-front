import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PlaceReviewDTO } from '../../dto/place/place-review-dto';
import { PlaceServiceService } from '../../services/controllers/place-service.service';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { PublicServiceService } from '../../services/controllers/public.service';
import { ItemNegocioDTO } from '../../dto/place/item-negocio-dto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-revision',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './revision.component.html',
  styleUrl: './revision.component.css'
})
export class RevisionComponent {
  placeReviewDTO: PlaceReviewDTO
  placeId: string
  place!: ItemNegocioDTO;
  placeStatus: string[] = []

  constructor(
    private placeService: PlaceServiceService,
    private publicService: PublicServiceService,
    private ruta: ActivatedRoute,
    private route: Router) {
    this.placeReviewDTO = new PlaceReviewDTO('', '', '')
    this.placeId = ruta.snapshot.params['id']
    this.uploadPlaceStatus()
    this.placeService.getPlace(this.placeId).subscribe({
      next: data => {
        this.place = data.response
      }
    })
  }

  public review() {
    console.log(this.placeReviewDTO)
    this.placeReviewDTO.placeId = this.placeId
    this.placeService.reviewPlace(this.placeReviewDTO).subscribe({
      next: (data) => {
        console.log("Revisión creado");
        Swal.fire({
          title: 'Se agrego el negocio con éxito', 
          text: data.response, 
          icon : 'success',
          timer: 3000,
          showConfirmButton: false,
          timerProgressBar: true
        });

        setTimeout(() => {
          this.route.navigate(['/']);
        }, 3000)
      },
      error: (error) => {
        console.log("Error al revisar" + error);
        Swal.fire('Error al crear la revisión', error.response, 'error');
      }
    });
  }

  public uploadPlaceStatus() {
    this.publicService.getPlacesStatus().subscribe({
      next: (data) => {
        this.placeStatus = data.response;
      },
      error: (error) => {
        console.log("Error al cargar los status" + error);
      }
    })
  }

}
