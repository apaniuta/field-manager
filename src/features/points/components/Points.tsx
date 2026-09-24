import { useMemo, useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { useFields, useSelectedField } from "@/features/fields";
import {
  DEFAULT_POINT_FILTERS,
  filterPoints,
  isDefaultPointFilters,
} from "@/features/points/lib/filterPoints";
import { usePointsStore } from "@/features/points/stores/points.store";
import { PointFilters } from "@/features/points/components/ui/PointFilters";
import { PointForm } from "@/features/points/components/ui/PointForm";
import { PointList } from "@/features/points/components/ui/PointList";

export function Points() {
  const points = usePointsStore((state) => state.points);
  const draft = usePointsStore((state) => state.draft);
  const setDraft = usePointsStore((state) => state.setDraft);
  const addPoint = usePointsStore((state) => state.addPoint);
  const removePoint = usePointsStore((state) => state.removePoint);
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
        <p className="text-sm text-muted-foreground">
          Ще немає точок. Виберіть поле і клацніть усередині нього на карті.
        </p>
      ) : (
        <>
          <PointFilters filters={filters} onChange={setFilters} />
          {visiblePoints.length > 0 ? (
            <PointList
              points={visiblePoints}
              fieldNames={fieldNames}
              onDelete={removePoint}
            />
          ) : isDefaultPointFilters(filters) ? (
            // Default filters can only come up empty when scoped to a field.
            <p className="text-sm text-muted-foreground">
              У цьому полі ще немає точок.
            </p>
          ) : (
            <div className="flex flex-col items-start gap-2 text-sm">
              <p className="text-muted-foreground">Нічого не знайдено</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setFilters(DEFAULT_POINT_FILTERS)}
              >
                Скинути фільтри
              </Button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
