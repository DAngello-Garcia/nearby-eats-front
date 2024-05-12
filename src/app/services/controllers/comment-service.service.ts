import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommentDTO } from '../../dto/comment/comment-dto';
import { Observable } from 'rxjs';
import { MenssageDTO } from '../../dto/menssage-dto';
import { ReplyDTO } from '../../dto/comment/reply-dto';
import { DeleteCommentDTO } from '../../dto/comment/delete-comment-dto';

@Injectable({
  providedIn: 'root'
})
export class CommentServiceService {

  private commentURL = "http://localhost:8080/api/comment";


  constructor(private http: HttpClient) { }

  public createComment(commentDTO: CommentDTO): Observable<MenssageDTO> {
    return this.http.post<MenssageDTO>(`${this.commentURL}/create-comment`, commentDTO);
  }

  public answerComment(replyCommentDTO: ReplyDTO): Observable<MenssageDTO> {
    return this.http.post<MenssageDTO>(`${this.commentURL}/answer-comment`, replyCommentDTO);
  }

  public deleteComment(deleteCommentDTO: DeleteCommentDTO): Observable<MenssageDTO> {
    return this.http.delete<MenssageDTO>(`${this.commentURL}/delete-comment`);
  }

  public getCommetsByPlace(placeId: string): Observable<MenssageDTO> {
    return this.http.get<MenssageDTO>(`${this.commentURL}/get-comments-by-place/${placeId}`);
  }

  public getAvarageScoreByPlace(placeId: string): Observable<MenssageDTO> {
    return this.http.get<MenssageDTO>(`${this.commentURL}/get-average-score-by-place/${placeId}`);
  }
}
