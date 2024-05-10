import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MenssageDTO } from '../../dto/menssage-dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublicServiceService {

  private publicURL = "http://localhost:8080/api/public";

  constructor(private http: HttpClient) { }

  public getPlacesByCategory(category: string): Observable<MenssageDTO> {
    return this.http.get<MenssageDTO>(`${this.publicURL}/get-place/by-category/:category`);
  }

  public getPlacesByName(name: string): Observable<MenssageDTO> {
    return this.http.get<MenssageDTO>(`${this.publicURL}/get-place/by-name/:name`);
  }

  public getPlacesByLocation(location: string): Observable<MenssageDTO> {
    return this.http.get<MenssageDTO>(`${this.publicURL}/get-place/by-location/:location`);
  }

}
