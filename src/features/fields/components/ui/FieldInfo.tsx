import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { formatArea } from "@/shared/lib/format";
import type { Field } from "@/features/fields/types/field";

interface FieldInfoProps {
  field: Field | null;
}

export function FieldInfo({ field }: FieldInfoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{field ? field.name : "Інформація про поле"}</CardTitle>
      </CardHeader>
      <CardContent>
        {field ? (
          <dl className="grid grid-cols-[auto_1fr] gap-x-2 gap-y-1 text-sm">
            <dt className="text-muted-foreground">Культура</dt>
            <dd>{field.crop}</dd>
            <dt className="text-muted-foreground">Площа</dt>
            <dd>{formatArea(field.areaHa)}</dd>
          </dl>
        ) : (
          <p className="text-sm text-muted-foreground">
            Оберіть поле на карті або зі списку.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
