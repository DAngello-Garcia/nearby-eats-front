import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemNegocioDTO } from '../dto/place/item-negocio-dto';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';

declare var mapboxgl: any;



@Injectable({
  providedIn: 'root'
})
export class MapaService {

  map: any;
  style: string = 'mapbox://styles/mapbox/standard';
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

  public paintMarcadorUser(ubicacion: number[]) {
    new mapboxgl.Marker()
      .setLngLat([ubicacion[0], ubicacion[1]])
      .addTo(this.map);
  }

  public setRoute(start: number[], end: number[]) {

    const directions: any = this.directions;

    this.map.on("load", () => {
      directions.setOrigin(start);
      directions.setDestination(end);
    });
  }

  public agregarDirections() {

    this.directions = new MapboxDirections({
      accessToken: (mapboxgl as any).accessToken,
      unit: "metric"
    });

    this.map.addControl(this.directions, 'top-left');
  }


  public getCurrentPosition(): Observable<any> {

    return new Observable<any>(observer => {

      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(position => {
          observer.next(position.coords);
        });
      }
    });
  }

  public calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Radio de la Tierra en km
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
    ; 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
    const distance = R * c; // Distancia en km
    return distance;
  }

  // Convierte grados a radianes
  private deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }
}

