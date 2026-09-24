import type { MonitoringPoint, PointType } from "@/features/points/types/point";

export interface PointFilters {
  type: PointType | "all";
  query: string;
  sort: "newest" | "oldest";
}

export const DEFAULT_POINT_FILTERS: PointFilters = {
  type: "all",
  query: "",
  sort: "newest",
};

/** Sort only reorders, so it never hides points and does not count as a filter. */
export function hasActiveFilters(filters: PointFilters): boolean {
  return filters.type !== "all" || filters.query.trim() !== "";
}

/**
 * Pure function: limits points to a field (`null` = all fields), filters by type,
 * searches the description, sorts by creation date.
 */
export function filterPoints(
  points: MonitoringPoint[],
  filters: PointFilters,
  fieldId: string | null,
): MonitoringPoint[] {
  const query = filters.query.trim().toLowerCase();
  const direction = filters.sort === "newest" ? -1 : 1;

  return (
    points
      .filter((point) => fieldId === null || point.fieldId === fieldId)
      .filter((point) => filters.type === "all" || point.type === filters.type)
      .filter(
        (point) => !query || point.description.toLowerCase().includes(query),
      )
      // `filter` returns a new array, so `sort` never mutates the input.
      // ISO 8601 UTC strings of the same format sort correctly as plain strings.
      .sort((a, b) => direction * a.createdAt.localeCompare(b.createdAt))
  );
}
