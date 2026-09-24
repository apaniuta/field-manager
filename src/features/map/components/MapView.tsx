import { useState, type ReactNode } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/shared/components/ui/alert";
import {
  MAP_CENTER,
  MAP_DEFAULT_ZOOM,
  MAP_MAX_ZOOM,
  TILE_ATTRIBUTION,
  TILE_URL,
} from "@/features/map/lib/mapConfig";

export function MapView({ children }: { children?: ReactNode }) {
  const [tileError, setTileError] = useState(false);

  return (
    <div className="relative h-full w-full">
      {tileError && (
        <Alert
          variant="destructive"
          className="absolute top-4 left-1/2 z-[1000] w-auto -translate-x-1/2"
        >
          <AlertTitle>Не вдається завантажити карту</AlertTitle>
          <AlertDescription>Перевірте мережу</AlertDescription>
        </Alert>
      )}
      <MapContainer
        className="h-full w-full"
        center={MAP_CENTER}
        zoom={MAP_DEFAULT_ZOOM}
      >
        <TileLayer
          url={TILE_URL}
          attribution={TILE_ATTRIBUTION}
          maxZoom={MAP_MAX_ZOOM}
          eventHandlers={{
            tileerror: () => setTileError(true),
            tileload: () => setTileError(false),
          }}
        />
        {children}
      </MapContainer>
    </div>
  );
}
