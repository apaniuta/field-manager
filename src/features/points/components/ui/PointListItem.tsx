import { Trash2 } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { formatDateTime } from "@/shared/lib/format";
import { POINT_TYPE_META } from "@/features/points/lib/pointTypeMeta";
import type { MonitoringPoint } from "@/features/points/types/point";

interface PointListItemProps {
  point: MonitoringPoint;
  fieldName: string;
  onDelete: (id: string) => void;
}

export function PointListItem({
  point,
  fieldName,
  onDelete,
}: PointListItemProps) {
  const meta = POINT_TYPE_META[point.type];

  return (
    <li className="flex items-start gap-3 rounded-lg border px-3 py-2">
      <span
        aria-hidden
        className="flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white"
        style={{ backgroundColor: meta.color }}
      >
        {meta.letter}
      </span>
      <div className="min-w-0 flex-1 text-sm">
        <div className="font-medium">{meta.label}</div>
        <div className="break-words">
          {point.description || (
            <span className="text-muted-foreground">Без опису</span>
          )}
        </div>
        <div className="text-muted-foreground">
          {fieldName} · {formatDateTime(point.createdAt)}
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon-sm"
        aria-label="Видалити точку"
        onClick={() => onDelete(point.id)}
      >
        <Trash2 />
      </Button>
    </li>
  );
}
