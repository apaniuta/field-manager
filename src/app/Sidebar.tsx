import { Fields } from "@/features/fields";
import { Points } from "@/features/points";

export function Sidebar() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-semibold">Field Manager</h1>
      <Fields />
      <Points />
    </div>
  );
}
