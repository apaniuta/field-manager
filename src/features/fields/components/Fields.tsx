import { useFieldsStore } from "@/features/fields/stores/fields.store";
import { FieldList } from "@/features/fields/components/ui/FieldList";

export function Fields() {
  const fields = useFieldsStore((state) => state.fields);
  const selectedFieldId = useFieldsStore((state) => state.selectedFieldId);
  const selectField = useFieldsStore((state) => state.selectField);

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold">Поля</h2>
      <FieldList
        fields={fields}
        selectedFieldId={selectedFieldId}
        // Clicking the selected field again clears the selection (toggle button).
        onSelect={(id) => selectField(id === selectedFieldId ? null : id)}
      />
    </section>
  );
}
