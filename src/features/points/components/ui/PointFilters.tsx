import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import {
  DEFAULT_POINT_FILTERS,
  hasActiveFilters,
  type PointFilters as PointFiltersValue,
} from "@/features/points/lib/filterPoints";
import { POINT_TYPE_META } from "@/features/points/lib/pointTypeMeta";
import { POINT_TYPES, isPointType } from "@/features/points/types/point";

interface PointFiltersProps {
  filters: PointFiltersValue;
  onChange: (filters: PointFiltersValue) => void;
}

export function PointFilters({ filters, onChange }: PointFiltersProps) {
  return (
    <div className="flex flex-col gap-2">
      <Input
        type="search"
        aria-label="Пошук за описом"
        placeholder="Пошук за описом"
        value={filters.query}
        onChange={(event) =>
          onChange({ ...filters, query: event.target.value })
        }
      />
      <Select
        value={filters.type}
        onValueChange={(value) => {
          if (value === "all" || isPointType(value)) {
            onChange({ ...filters, type: value });
          }
        }}
      >
        <SelectTrigger aria-label="Тип точки" className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Усі типи</SelectItem>
          {POINT_TYPES.map((pointType) => (
            <SelectItem key={pointType} value={pointType}>
              {POINT_TYPE_META[pointType].label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        value={filters.sort}
        onValueChange={(value) => {
          if (value === "newest" || value === "oldest") {
            onChange({ ...filters, sort: value });
          }
        }}
      >
        <SelectTrigger aria-label="Сортування" className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="newest">Спочатку нові</SelectItem>
          <SelectItem value="oldest">Спочатку старі</SelectItem>
        </SelectContent>
      </Select>
      {hasActiveFilters(filters) && (
        <Button
          variant="ghost"
          size="sm"
          className="self-start"
          onClick={() => onChange(DEFAULT_POINT_FILTERS)}
        >
          Скинути
        </Button>
      )}
    </div>
  );
}
