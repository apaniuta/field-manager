import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  MonitoringPoint,
  PointDraft,
  PointType,
} from "@/features/points/types/point";

interface NewPointInput extends PointDraft {
  type: PointType;
  description: string;
}

interface PointsState {
  points: MonitoringPoint[];
  draft: PointDraft | null;
  setDraft: (draft: PointDraft | null) => void;
  addPoint: (input: NewPointInput) => void;
  removePoint: (id: string) => void;
}

export const usePointsStore = create<PointsState>()(
  persist(
    (set) => ({
      points: [],
      draft: null,
      setDraft: (draft) => set({ draft }),
      addPoint: (input) =>
        set((state) => ({
          points: [
            ...state.points,
            {
              ...input,
              id: crypto.randomUUID(),
              description: input.description.trim(),
              createdAt: new Date().toISOString(),
            },
          ],
          draft: null,
        })),
      removePoint: (id) =>
        set((state) => ({
          points: state.points.filter((point) => point.id !== id),
        })),
    }),
    {
      name: "field-manager/points",
      // Only saved points survive a reload; the draft is transient UI state.
      partialize: (state) => ({ points: state.points }),
    },
  ),
);
