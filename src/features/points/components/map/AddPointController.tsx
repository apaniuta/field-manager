import L from "leaflet";
import { useMapEvents } from "react-leaflet";
import { useSelectedField } from "@/features/fields";
import { isPointInPolygon } from "@/shared/lib/geo/geometry";
import { usePointsStore } from "@/features/points/stores/points.store";

/**
 * Clicks on a non-selected field are stopped in `FieldPolygon` (they only
 * select that field), so every click that reaches the map here is either
 * inside the selected field or outside all fields.
 */
export function AddPointController() {
  const selectedField = useSelectedField();
  const setDraft = usePointsStore((state) => state.setDraft);

  const map = useMapEvents({
    click(event) {
      const position = { lat: event.latlng.lat, lng: event.latlng.lng };

      if (!selectedField) {
        showHint(event.latlng, "Спочатку виберіть поле");
        return;
      }

      if (!isPointInPolygon(position, selectedField.geometry)) {
        showHint(
          event.latlng,
          "Точку можна додати лише в межах вибраного поля",
        );
        return;
      }

      setDraft({ fieldId: selectedField.id, position });
    },
  });

  // Hint texts are our own constants, never user input, so setContent is safe.
  function showHint(latlng: L.LatLng, text: string) {
    L.popup().setLatLng(latlng).setContent(text).openOn(map);
  }

  return null;
}
