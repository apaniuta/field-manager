import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { useSelectedField } from "@/features/fields";
import { usePointsStore } from "@/features/points/stores/points.store";

const FOCUS_MIN_ZOOM = 16;

/**
 * Same pattern as `FieldFitController`: the sidebar list only writes the
 * focused point to the store, and this controller inside the map flies to it.
 *
 * Rendered after `FieldFitController`: sibling effects run in order, so when a
 * point from another field is focused, `flyTo` overrides that field's `fitBounds`.
 */
export function PointFocusController() {
  const map = useMap();
  const points = usePointsStore((state) => state.points);
  const focusedPointId = usePointsStore((state) => state.focusedPointId);
  const focusPoint = usePointsStore((state) => state.focusPoint);
  const selectedFieldId = useSelectedField()?.id ?? null;

  const focusedPoint = points.find((point) => point.id === focusedPointId);

  useEffect(() => {
    if (!focusedPoint) return;

    // The fields feature knows nothing about points, so when the field is
    // changed or cleared elsewhere, the focus on a point outside it is dropped here.
    if (focusedPoint.fieldId !== selectedFieldId) {
      focusPoint(null);
      return;
    }

    map.flyTo(focusedPoint.position, Math.max(map.getZoom(), FOCUS_MIN_ZOOM));
  }, [map, focusedPoint, selectedFieldId, focusPoint]);

  return null;
}
