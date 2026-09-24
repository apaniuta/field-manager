import { useEffect } from "react";
import L from "leaflet";
import { useMap } from "react-leaflet";
import { useFieldsStore } from "@/features/fields/stores/fields.store";
import { useSelectedField } from "@/features/fields/hooks/useSelectedField";
import { polygonToLatLngRings } from "@/shared/lib/geo/geometry";

/**
 * The sidebar list lives outside `MapContainer`, so it has no access to the
 * Leaflet map instance. It only writes the selection to the store; this
 * controller, rendered inside the map, reacts to the store and drives
 * `fitBounds` itself.
 */
export function FieldFitController() {
  const map = useMap();
  const fields = useFieldsStore((state) => state.fields);
  const selectedField = useSelectedField();

  useEffect(() => {
    const polygons = selectedField
      ? [selectedField.geometry]
      : fields.map((field) => field.geometry);

    if (polygons.length === 0) return;

    // Leaflet computes the bounding box from all ring points itself.
    const points = polygons.flatMap((polygon) =>
      polygonToLatLngRings(polygon).flat(),
    );
    map.fitBounds(L.latLngBounds(points), { padding: [40, 40] });
  }, [map, fields, selectedField]);

  return null;
}
