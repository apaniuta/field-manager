import { MapView } from "@/features/map";
import { FieldsLayer, FieldFitController } from "@/features/fields";
import { AddPointController, PointsLayer } from "@/features/points";
import { AppLayout } from "@/app/AppLayout";
import { Sidebar } from "@/app/Sidebar";

export function App() {
  return (
    <AppLayout sidebar={<Sidebar />}>
      <MapView>
        <FieldsLayer />
        <FieldFitController />
        <PointsLayer />
        <AddPointController />
      </MapView>
    </AppLayout>
  );
}
