import { useFieldsStore } from "@/features/fields/stores/fields.store";
import { useSelectedField } from "@/features/fields/hooks/useSelectedField";
import { FieldList } from "@/features/fields/components/ui/FieldList";
import { FieldInfo } from "@/features/fields/components/ui/FieldInfo";

export function Fields() {
  const fields = useFieldsStore((state) => state.fields);
  const selectedFieldId = useFieldsStore((state) => state.selectedFieldId);
  const selectField = useFieldsStore((state) => state.selectField);
  const selectedField = useSelectedField();

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold">Поля</h2>
      <FieldList
        fields={fields}
        selectedFieldId={selectedFieldId}
        onSelect={selectField}
      />
      <FieldInfo field={selectedField} />
    </section>
  );
}
