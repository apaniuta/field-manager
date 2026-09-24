import L from "leaflet";
import { POINT_TYPE_META } from "@/features/points/lib/pointTypeMeta";
import type { PointType } from "@/features/points/types/point";

const MARKER_SIZE = 28;

/**
 * Leaflet renders markers outside React, so a divIcon takes an HTML string.
 * Only our own constants (color, letter) go into it, never user input.
 */
function createPointIcon(type: PointType): L.DivIcon {
  const { color, letter } = POINT_TYPE_META[type];

  return L.divIcon({
    className: "",
    html: `<div class="flex size-7 items-center justify-center rounded-full border-2 border-white text-xs font-semibold text-white shadow-md" style="background-color: ${color}">${letter}</div>`,
    iconSize: [MARKER_SIZE, MARKER_SIZE],
    iconAnchor: [MARKER_SIZE / 2, MARKER_SIZE / 2],
    popupAnchor: [0, -MARKER_SIZE / 2],
  });
}

/** Created once per type and shared by all markers. */
export const POINT_ICONS: Record<PointType, L.DivIcon> = {
  soil_sample: createPointIcon("soil_sample"),
  pests: createPointIcon("pests"),
  plant_disease: createPointIcon("plant_disease"),
  other: createPointIcon("other"),
};
