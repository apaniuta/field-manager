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
  /** Point selected in the list; the map flies to it. */
  focusedPointId: string | null;
  setDraft: (draft: PointDraft | null) => void;
  addPoint: (input: NewPointInput) => void;
  removePoint: (id: string) => void;
  focusPoint: (id: string | null) => void;
}

// Not `crypto.randomUUID`: it exists only in secure contexts (HTTPS, localhost),
// so it is undefined when a tablet opens the dev server by LAN IP over HTTP.
// The `uuid` package would work (it uses `crypto.getRandomValues`, available
// everywhere), but ids only need to be unique within this browser's storage,
// so a dependency is not worth it.
function createPointId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
}

export const usePointsStore = create<PointsState>()(
  persist(
    (set) => ({
      points: [],
      draft: null,
      focusedPointId: null,
      setDraft: (draft) => set({ draft }),
      addPoint: (input) =>
        set((state) => ({
          points: [
            ...state.points,
            {
              ...input,
              id: createPointId(),
              description: input.description.trim(),
              createdAt: new Date().toISOString(),
            },
          ],
          draft: null,
        })),
      removePoint: (id) =>
        set((state) => ({
          points: state.points.filter((point) => point.id !== id),
          focusedPointId:
            state.focusedPointId === id ? null : state.focusedPointId,
        })),
      focusPoint: (id) => set({ focusedPointId: id }),
    }),
    {
      name: "field-manager/points",
      // Only saved points survive a reload; draft and focus are transient UI state.
      partialize: (state) => ({ points: state.points }),
    },
  ),
);
