import { booleanPointInPolygon } from "@turf/boolean-point-in-polygon";
import type { Polygon, Position } from "geojson";
import type { LatLng, LatLngTuple } from "@/shared/types/geo";

/** GeoJSON stores coordinates as [lng, lat]; the domain uses { lat, lng }. Convert here, nowhere else. */
export function lngLatToLatLng(position: Position): LatLng {
  const [lng, lat] = position;
  return { lat, lng };
}

/** Inverse of `lngLatToLatLng`, for the rare case we need to hand data back to GeoJSON. */
export function latLngToLngLat(point: LatLng): [number, number] {
  return [point.lng, point.lat];
}

/** Leaflet expects [lat, lng] tuples per ring point; GeoJSON gives [lng, lat] per ring position. */
export function polygonToLatLngRings(polygon: Polygon): LatLngTuple[][] {
  return polygon.coordinates.map((ring) =>
    ring.map((position) => [position[1], position[0]]),
  );
}

/** Bounding box in Leaflet's [south-west, north-east] tuple form, across all given polygons. */
export function getPolygonsBounds(
  polygons: Polygon[],
): [LatLngTuple, LatLngTuple] {
  if (polygons.length === 0) {
    throw new Error("getPolygonsBounds: at least one polygon is required");
  }

  let south = Infinity;
  let west = Infinity;
  let north = -Infinity;
  let east = -Infinity;

  for (const polygon of polygons) {
    for (const ring of polygon.coordinates) {
      for (const [lng, lat] of ring) {
        if (lat < south) south = lat;
        if (lat > north) north = lat;
        if (lng < west) west = lng;
        if (lng > east) east = lng;
      }
    }
  }

  return [
    [south, west],
    [north, east],
  ];
}

/** Delegates to turf, which expects [lng, lat] coordinates like the rest of GeoJSON. */
export function isPointInPolygon(point: LatLng, polygon: Polygon): boolean {
  return booleanPointInPolygon(latLngToLngLat(point), polygon);
}
