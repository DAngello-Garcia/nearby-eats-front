import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommentDTO } from '../../../dto/comment/comment-dto';
import { TokenService } from '../../../services/token.service';
import { CommentServiceService } from '../../../services/controllers/comment-service.service';
import { ActivatedRoute } from '@angular/router';
import { ItemNegocioDTO } from '../../../dto/place/item-negocio-dto';
import Swal from 'sweetalert2';
import { PlaceServiceService } from '../../../services/controllers/place-service.service';
import { CommentItem } from '../../../dto/comment/comment-item';
import { ReplyDTO } from '../../../dto/comment/reply-dto';

@Component({
  selector: 'app-comentario',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './comentario.component.html',
  styleUrl: './comentario.component.css',
})
export class ComentarioComponent implements OnInit {
  // Variables complementarias
  @Input() placeId: string = '';
  negocio: ItemNegocioDTO;
  userRole: string;
  isOwner: boolean = false;

  // Variables para comentarios
  comments: CommentItem[] = [];
  commentDTO: CommentDTO;
  currentCommentId: string = '';
  replyDTO: ReplyDTO;

  constructor(
    private tokenService: TokenService,
    private placeService: PlaceServiceService,
    private commentService: CommentServiceService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {
    this.negocio = new ItemNegocioDTO();
    this.commentDTO = new CommentDTO();
    this.replyDTO = new ReplyDTO();
    this.userRole = this.tokenService.getRole();
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.placeId = params['id'];
      this.cdr.detectChanges(); // Forzar la detección de cambios
    });
    this.getPlace();
    this.getComments();
  }

  private getPlace() {
    this.placeService.getPlace(this.placeId).subscribe({
      next: (data) => {
        this.negocio = data.response;
        this.isOwner = this.tokenService.getId() === this.negocio.createdBy;
      },
    });
  }

  private getComments() {
    this.commentService.getCommentsByPlace(this.placeId).subscribe({
      next: (data) => {
        this.comments = data.response;
      },
    });
  }

  public getStars(rating: number): Array<number> {
    return new Array(rating).fill(1); // Llenamos un arreglo con la cantidad de estrellas
  }

  public setScore(score: number) {
    this.commentDTO.score = score;
  }

  public comentar() {
    if (!this.commentDTO.score) {
      Swal.fire('Error', 'Debes dar una calificación', 'error');
      return;
    }
    if (!this.commentDTO.comment) {
      Swal.fire('Error', 'Debes escribir un comentario', 'error');
      return;
    }

    // Validar que el usuario haya iniciado sesión
    if (!this.tokenService.isLogged()) {
      Swal.fire('Error', 'Debes iniciar sesión para comentar', 'error');
      return;
    }

    // Validar que el usuario no sea dueño del lugar
    if (this.isOwner) {
      Swal.fire('Error', 'No puedes comentar tu propio lugar', 'error');
      return;
    }

    // Validar que el usuario no haya comentado antes
    for (let comment of this.comments) {
      if (comment.clientId === this.tokenService.getId()) {
        Swal.fire('Error', 'No puedes comentar otra vez', 'error');
        return;
      }
    }
    this.commentDTO.placeId = this.placeId
    // Crear el comentario
    this.commentService.createComment(this.commentDTO).subscribe({
      next: (data) => {
        Swal.fire('Éxito', 'Comentario creado', 'success');
        // Refrescar el componente
        this.getComments();
      },
      error: (error) => {
        console.log(error);
        Swal.fire('Error', error.error.response, 'error');
      },
    });
  }

  public prepareResponse(commentId: string) {
    this.currentCommentId = commentId;
  }

  public responder() {
    if (!this.tokenService.isLogged()) {
      Swal.fire('Error', 'Debes iniciar sesión para responder', 'error');
      return;
    }
    if (!this.currentCommentId) {
      Swal.fire(
        'Error',
        'Se requiere un comentario para crear una respuesta',
        'error'
      );
      return;
    }

    if (!this.replyDTO.text) {
      Swal.fire('Error', 'Debes escribir una respuesta', 'error');
      return;
    }

    this.replyDTO.commentId = this.currentCommentId;
    this.commentService.answerComment(this.replyDTO).subscribe({
      next: (data) => {
        Swal.fire('Éxito', 'Respuesta creada', 'success');
        // Refrescar el componente
        this.getComments();
      },
      error: (error) => {
        console.log(error);
        Swal.fire('Error', error.error.response, 'error');
      },
    });
  }
}
