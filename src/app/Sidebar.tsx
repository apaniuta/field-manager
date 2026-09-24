import { Fields } from "@/features/fields";
import { Points } from "@/features/points";

export function Sidebar() {
  return (
    <div className="flex flex-col divide-y">
      <header className="px-4 py-3">
        <h1 className="text-xl font-semibold">Field Manager</h1>
        <p className="text-sm text-muted-foreground">
          Поля та моніторингові точки
        </p>
      </header>
      <div className="p-4">
        <Fields />
      </div>
      <div className="p-4">
        <Points />
      </div>
    </div>
  );
}
