import { forward } from "mgrs";
import type { LatLng } from "@/shared/types/geo";

/** WGS84 bounds check: lat within [-90, 90], lng within [-180, 180], both finite. */
export function isValidLatLng(point: LatLng): boolean {
  return (
    Number.isFinite(point.lat) &&
    Number.isFinite(point.lng) &&
    point.lat >= -90 &&
    point.lat <= 90 &&
    point.lng >= -180 &&
    point.lng <= 180
  );
}

/** Fixed-precision "lat, lng" string, convenient for display and copy-paste. */
export function formatLatLng(point: LatLng, fractionDigits = 6): string {
  return `${point.lat.toFixed(fractionDigits)}, ${point.lng.toFixed(fractionDigits)}`;
}

const MGRS_FORMAT = /^\d{1,2}[C-HJ-NP-X] [A-Z]{2} \d+ \d+$/;

/**
 * Converts to MGRS, spaced as `36U UB 12345 67890`. `mgrs.forward` returns an unspaced
 * string; we validate and re-space it here so consumers get a stable, documented format.
 */
export function toMgrs(point: LatLng, precision = 5): string {
  if (!isValidLatLng(point)) {
    throw new Error(
      `toMgrs: invalid WGS84 coordinates (${point.lat}, ${point.lng})`,
    );
  }

  let raw: string;
  try {
    raw = forward([point.lng, point.lat], precision);
  } catch (error) {
    throw new Error(
      `toMgrs: conversion failed for (${point.lat}, ${point.lng}) — MGRS does not cover the poles`,
      { cause: error },
    );
  }

  // raw is unspaced, e.g. "36UUB1234567890"; split into zone+band, 100km square, easting, northing.
  const zoneBandMatch = /^\d{1,2}[C-HJ-NP-X]/.exec(raw);
  if (!zoneBandMatch) {
    throw new Error(`toMgrs: unexpected mgrs output "${raw}"`);
  }
  const zoneBand = zoneBandMatch[0];
  const rest = raw.slice(zoneBand.length);
  const square = rest.slice(0, 2);
  const digits = rest.slice(2);
  const half = digits.length / 2;
  const easting = digits.slice(0, half);
  const northing = digits.slice(half);

  const spaced = `${zoneBand} ${square} ${easting} ${northing}`;

  if (!MGRS_FORMAT.test(spaced)) {
    throw new Error(
      `toMgrs: formatted result "${spaced}" does not match the expected MGRS format`,
    );
  }

  return spaced;
}

/** Like `toMgrs`, but returns null instead of throwing, for display-only use. */
export function tryToMgrs(point: LatLng): string | null {
  try {
    return toMgrs(point);
  } catch {
    return null;
  }
}
