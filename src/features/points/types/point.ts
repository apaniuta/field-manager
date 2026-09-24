import type { LatLng } from "@/shared/types/geo";

export const POINT_TYPES = [
  "soil_sample",
  "pests",
  "plant_disease",
  "other",
] as const;

export type PointType = (typeof POINT_TYPES)[number];

export interface MonitoringPoint {
  id: string;
  fieldId: string;
  type: PointType;
  description: string;
  position: LatLng;
  /** ISO 8601 timestamp, set automatically on creation. */
  createdAt: string;
}

/** A clicked location inside the selected field, waiting for the form to be submitted. */
export interface PointDraft {
  fieldId: string;
  position: LatLng;
}

export function isPointType(value: unknown): value is PointType {
  return POINT_TYPES.some((type) => type === value);
}
