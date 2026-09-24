const AREA_FORMATTER = new Intl.NumberFormat("uk-UA", {
  maximumFractionDigits: 1,
});

export function formatArea(areaHa: number): string {
  return `${AREA_FORMATTER.format(areaHa)} га`;
}

const DATE_TIME_FORMATTER = new Intl.DateTimeFormat("uk-UA", {
  dateStyle: "medium",
  timeStyle: "short",
});

export function formatDateTime(isoDate: string): string {
  return DATE_TIME_FORMATTER.format(new Date(isoDate));
}
