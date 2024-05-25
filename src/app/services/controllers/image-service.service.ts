import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MenssageDTO } from '../../dto/menssage-dto';
import { ImageDTO } from '../../dto/image/image-dto';

@Injectable({
  providedIn: 'root'
})
export class ImageServiceService {

  private imageURL = "https://nearbyeats.onrender.com/api/images";


  constructor(private http: HttpClient) { }

  public uploadImage(image: FormData): Observable<MenssageDTO> {
    return this.http.post<MenssageDTO>(`${this.imageURL}/upload`, image);
  }

  public deleteImage(imageDTO: ImageDTO): Observable<MenssageDTO> {
    return this.http.request<MenssageDTO>('delete', `${this.imageURL}/delete`, {body: imageDTO});
  }

  public uploadImages(image: FormData): Observable<any> {
    return this.http.post<MenssageDTO>(`${this.imageURL}/upload-images`, image);
  }

}
