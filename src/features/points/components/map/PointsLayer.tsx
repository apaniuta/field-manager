import { CircleMarker } from "react-leaflet";
import { useSelectedField } from "@/features/fields";
import { usePointsStore } from "@/features/points/stores/points.store";
import { PointMarker } from "@/features/points/components/map/PointMarker";

export function PointsLayer() {
  const points = usePointsStore((state) => state.points);
  const draft = usePointsStore((state) => state.draft);
  const removePoint = usePointsStore((state) => state.removePoint);
  const selectedField = useSelectedField();

  // A draft from a previously selected field is simply not shown.
  const isDraftVisible = draft !== null && draft.fieldId === selectedField?.id;

  return (
    <>
      {points.map((point) => (
        <PointMarker key={point.id} point={point} onDelete={removePoint} />
      ))}
      {isDraftVisible && (
        <CircleMarker
          center={draft.position}
          radius={8}
          pathOptions={{
            color: "#111827",
            dashArray: "4 4",
            fillColor: "#ffffff",
            fillOpacity: 0.9,
          }}
        />
      )}
    </>
  );
}
