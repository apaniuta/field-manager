import { useSelectedField } from "@/features/fields";
import { usePointsStore } from "@/features/points/stores/points.store";
import { PointForm } from "@/features/points/components/ui/PointForm";

export function Points() {
  const draft = usePointsStore((state) => state.draft);
  const setDraft = usePointsStore((state) => state.setDraft);
  const addPoint = usePointsStore((state) => state.addPoint);
  const selectedField = useSelectedField();

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold">Точки</h2>
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
    </section>
  );
}
