import { MapView } from "@/features/map";
import { FieldsLayer, FieldFitController } from "@/features/fields";
import { AppLayout } from "@/app/AppLayout";
import { Sidebar } from "@/app/Sidebar";

export function App() {
  return (
    <AppLayout sidebar={<Sidebar />}>
      <MapView>
        <FieldsLayer />
        <FieldFitController />
      </MapView>
    </AppLayout>
  );
}
