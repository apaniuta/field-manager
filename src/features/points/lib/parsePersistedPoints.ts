import type { LatLng } from "@/shared/types/geo";
import {
  isPointType,
  type MonitoringPoint,
} from "@/features/points/types/point";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isLatLng(value: unknown): value is LatLng {
  return (
    isRecord(value) &&
    typeof value.lat === "number" &&
    typeof value.lng === "number"
  );
}

function isMonitoringPoint(value: unknown): value is MonitoringPoint {
  return (
    isRecord(value) &&
    typeof value.id === "string" &&
    typeof value.fieldId === "string" &&
    isPointType(value.type) &&
    typeof value.description === "string" &&
    isLatLng(value.position) &&
    typeof value.createdAt === "string"
  );
}

/**
 * `localStorage` is outside our control (older format, manual edits), so the
 * restored state is `unknown`. Invalid points are dropped instead of crashing
 * the map and the list on render.
 */
export function parsePersistedPoints(state: unknown): MonitoringPoint[] {
  if (!isRecord(state) || !Array.isArray(state.points)) return [];

  return state.points.filter(isMonitoringPoint);
}
