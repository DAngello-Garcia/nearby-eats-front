import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { PlaceServiceService } from '../services/controllers/place-service.service';
import { Observable } from 'rxjs';
import { MenssageDTO } from '../dto/menssage-dto';

export const updatePlaceResolverResolver: ResolveFn<Observable<MenssageDTO>> = (route, state) => {
  const placeId = route.paramMap.get('id');
  return inject(PlaceServiceService).getPlace(placeId)
};
