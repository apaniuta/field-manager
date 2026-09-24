import { MapView } from "@/features/map";
import { FieldsLayer, FieldFitController } from "@/features/fields";
import {
  AddPointController,
  PointFocusController,
  PointsLayer,
} from "@/features/points";
import { AppLayout } from "@/app/AppLayout";
import { Sidebar } from "@/app/Sidebar";

export function App() {
  return (
    <AppLayout sidebar={<Sidebar />}>
      <MapView>
        <FieldsLayer />
        <FieldFitController />
        {/* After FieldFitController, so flyTo to a point overrides the field's fitBounds. */}
        <PointFocusController />
        <PointsLayer />
        <AddPointController />
      </MapView>
    </AppLayout>
  );
}
