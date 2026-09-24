import { useFieldsStore } from "@/features/fields/stores/fields.store";
import type { Field } from "@/features/fields/types/field";

export function useSelectedField(): Field | null {
  const selectedFieldId = useFieldsStore((state) => state.selectedFieldId);
  const fields = useFieldsStore((state) => state.fields);

  return fields.find((field) => field.id === selectedFieldId) ?? null;
}
