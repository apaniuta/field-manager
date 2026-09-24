import { memo } from "react";
import { Marker, Popup } from "react-leaflet";
import { Button } from "@/shared/components/ui/button";
import { formatDateTime } from "@/shared/lib/format";
import { formatLatLng, toMgrs } from "@/shared/lib/geo/coordinates";
import { POINT_ICONS } from "@/features/points/lib/pointIcons";
import { POINT_TYPE_META } from "@/features/points/lib/pointTypeMeta";
import { DeletePointDialog } from "@/features/points/components/ui/DeletePointDialog";
import type { MonitoringPoint } from "@/features/points/types/point";

interface PointMarkerProps {
  point: MonitoringPoint;
  onDelete: (id: string) => void;
}

/**
 * `memo`, like `FieldPolygon`: `PointsLayer` re-renders on every draft change
 * (each click inside the field), while `point` and `onDelete` stay the same.
 */
export const PointMarker = memo(function PointMarker({
  point,
  onDelete,
}: PointMarkerProps) {
  return (
    <Marker position={point.position} icon={POINT_ICONS[point.type]}>
      <Popup>
        {/* divs, not <p>: Leaflet styles add large margins to <p> inside popups. */}
        <div className="flex flex-col gap-2 text-sm">
          <div className="font-semibold">
            {POINT_TYPE_META[point.type].label}
          </div>
          <div>{point.description || "Без опису"}</div>
          <dl className="grid grid-cols-[auto_1fr] gap-x-2 gap-y-1">
            <dt className="text-muted-foreground">Дата</dt>
            <dd>{formatDateTime(point.createdAt)}</dd>
            <dt className="text-muted-foreground">WGS84</dt>
            <dd className="font-mono">{formatLatLng(point.position)}</dd>
            <dt className="text-muted-foreground">MGRS</dt>
            <dd className="font-mono">
              {toMgrs(point.position) ?? "Не вдалося обчислити"}
            </dd>
          </dl>
          {/* The dialog renders in a portal outside the map, so confirming is
              not a map click and cannot create a draft. */}
          <DeletePointDialog onConfirm={() => onDelete(point.id)}>
            <Button variant="destructive" size="sm">
              Видалити
            </Button>
          </DeletePointDialog>
        </div>
      </Popup>
    </Marker>
  );
});
