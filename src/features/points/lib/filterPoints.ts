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

/** Pure function: filters by type, searches the description, sorts by creation date. */
export function filterPoints(
  points: MonitoringPoint[],
  filters: PointFilters,
): MonitoringPoint[] {
  const query = filters.query.trim().toLowerCase();
  const direction = filters.sort === "newest" ? -1 : 1;

  return (
    points
      .filter((point) => filters.type === "all" || point.type === filters.type)
      .filter(
        (point) => !query || point.description.toLowerCase().includes(query),
      )
      // `filter` returns a new array, so `sort` never mutates the input.
      // ISO 8601 UTC strings of the same format sort correctly as plain strings.
      .sort((a, b) => direction * a.createdAt.localeCompare(b.createdAt))
  );
}
