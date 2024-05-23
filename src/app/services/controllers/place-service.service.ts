import { Injectable } from '@angular/core';
import { PlaceCreateDTO } from '../../dto/place/place-create-dto';
import { Observable } from 'rxjs';
import { MenssageDTO } from '../../dto/menssage-dto';
import { HttpClient } from '@angular/common/http';
import { UpdatePlaceDTO } from '../../dto/place/update-place-dto';
import { DeletePlaceDTO } from '../../dto/place/delete-place-dto';
import { PlaceReviewDTO } from '../../dto/place/place-review-dto';
import { FavoritePlaceDTO } from '../../dto/place/favorite-place-dto';
import { ItemNegocioDTO } from '../../dto/place/item-negocio-dto';

@Injectable({
  providedIn: 'root'
})
export class PlaceServiceService {

  private placeURL = "http://localhost:8080/api/place";

  constructor(private http: HttpClient) { }

  public createPlace(placeCreateDTO: PlaceCreateDTO): Observable<MenssageDTO> {
    return this.http.post<MenssageDTO>(`${this.placeURL}/create-place`, placeCreateDTO);
  }

  public updatePlace(updatePlaceDTO: UpdatePlaceDTO): Observable<MenssageDTO> {
    return this.http.patch<MenssageDTO>(`${this.placeURL}/update-place`, updatePlaceDTO);
  }

  public deletePlace(deletePlaceDTO: DeletePlaceDTO): Observable<MenssageDTO> {
    return this.http.request<MenssageDTO>("DELETE", `${this.placeURL}/delete-place`, { body: deletePlaceDTO });
  }

  public getPlace(placeId: string | null): Observable<MenssageDTO> {
    return this.http.get<MenssageDTO>(`${this.placeURL}/get-place/${placeId}`);
  }

  public getPlacesByCategory(category: string): Observable<MenssageDTO> {
    return this.http.get<MenssageDTO>(`${this.placeURL}/get-place/by-category/${category}`);
  }

  public getPlacesByName(name: string): Observable<MenssageDTO> {
    return this.http.get<MenssageDTO>(`${this.placeURL}/get-place/by-name/${name}`);
  }

  public getPlacesByClientId(clientId: string): Observable<MenssageDTO> {
    return this.http.get<MenssageDTO>(`${this.placeURL}/get-place/by-user-id/${clientId}`);
  }

  public getPlacesMod(status: string): Observable<MenssageDTO> {
    return this.http.get<MenssageDTO>(`${this.placeURL}/get-place/by-status-mod/${status}`);
  }

  public getPlacesByModerator(status: string): Observable<MenssageDTO> {
    return this.http.get<MenssageDTO>(`${this.placeURL}/get-place/by-status-by-mod/${status}`);
  }

  public getPlacesByLocation(location: string): Observable<MenssageDTO> {
    return this.http.get<MenssageDTO>(`${this.placeURL}/get-place/by-location/${location}`);
  }

  public reviewPlace(placeReviewDTO: PlaceReviewDTO): Observable<MenssageDTO> {
    return this.http.post<MenssageDTO>(`${this.placeURL}/review-place`, placeReviewDTO);
  }

  public recommendPlaces(userId: string): Observable<MenssageDTO> {
    return this.http.post<MenssageDTO>(`${this.placeURL}/recomend-places/${userId}`, userId);
  }

  public saveFavoritePlace(placeId: string ): Observable<MenssageDTO> {
    return this.http.get<MenssageDTO>(`${this.placeURL}/save/favorite/place/${placeId}`);
  }

  public deleteFavoritePlace(placeId: string): Observable<MenssageDTO> {
    return this.http.get<MenssageDTO>(`${this.placeURL}/delete/favorite/place/${placeId}`);
  }

}
