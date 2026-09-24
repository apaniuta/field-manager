import type { FeatureCollection, Polygon } from "geojson";
import type { FieldProperties } from "@/features/fields/types/field";

/**
 * Stands in for a server response. When a backend exists, this file is
 * replaced by a real request; the rest of the feature stays unchanged.
 */
export const FIELDS_GEOJSON: FeatureCollection<Polygon, FieldProperties> = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        id: "field-1",
        name: "Поле №1 - Пшениця",
        area: 45.2,
        crop: "Пшениця",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [30.5234, 50.4501],
            [30.5334, 50.4501],
            [30.5334, 50.4601],
            [30.5234, 50.4601],
            [30.5234, 50.4501],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        id: "field-2",
        name: "Поле №2 - Соняшник",
        area: 174.8,
        crop: "Соняшник",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [30.545, 50.447],
            [30.558, 50.445],
            [30.565, 50.452],
            [30.56, 50.46],
            [30.547, 50.459],
            [30.545, 50.447],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        id: "field-3",
        name: "Поле №3 - Кукурудза",
        area: 161.1,
        crop: "Кукурудза",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [30.52, 50.43],
            [30.538, 50.431],
            [30.54, 50.44],
            [30.525, 50.442],
            [30.518, 50.437],
            [30.52, 50.43],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        id: "field-4",
        name: "Поле №4 - Ріпак",
        area: 139.7,
        crop: "Ріпак",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [30.515, 50.47],
            [30.53, 50.469],
            [30.535, 50.478],
            [30.52, 50.48],
            [30.512, 50.475],
            [30.515, 50.47],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: {
        id: "field-5",
        name: "Поле №5 - Ячмінь",
        area: 170.8,
        crop: "Ячмінь",
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [30.49, 50.448],
            [30.51, 50.449],
            [30.512, 50.458],
            [30.498, 50.46],
            [30.488, 50.454],
            [30.49, 50.448],
          ],
        ],
      },
    },
  ],
};
