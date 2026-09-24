import { cn } from "@/shared/lib/utils";
import { formatArea } from "@/shared/lib/format";
import { selectableCardClassName } from "@/shared/lib/selection";
import type { Field } from "@/features/fields/types/field";

interface FieldListProps {
  fields: Field[];
  selectedFieldId: string | null;
  onSelect: (id: string) => void;
}

export function FieldList({
  fields,
  selectedFieldId,
  onSelect,
}: FieldListProps) {
  return (
    <ul className="flex flex-col gap-2">
      {fields.map((field) => {
        const isSelected = field.id === selectedFieldId;

        return (
          <li key={field.id}>
            <button
              type="button"
              aria-pressed={isSelected}
              onClick={() => onSelect(field.id)}
              className={cn(
                "w-full rounded-lg border px-3 py-2 text-left transition-colors",
                selectableCardClassName(isSelected),
              )}
            >
              <div className="font-medium">{field.name}</div>
              <div className="text-sm text-muted-foreground">
                {field.crop} · {formatArea(field.areaHa)}
              </div>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
