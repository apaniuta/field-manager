import type { Polygon } from "geojson";

export interface Field {
  id: string;
  name: string;
  crop: string;
  areaHa: number;
  geometry: Polygon;
}

export interface FieldProperties {
  id: string;
  name: string;
  area: number;
  crop: string;
}
