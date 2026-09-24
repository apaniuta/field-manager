import { create } from "zustand";
import { FIELDS_GEOJSON } from "@/features/fields/api/fields.mock";
import { parseFields } from "@/features/fields/api/parseFields";
import type { Field } from "@/features/fields/types/field";

interface FieldsState {
  fields: Field[];
  selectedFieldId: string | null;
  selectField: (id: string | null) => void;
}

export const useFieldsStore = create<FieldsState>()((set) => ({
  fields: parseFields(FIELDS_GEOJSON),
  selectedFieldId: null,
  selectField: (id) => set({ selectedFieldId: id }),
}));
