declare module '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions' {
    import { IControl } from 'mapbox-gl';
  
    interface MapboxDirectionsOptions {
      accessToken: string;
      unit?: 'imperial' | 'metric';
      profile?: 'mapbox/driving' | 'mapbox/walking' | 'mapbox/cycling';
      interactive?: boolean;
      controls?: {
        inputs?: boolean;
        instructions?: boolean;
      };
    }
  
    export default class MapboxDirections implements IControl {
      constructor(options?: MapboxDirectionsOptions);
      onAdd(map: mapboxgl.Map): HTMLElement;
      onRemove(map: mapboxgl.Map): void;
      setOrigin(origin: [number, number]): void;
      setDestination(destination: [number, number]): void;
    }
  }
  