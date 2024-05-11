import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommentDTO } from '../../dto/comment/comment-dto';
import { CommentServiceService } from '../../services/controllers/comment-service.service';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private commentService: CommentServiceService, private ruta: ActivatedRoute) {
    this.commentDTO = new CommentDTO();
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
}
