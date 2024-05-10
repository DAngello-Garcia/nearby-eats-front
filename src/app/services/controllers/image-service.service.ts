import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MenssageDTO } from '../../dto/menssage-dto';
import { ImageDTO } from '../../dto/image/image-dto';

@Injectable({
  providedIn: 'root'
})
export class ImageServiceService {

  private imageURL = "http://localhost:8080/api/images";


  constructor(private http: HttpClient) { }

  public uploadImage(image: string): Observable<MenssageDTO> {
    return this.http.post<MenssageDTO>(`${this.imageURL}/create-comment`, image);
  }

  public deleteImage(imageDTO: ImageDTO): Observable<MenssageDTO> {
    return this.http.delete<MenssageDTO>(`${this.imageURL}/create-comment`);
  }
}
