import { useId, useState, type FormEvent } from "react";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Label } from "@/shared/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Textarea } from "@/shared/components/ui/textarea";
import { formatLatLng, tryToMgrs } from "@/shared/lib/geo/coordinates";
import type { LatLng } from "@/shared/types/geo";
import { POINT_TYPE_META } from "@/features/points/lib/pointTypeMeta";
import {
  POINT_TYPES,
  isPointType,
  type PointType,
} from "@/features/points/types/point";

const DESCRIPTION_MAX_LENGTH = 500;

interface PointFormProps {
  fieldName: string;
  position: LatLng;
  onSubmit: (values: { type: PointType; description: string }) => void;
  onCancel: () => void;
}

export function PointForm({
  fieldName,
  position,
  onSubmit,
  onCancel,
}: PointFormProps) {
  const [type, setType] = useState<PointType | null>(null);
  const [description, setDescription] = useState("");
  const typeId = useId();
  const descriptionId = useId();

  const mgrs = tryToMgrs(position);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!type) return;
    onSubmit({ type, description });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Нова точка</CardTitle>
        <CardDescription>{fieldName}</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <dl className="grid grid-cols-[auto_1fr] gap-x-2 gap-y-1 text-sm">
            <dt className="text-muted-foreground">WGS84</dt>
            <dd className="font-mono">{formatLatLng(position)}</dd>
            <dt className="text-muted-foreground">MGRS</dt>
            <dd className="font-mono">
              {mgrs ?? (
                <span className="text-destructive">Не вдалося обчислити</span>
              )}
            </dd>
          </dl>

          <div className="flex flex-col gap-2">
            <Label htmlFor={typeId}>Тип</Label>
            <Select
              value={type ?? ""}
              onValueChange={(value) => {
                if (isPointType(value)) setType(value);
              }}
            >
              <SelectTrigger id={typeId} className="w-full">
                <SelectValue placeholder="Оберіть тип" />
              </SelectTrigger>
              <SelectContent>
                {POINT_TYPES.map((pointType) => (
                  <SelectItem key={pointType} value={pointType}>
                    {POINT_TYPE_META[pointType].label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor={descriptionId}>Опис (необов'язково)</Label>
            <Textarea
              id={descriptionId}
              value={description}
              maxLength={DESCRIPTION_MAX_LENGTH}
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <Button type="submit" disabled={!type}>
              Зберегти
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Скасувати
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
