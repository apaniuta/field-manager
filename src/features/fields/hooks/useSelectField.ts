import { useFieldsStore } from "@/features/fields/stores/fields.store";

export function useSelectField(): (id: string | null) => void {
  return useFieldsStore((state) => state.selectField);
}
