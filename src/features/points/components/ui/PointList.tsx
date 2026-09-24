import { PointListItem } from "@/features/points/components/ui/PointListItem";
import type { MonitoringPoint } from "@/features/points/types/point";

interface PointListProps {
  points: MonitoringPoint[];
  fieldNames: Map<string, string>;
  focusedPointId: string | null;
  onFocus: (point: MonitoringPoint) => void;
  onDelete: (id: string) => void;
}

export function PointList({
  points,
  fieldNames,
  focusedPointId,
  onFocus,
  onDelete,
}: PointListProps) {
  return (
    <ul className="flex flex-col gap-2">
      {points.map((point) => (
        <PointListItem
          key={point.id}
          point={point}
          fieldName={fieldNames.get(point.fieldId) ?? "Невідоме поле"}
          isFocused={point.id === focusedPointId}
          onFocus={onFocus}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
