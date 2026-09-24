import { useFieldsStore } from "@/features/fields/stores/fields.store";
import { FieldPolygon } from "@/features/fields/components/map/FieldPolygon";

export function FieldsLayer() {
  const fields = useFieldsStore((state) => state.fields);
  const selectedFieldId = useFieldsStore((state) => state.selectedFieldId);
  const selectField = useFieldsStore((state) => state.selectField);

  return (
    <>
      {fields.map((field) => (
        <FieldPolygon
          key={field.id}
          field={field}
          isSelected={field.id === selectedFieldId}
          onSelect={selectField}
        />
      ))}
    </>
  );
}
