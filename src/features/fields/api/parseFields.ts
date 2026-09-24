import type { FeatureCollection, Polygon } from "geojson";
import { lngLatToLatLng } from "@/shared/lib/geo/geometry";
import { isValidLatLng } from "@/shared/lib/geo/coordinates";
import type { Field, FieldProperties } from "@/features/fields/types/field";

/** Maps the mock/server GeoJSON response to the domain model, skipping invalid features. */
export function parseFields(
  collection: FeatureCollection<Polygon, FieldProperties>,
): Field[] {
  const fields: Field[] = [];

  for (const feature of collection.features) {
    const reason = getInvalidReason(feature.properties, feature.geometry);
    if (reason) {
      console.warn(
        `parseFields: skipping feature "${feature.properties.id}" — ${reason}`,
      );
      continue;
    }

    fields.push({
      id: feature.properties.id,
      name: feature.properties.name,
      crop: feature.properties.crop,
      areaHa: feature.properties.area,
      geometry: feature.geometry,
    });
  }

  return fields;
}

function getInvalidReason(
  properties: FieldProperties,
  geometry: Polygon,
): string | null {
  if (!properties.id.trim()) return "empty id";
  if (!properties.name.trim()) return "empty name";
  if (!properties.crop.trim()) return "empty crop";
  if (!Number.isFinite(properties.area) || properties.area <= 0) {
    return `invalid area (${properties.area})`;
  }
  if (geometry.type !== "Polygon") return `unsupported geometry type`;

  for (const ring of geometry.coordinates) {
    if (ring.length < 4) return "ring has fewer than 4 positions";

    const [firstLng, firstLat] = ring[0];
    const [lastLng, lastLat] = ring[ring.length - 1];
    if (firstLng !== lastLng || firstLat !== lastLat) {
      return "ring is not closed";
    }

    for (const position of ring) {
      if (!isValidLatLng(lngLatToLatLng(position))) {
        return `coordinates out of WGS84 bounds (${position.join(", ")})`;
      }
    }
  }

  return null;
}
