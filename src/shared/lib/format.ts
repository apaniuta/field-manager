const AREA_FORMATTER = new Intl.NumberFormat("uk-UA", {
  maximumFractionDigits: 1,
});

export function formatArea(areaHa: number): string {
  return `${AREA_FORMATTER.format(areaHa)} га`;
}
