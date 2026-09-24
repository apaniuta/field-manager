import { CircleMarker } from "react-leaflet";
import { useSelectedField } from "@/features/fields";
import { usePointsStore } from "@/features/points/stores/points.store";

export function PointsLayer() {
  const draft = usePointsStore((state) => state.draft);
  const selectedField = useSelectedField();

  // A draft from a previously selected field is simply not shown.
  const isDraftVisible = draft !== null && draft.fieldId === selectedField?.id;

  return (
    <>
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
