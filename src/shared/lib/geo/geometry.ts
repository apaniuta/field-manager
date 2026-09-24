import { booleanPointInPolygon } from "@turf/boolean-point-in-polygon";
import type { Polygon } from "geojson";
import type { LatLng, LatLngTuple } from "@/shared/types/geo";

/** GeoJSON (and libraries built on it) expect [lng, lat]; the domain uses { lat, lng }. Convert here, nowhere else. */
export function latLngToLngLat(point: LatLng): [number, number] {
  return [point.lng, point.lat];
}

/** Leaflet expects [lat, lng] tuples per ring point; GeoJSON gives [lng, lat] per ring position. */
export function polygonToLatLngRings(polygon: Polygon): LatLngTuple[][] {
  return polygon.coordinates.map((ring) =>
    ring.map((position) => [position[1], position[0]]),
  );
}

/** Delegates to turf, which expects [lng, lat] coordinates like the rest of GeoJSON. */
export function isPointInPolygon(point: LatLng, polygon: Polygon): boolean {
  return booleanPointInPolygon(latLngToLngLat(point), polygon);
}
