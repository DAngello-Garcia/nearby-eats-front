import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MenssageDTO } from '../../dto/menssage-dto';
import { Observable } from 'rxjs';
import { Location } from '../../dto/clases/location';

@Injectable({
  providedIn: 'root'
})
export class PublicServiceService {

  private publicURL = "https://nearbyeats-1.onrender.com/api/public";

  constructor(private http: HttpClient) { }

  public getPlacesByCategory(categorys: string): Observable<MenssageDTO> {
    return this.http.get<MenssageDTO>(`${this.publicURL}/get-place/by-category/${categorys}`);
  }

  public getPlacesByName(name: string): Observable<MenssageDTO> {
    return this.http.get<MenssageDTO>(`${this.publicURL}/get-place/by-name/${name}`);
  }

  public getPlacesByLocation(): Observable<MenssageDTO> {
    return this.http.get<MenssageDTO>(`${this.publicURL}/get-place/by-location`);
  }

  public getPlacesStatus(): Observable<MenssageDTO> {
    return this.http.get<MenssageDTO>(`${this.publicURL}/get-place-status`);
  }

  public getCities(): Observable<MenssageDTO> {
    return this.http.get<MenssageDTO>(`${this.publicURL}/get-cities`);
  }

  public getCategories(): Observable<MenssageDTO> {
    return this.http.get<MenssageDTO>(`${this.publicURL}/get-categories`);
  }

  public isOpen(id: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.publicURL}/${id}/isOpen`);
  }

}
