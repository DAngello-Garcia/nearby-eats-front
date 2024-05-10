import { Injectable } from '@angular/core';
import { PlaceCreateDTO } from '../dto/place/place-create-dto';
import { Observable } from 'rxjs';
import { MenssageDTO } from '../dto/menssage-dto';
import { HttpClient } from '@angular/common/http';
import { UpdatePlaceDTO } from '../dto/place/update-place-dto';

@Injectable({
  providedIn: 'root'
})
export class PlaceServiceService {

  private placeURL = "http://localhost:8080/api/user";

  constructor(private http: HttpClient) { }

  public createPlace(placeCreateDTO: PlaceCreateDTO): Observable<MenssageDTO> {
    return this.http.post<MenssageDTO>(`${this.placeURL}/create-place`, placeCreateDTO)
  }

  public updatePlace(updatePlaceDTO: UpdatePlaceDTO): Observable<MenssageDTO> {
    return this.http.patch<MenssageDTO>(`${this.placeURL}/`, updatePlaceDTO)

  }
}
