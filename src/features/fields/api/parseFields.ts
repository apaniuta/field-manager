import type { FeatureCollection, Polygon } from "geojson";
import type { Field, FieldProperties } from "@/features/fields/types/field";

/**
 * Maps the GeoJSON "server response" to the domain model (`area` → `areaHa`).
 * No runtime validation on purpose: the mock is typed and checked by the compiler.
 * With a real API, this is the boundary where the response would be validated (see README).
 */
export function parseFields(
  collection: FeatureCollection<Polygon, FieldProperties>,
): Field[] {
  return collection.features.map(({ properties, geometry }) => ({
    id: properties.id,
    name: properties.name,
    crop: properties.crop,
    areaHa: properties.area,
    geometry,
  }));
}
