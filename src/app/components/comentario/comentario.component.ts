import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommentDTO } from '../../dto/comment/comment-dto';
import { CommentServiceService } from '../../services/controllers/comment-service.service';
import { ActivatedRoute } from '@angular/router';
import { ItemNegocioDTO } from '../../dto/place/item-negocio-dto';

@Component({
  selector: 'app-comentario',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './comentario.component.html',
  styleUrl: './comentario.component.css'
})
export class ComentarioComponent {
  commentDTO: CommentDTO
  placeId: string
  negocio: ItemNegocioDTO;


  constructor(private commentService: CommentServiceService, private ruta: ActivatedRoute) {
    this.negocio = new ItemNegocioDTO();
    this.commentDTO = 
    this.placeId = ruta.snapshot.params['id']
  }

  public comentar() {
    this.commentDTO.placeId = this.placeId
    this.commentService.createComment(this.commentDTO).subscribe({
      next: (data) => {
        console.log("Comentario creado");
      },
      error: (error) => {
        console.log("Error al comentar");
      }
    });
  }

/*   getDummyReviews() {
    return [
      {
        reviewer: 'John Doe',
        rating: 4,
        profileImage: 'https://via.placeholder.com/50',
      },
      {
        reviewer: 'Jane Smith',
        rating: 5,
        profileImage: 'https://via.placeholder.com/50',
      },
      {
        reviewer: 'Sam Brown',
        rating: 3,
        profileImage: 'https://via.placeholder.com/50',
      },
    ];
  }

  public getStars(rating: number): number[] {
    return new Array(rating);
  } */
}
