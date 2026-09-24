import { Trash2 } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";
import { formatDateTime } from "@/shared/lib/format";
import { selectableCardClassName } from "@/shared/lib/selection";
import { POINT_TYPE_META } from "@/features/points/lib/pointTypeMeta";
import type { MonitoringPoint } from "@/features/points/types/point";

interface PointListItemProps {
  point: MonitoringPoint;
  fieldName: string;
  isFocused: boolean;
  onFocus: (point: MonitoringPoint) => void;
  onDelete: (id: string) => void;
}

export function PointListItem({
  point,
  fieldName,
  isFocused,
  onFocus,
  onDelete,
}: PointListItemProps) {
  const meta = POINT_TYPE_META[point.type];

  return (
    // Same highlight as a selected field card. The delete button is a sibling
    // of the card button, because a button inside a button is invalid HTML.
    <li
      className={cn(
        "flex items-start gap-1 rounded-lg border transition-colors",
        selectableCardClassName(isFocused),
      )}
    >
      <button
        type="button"
        aria-pressed={isFocused}
        onClick={() => onFocus(point)}
        className="flex min-w-0 flex-1 items-start gap-3 rounded-lg px-3 py-2 text-left"
      >
        <span
          aria-hidden
          className="flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white"
          style={{ backgroundColor: meta.color }}
        >
          {meta.letter}
        </span>
        <span className="min-w-0 flex-1 text-sm">
          <span className="block font-medium">{meta.label}</span>
          <span className="block break-words">
            {point.description || (
              <span className="text-muted-foreground">Без опису</span>
            )}
          </span>
          <span className="block text-muted-foreground">
            {fieldName} · {formatDateTime(point.createdAt)}
          </span>
        </span>
      </button>
      <Button
        variant="ghost"
        size="icon-sm"
        className="mt-2 mr-2"
        aria-label="Видалити точку"
        onClick={() => onDelete(point.id)}
      >
        <Trash2 />
      </Button>
    </li>
  );
}
