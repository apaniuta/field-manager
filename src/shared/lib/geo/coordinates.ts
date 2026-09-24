import { forward } from "mgrs";
import { latLngToLngLat } from "@/shared/lib/geo/geometry";
import type { LatLng } from "@/shared/types/geo";

/** "lat, lng" with 6 decimals (~0.1 m), convenient for display and copy-paste. */
export function formatLatLng(point: LatLng): string {
  return `${point.lat.toFixed(6)}, ${point.lng.toFixed(6)}`;
}

/**
 * MGRS with 1 m precision, spaced for readability: "36UUA2466390021" → "36U UA 24663 90021".
 * Returns null where MGRS is undefined (polar regions), so the UI can show a fallback.
 */
export function toMgrs(point: LatLng): string | null {
  try {
    return forward(latLngToLngLat(point), 5).replace(
      /^(\d{1,2}[A-Z])([A-Z]{2})(\d{5})(\d{5})$/,
      "$1 $2 $3 $4",
    );
  } catch {
    return null;
  }
}
