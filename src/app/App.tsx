import { MapView } from "@/features/map";
import { FieldsLayer, FieldFitController } from "@/features/fields";
import {
  AddPointController,
  PointFocusController,
  PointsLayer,
} from "@/features/points";
import { ErrorBoundary } from "@/shared/components/ErrorBoundary";
import { AppLayout } from "@/app/AppLayout";
import { Sidebar } from "@/app/Sidebar";

// Separate boundaries: if the map fails, the sidebar keeps working, and vice versa.
export function App() {
  return (
    <AppLayout
      sidebar={
        <ErrorBoundary title="Не вдалося відобразити панель">
          <Sidebar />
        </ErrorBoundary>
      }
    >
      <ErrorBoundary title="Не вдалося відобразити карту">
        <MapView>
          <FieldsLayer />
          <FieldFitController />
          {/* After FieldFitController, so flyTo to a point overrides the field's fitBounds. */}
          <PointFocusController />
          <PointsLayer />
          <AddPointController />
        </MapView>
      </ErrorBoundary>
    </AppLayout>
  );
}
