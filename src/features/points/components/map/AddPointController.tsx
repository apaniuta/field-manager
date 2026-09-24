import { useRef } from "react";
import L from "leaflet";
import { useMapEvents } from "react-leaflet";
import { useSelectedField, useSelectField } from "@/features/fields";
import { isPointInPolygon } from "@/shared/lib/geo/geometry";
import { usePointsStore } from "@/features/points/stores/points.store";

/**
 * Clicks on a non-selected field are stopped in `FieldPolygon` (they only
 * select that field), so every click that reaches the map here is either
 * inside the selected field (adds a draft point) or outside all fields
 * (clears the field selection).
 */
export function AddPointController() {
  const selectedField = useSelectedField();
  const selectField = useSelectField();
  const setDraft = usePointsStore((state) => state.setDraft);
  const popupOpenOnPressRef = useRef(false);

  const map = useMapEvents({
    // Leaflet closes an open popup before `click` fires, so remember on press
    // whether this click is only meant to dismiss a popup.
    mousedown() {
      popupOpenOnPressRef.current = hasOpenPopup(map);
    },
    click(event) {
      if (popupOpenOnPressRef.current) return;

      const position = { lat: event.latlng.lat, lng: event.latlng.lng };

      if (!selectedField) {
        showHint(event.latlng, "Спочатку виберіть поле");
        return;
      }

      if (!isPointInPolygon(position, selectedField.geometry)) {
        selectField(null);
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

function hasOpenPopup(map: L.Map): boolean {
  let isOpen = false;
  map.eachLayer((layer) => {
    if (layer instanceof L.Popup) isOpen = true;
  });
  return isOpen;
}
