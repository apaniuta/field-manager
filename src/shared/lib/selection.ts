/**
 * Card look for selectable sidebar items (fields, points), so a selected field
 * and a focused point are highlighted the same way. Amber/blue match the
 * selected/unselected field polygons on the map.
 */
export function selectableCardClassName(isSelected: boolean): string {
  return isSelected
    ? "border-amber-600 bg-amber-50 text-amber-900"
    : "border-blue-600/30 hover:bg-blue-50";
}
