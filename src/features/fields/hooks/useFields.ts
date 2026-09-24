import { useFieldsStore } from "@/features/fields/stores/fields.store";
import type { Field } from "@/features/fields/types/field";

export function useFields(): Field[] {
  return useFieldsStore((state) => state.fields);
}
