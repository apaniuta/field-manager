import { Bug, FlaskConical, Leaf, MapPin, type LucideIcon } from "lucide-react";
import type { PointType } from "@/features/points/types/point";

interface PointTypeMeta {
  label: string;
  /** Hex color, shared by list badges and map marker icons. */
  color: string;
  Icon: LucideIcon;
}

export const POINT_TYPE_META: Record<PointType, PointTypeMeta> = {
  soil_sample: { label: "Проба ґрунту", color: "#92400e", Icon: FlaskConical },
  pests: { label: "Шкідники", color: "#dc2626", Icon: Bug },
  plant_disease: { label: "Хвороби рослин", color: "#7c3aed", Icon: Leaf },
  other: { label: "Інше", color: "#475569", Icon: MapPin },
};
