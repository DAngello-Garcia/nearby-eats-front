import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemNegocioDTO } from '../dto/place/item-negocio-dto';

declare var mapboxgl: any;
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';


@Injectable({
  providedIn: 'root'
})
export class MapaService {

  map: any;
  style: string = 'mapbox://styles/mapbox/streets-v11';
  directions: any;
  marcadores: any[];

  constructor() {
    mapboxgl.accessToken = 'pk.eyJ1IjoibmVhcmJ5ZWF0cyIsImEiOiJjbHZ0d3c2aG0xZzBtMmpvNjlsdzJ0N2NvIn0.x1y_wu93ubs27v2VKLSNXA';
    this.marcadores = [];
  }

  public createMap() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      center: [-72.309, 4.473],
      zoom: 4.5
    });

    this.map.addControl(new mapboxgl.NavigationControl());
    this.map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: { enableHighAccuracy: true },
        trackUserLocation: true
      })
    );

    this.directions = new MapboxDirections({
      accessToken: (mapboxgl as any).accessToken
    });
    this.map.addControl(this.directions, 'top-left');
  }

  public addMarcador(): Observable<any> {

    const mapGloabl = this.map;
    const marcadores = this.marcadores;

    return new Observable<any>(observer => {

      mapGloabl.on('click', function (e: any) {
        marcadores.forEach(marcador => marcador.remove());

        const marcador = new mapboxgl.Marker()
          .setLngLat([e.lngLat.lng, e.lngLat.lat])
          .addTo(mapGloabl);

        marcadores.push(marcador);
        observer.next(marcador._lngLat);
      });
    });
  }

  public paintMarcador(negocios: ItemNegocioDTO[]) {

    negocios.forEach(negocio => {
      new mapboxgl.Marker()
        .setLngLat([negocio.location.coordinates[1], negocio.location.coordinates[0]])
        .setPopup(new mapboxgl.Popup().setHTML(negocio.name))
        .addTo(this.map);
    });
  }

  public setRoute(start: number[], end: number[]) {
    this.directions.setOrigin(start);
    this.directions.setDestination(end);
  }
}

