import { memo, useMemo } from "react";
import L, { type LeafletMouseEvent, type PathOptions } from "leaflet";
import { Polygon, Tooltip } from "react-leaflet";
import { polygonToLatLngRings } from "@/shared/lib/geo/geometry";
import type { Field } from "@/features/fields/types/field";

const INACTIVE_STYLE: PathOptions = {
  color: "#2563eb",
  weight: 2,
  fillOpacity: 0.2,
  className: "field-polygon-selectable",
};

const ACTIVE_STYLE: PathOptions = {
  color: "#d97706",
  weight: 3,
  fillOpacity: 0.4,
};

interface FieldPolygonProps {
  field: Field;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export const FieldPolygon = memo(function FieldPolygon({
  field,
  isSelected,
  onSelect,
}: FieldPolygonProps) {
  const positions = useMemo(
    () => polygonToLatLngRings(field.geometry),
    [field.geometry],
  );

  function handleClick(event: LeafletMouseEvent) {
    if (isSelected) return;
    L.DomEvent.stopPropagation(event);
    onSelect(field.id);
  }

  return (
    <Polygon
      positions={positions}
      pathOptions={isSelected ? ACTIVE_STYLE : INACTIVE_STYLE}
      eventHandlers={{ click: handleClick }}
    >
      <Tooltip sticky>{field.name}</Tooltip>
    </Polygon>
  );
});
