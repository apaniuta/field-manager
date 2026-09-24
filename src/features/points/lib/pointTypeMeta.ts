import type { PointType } from "@/features/points/types/point";

interface PointTypeMeta {
  label: string;
  /** Single letter shown inside the marker circle. */
  letter: string;
  /** Hex color, shared by list badges and map marker icons. */
  color: string;
}

export const POINT_TYPE_META: Record<PointType, PointTypeMeta> = {
  soil_sample: { label: "Проба ґрунту", letter: "Г", color: "#92400e" },
  pests: { label: "Шкідники", letter: "Ш", color: "#dc2626" },
  plant_disease: { label: "Хвороби рослин", letter: "Х", color: "#7c3aed" },
  other: { label: "Інше", letter: "І", color: "#475569" },
};
