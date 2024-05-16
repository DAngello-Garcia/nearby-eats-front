import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MenssageDTO } from '../../dto/menssage-dto';
import { Observable } from 'rxjs';
import { Location } from '../../dto/clases/location';

@Injectable({
  providedIn: 'root'
})
export class PublicServiceService {

  private publicURL = "http://localhost:8080/api/public";

  constructor(private http: HttpClient) { }

  public getPlacesByCategory(categorys: string[]): Observable<MenssageDTO> {
    return this.http.get<MenssageDTO>(`${this.publicURL}/get-place/by-category/${categorys}`);
  }

  public getPlacesByName(name: string): Observable<MenssageDTO> {
    return this.http.get<MenssageDTO>(`${this.publicURL}/get-place/by-name/${name}`);
  }

  public getPlacesByLocation(): Observable<MenssageDTO> {
    return this.http.get<MenssageDTO>(`${this.publicURL}/get-place/by-location`);
  }

  public getPlacesStatus(status: string): Observable<MenssageDTO> {
    return this.http.get<MenssageDTO>(`${this.publicURL}/get-place-status/${status}`);
  }

  public getCities(): Observable<MenssageDTO> {
    return this.http.get<MenssageDTO>(`${this.publicURL}/get-cities`);
  }

  public getCategories(): Observable<MenssageDTO> {
    return this.http.get<MenssageDTO>(`${this.publicURL}/get-categories`);
  }

}
