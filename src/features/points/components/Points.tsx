import { useMemo, useState } from "react";
import { useFields, useSelectedField, useSelectField } from "@/features/fields";
import {
  DEFAULT_POINT_FILTERS,
  filterPoints,
  hasActiveFilters,
} from "@/features/points/lib/filterPoints";
import { usePointsStore } from "@/features/points/stores/points.store";
import { PointFilters } from "@/features/points/components/ui/PointFilters";
import { PointForm } from "@/features/points/components/ui/PointForm";
import { PointList } from "@/features/points/components/ui/PointList";
import type { MonitoringPoint } from "@/features/points/types/point";

export function Points() {
  const points = usePointsStore((state) => state.points);
  const draft = usePointsStore((state) => state.draft);
  const setDraft = usePointsStore((state) => state.setDraft);
  const addPoint = usePointsStore((state) => state.addPoint);
  const removePoint = usePointsStore((state) => state.removePoint);
  const focusedPointId = usePointsStore((state) => state.focusedPointId);
  const focusPoint = usePointsStore((state) => state.focusPoint);
  const selectField = useSelectField();
  const fields = useFields();
  const selectedField = useSelectedField();
  const [filters, setFilters] = useState(DEFAULT_POINT_FILTERS);

  // The selected field scopes the list; with no selection it shows all fields.
  const selectedFieldId = selectedField?.id ?? null;
  const visiblePoints = useMemo(
    () => filterPoints(points, filters, selectedFieldId),
    [points, filters, selectedFieldId],
  );
  const fieldNames = new Map(fields.map((field) => [field.id, field.name]));

  // Works like a field card: a second click on the focused point clears it.
  function handleFocus(point: MonitoringPoint) {
    if (point.id === focusedPointId) {
      focusPoint(null);
      return;
    }
    selectField(point.fieldId);
    focusPoint(point.id);
  }

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-baseline justify-between">
        <h2 className="text-lg font-semibold">Точки</h2>
        {points.length > 0 && (
          <span className="text-sm text-muted-foreground">
            {visiblePoints.length} з {points.length}
          </span>
        )}
      </div>

      {selectedField && draft?.fieldId === selectedField.id ? (
        <PointForm
          fieldName={selectedField.name}
          position={draft.position}
          onSubmit={(values) => addPoint({ ...draft, ...values })}
          onCancel={() => setDraft(null)}
        />
      ) : (
        <p className="text-sm text-muted-foreground">
          {selectedField
            ? "Клацніть усередині поля на карті, щоб додати точку."
            : "Виберіть поле, щоб додавати точки."}
        </p>
      )}

      {points.length === 0 ? (
        <p className="text-sm text-muted-foreground">Ще немає точок.</p>
      ) : (
        <>
          <PointFilters filters={filters} onChange={setFilters} />
          {visiblePoints.length > 0 ? (
            <PointList
              points={visiblePoints}
              fieldNames={fieldNames}
              focusedPointId={focusedPointId}
              onFocus={handleFocus}
              onDelete={removePoint}
            />
          ) : (
            // Without active filters the list can only be empty when scoped to a field.
            // "Reset" lives in PointFilters, so the empty state only explains.
            <p className="text-sm text-muted-foreground">
              {hasActiveFilters(filters)
                ? "Нічого не знайдено"
                : "У цьому полі ще немає точок."}
            </p>
          )}
        </>
      )}
    </section>
  );
}
