import { useEffect } from "react";
import { MapContainer, TileLayer, CircleMarker, Tooltip, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

type Tier = "sede" | "presencial" | "agendamento";

type City = {
  name: string;
  coords: [number, number];
  tier: Tier;
  label: string;
};

const TIER_COLOR: Record<Tier, string> = {
  sede: "oklch(0.32 0.11 258)",
  presencial: "oklch(0.68 0.14 155)",
  agendamento: "oklch(0.62 0.13 235)",
};

const TIER_LABEL: Record<Tier, string> = {
  sede: "Sede da Caetus Systems",
  presencial: "Atendimento presencial",
  agendamento: "Atendimento presencial mediante agendamento",
};

const CITIES: City[] = [
  { name: "Lagoa Santa", coords: [-19.6273, -43.8919], tier: "sede", label: TIER_LABEL.sede },
  {
    name: "Vespasiano",
    coords: [-19.6919, -43.9227],
    tier: "presencial",
    label: TIER_LABEL.presencial,
  },
  {
    name: "Pedro Leopoldo",
    coords: [-19.6183, -44.0428],
    tier: "presencial",
    label: TIER_LABEL.presencial,
  },
  {
    name: "Matozinhos",
    coords: [-19.5583, -44.0864],
    tier: "presencial",
    label: TIER_LABEL.presencial,
  },
  {
    name: "Confins",
    coords: [-19.6339, -43.9706],
    tier: "presencial",
    label: TIER_LABEL.presencial,
  },
  {
    name: "Capim Branco",
    coords: [-19.5556, -44.1264],
    tier: "presencial",
    label: TIER_LABEL.presencial,
  },
  {
    name: "Jatobá",
    coords: [-19.5522, -43.9033],
    tier: "presencial",
    label: TIER_LABEL.presencial,
  },
  {
    name: "Belo Horizonte",
    coords: [-19.9167, -43.9345],
    tier: "agendamento",
    label: TIER_LABEL.agendamento,
  },
  {
    name: "Santa Luzia",
    coords: [-19.7697, -43.8514],
    tier: "agendamento",
    label: TIER_LABEL.agendamento,
  },
  {
    name: "Jaboticatubas",
    coords: [-19.5108, -43.7447],
    tier: "agendamento",
    label: TIER_LABEL.agendamento,
  },
  {
    name: "Serra do Cipó",
    coords: [-19.3402, -43.6103],
    tier: "agendamento",
    label: TIER_LABEL.agendamento,
  },
  {
    name: "São José de Almeida",
    coords: [-19.4544, -43.8189],
    tier: "agendamento",
    label: TIER_LABEL.agendamento,
  },
];

const CENTER: [number, number] = [-19.62, -43.89];

function FitBounds() {
  const map = useMap();
  useEffect(() => {
    if (!map) return;
    const validCoords = CITIES.map((c) => c.coords).filter(
      (coord) => Array.isArray(coord) && coord.length === 2 && !isNaN(coord[0]) && !isNaN(coord[1]),
    );

    if (validCoords.length === 0) return;

    try {
      const bounds = L.latLngBounds(validCoords.map((coord) => L.latLng(coord[0], coord[1])));
      if (bounds.isValid()) {
        const t = setTimeout(() => {
          try {
            map.invalidateSize();
            const size = map.getSize();
            if (size.x > 0 && size.y > 0) {
              map.flyToBounds(bounds, { padding: [40, 40], duration: 2.2, easeLinearity: 0.25 });
            } else {
              // If size is 0, poll until container gets a valid size
              const interval = setInterval(() => {
                try {
                  map.invalidateSize();
                  const newSize = map.getSize();
                  if (newSize.x > 0 && newSize.y > 0) {
                    map.flyToBounds(bounds, {
                      padding: [40, 40],
                      duration: 2.2,
                      easeLinearity: 0.25,
                    });
                    clearInterval(interval);
                  }
                } catch (e) {
                  console.error("Error in fit bounds polling:", e);
                  clearInterval(interval);
                }
              }, 200);

              // Clear interval after 5 seconds to prevent memory leak
              setTimeout(() => clearInterval(interval), 5000);
            }
          } catch (e) {
            console.error("Error flying to bounds:", e);
          }
        }, 350);
        return () => clearTimeout(t);
      }
    } catch (e) {
      console.error("Error setting up bounds:", e);
    }
  }, [map]);
  return null;
}

export function CoverageMap() {
  const validCenter: [number, number] =
    Array.isArray(CENTER) && CENTER.length === 2 && !isNaN(CENTER[0]) && !isNaN(CENTER[1])
      ? CENTER
      : [-19.62, -43.89];

  return (
    <div className="relative isolate z-0 aspect-[16/10] w-full overflow-hidden rounded-xl border border-border/60 bg-muted/30">
      <MapContainer
        center={validCenter}
        zoom={10}
        minZoom={7}
        maxZoom={16}
        scrollWheelZoom={false}
        zoomControl={true}
        attributionControl={false}
        style={{ height: "100%", width: "100%", background: "hsl(var(--muted))" }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
          subdomains={["a", "b", "c", "d"]}
        />
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png"
          subdomains={["a", "b", "c", "d"]}
        />

        <FitBounds />

        {CITIES.filter(
          (c) =>
            Array.isArray(c.coords) &&
            c.coords.length === 2 &&
            !isNaN(c.coords[0]) &&
            !isNaN(c.coords[1]),
        ).map((c) => {
          const color = TIER_COLOR[c.tier];
          const radius = c.tier === "sede" ? 8 : c.tier === "presencial" ? 6 : 5;
          return (
            <CircleMarker
              key={c.name}
              center={c.coords}
              radius={radius}
              pathOptions={{
                color,
                fillColor: color,
                fillOpacity: c.tier === "agendamento" ? 0.55 : 1,
                weight: 2,
                opacity: 1,
              }}
            >
              <Tooltip direction="top" offset={[0, -6]} opacity={1} className="!rounded-lg">
                <div className="text-xs">
                  <div className="font-semibold text-foreground">{c.name}</div>
                  <div className="text-muted-foreground">📍 {c.label}</div>
                </div>
              </Tooltip>
            </CircleMarker>
          );
        })}

        {/* Radar sobre Lagoa Santa */}
        <Marker
          position={[-19.6273, -43.8919]}
          interactive={false}
          icon={L.divIcon({
            className: "",
            html: `
              <div style="position:relative;width:0;height:0;">
                <span class="radar-ring"></span>
                <span class="radar-ring radar-ring-delayed"></span>
                <span class="radar-glow"></span>
              </div>
            `,
            iconSize: [0, 0],
          })}
        />
      </MapContainer>

      {/* Legenda */}
      <div className="absolute left-3 top-3 z-[500] space-y-1 rounded-lg border border-border/70 bg-background/95 px-3 py-2 text-[11px] shadow-lg backdrop-blur">
        <div className="flex items-center gap-2">
          <span
            className="inline-block h-2.5 w-2.5 rounded-full"
            style={{ background: TIER_COLOR.sede }}
          />
          <span className="text-foreground">Sede</span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="inline-block h-2.5 w-2.5 rounded-full"
            style={{ background: TIER_COLOR.presencial }}
          />
          <span className="text-foreground">Presencial</span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="inline-block h-2.5 w-2.5 rounded-full"
            style={{ background: TIER_COLOR.agendamento, opacity: 0.7 }}
          />
          <span className="text-foreground">Mediante agendamento</span>
        </div>
      </div>

      {/* Card atendimento remoto */}
      <div className="absolute bottom-3 right-3 z-[500] rounded-lg border border-border/70 bg-background/95 px-3 py-2 text-xs font-medium text-foreground shadow-lg backdrop-blur">
        🌎 Atendimento remoto para todo o Brasil
      </div>

      {/* Atribuição discreta */}
      <div className="absolute bottom-1 left-2 z-[500] text-[9px] text-muted-foreground/70">
        © OpenStreetMap · CARTO
      </div>

      <style>{`
        @keyframes radar-pulse {
          0% { transform: translate(-50%, -50%) scale(0.2); opacity: 0.55; }
          100% { transform: translate(-50%, -50%) scale(1); opacity: 0; }
        }
        @keyframes radar-glow {
          0%, 100% { opacity: 0.85; }
          50% { opacity: 1; }
        }
        .radar-ring {
          position: absolute;
          left: 0; top: 0;
          width: 220px; height: 220px;
          border-radius: 9999px;
          border: 1px solid oklch(0.32 0.11 258 / 0.45);
          background: radial-gradient(circle, oklch(0.32 0.11 258 / 0.10) 0%, transparent 70%);
          animation: radar-pulse 4s cubic-bezier(0.2, 0.7, 0.3, 1) infinite;
          pointer-events: none;
        }
        .radar-ring-delayed { animation-delay: 2s; }
        .radar-glow {
          position: absolute;
          left: 0; top: 0;
          width: 14px; height: 14px;
          margin-left: -7px; margin-top: -7px;
          border-radius: 9999px;
          background: oklch(0.32 0.11 258);
          box-shadow: 0 0 0 4px oklch(0.32 0.11 258 / 0.2);
          animation: radar-glow 2.4s ease-in-out infinite;
        }
        .leaflet-container {
          font-family: inherit;
          background: color-mix(in oklab, var(--muted) 60%, transparent) !important;
        }
        .leaflet-control-zoom a {
          background: var(--background) !important;
          color: var(--foreground) !important;
          border-color: var(--border) !important;
        }
        .leaflet-tooltip {
          background: var(--background) !important;
          border: 1px solid var(--border) !important;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08) !important;
          color: var(--foreground) !important;
          padding: 6px 10px !important;
          border-radius: 8px !important;
          font-family: inherit !important;
        }
        .leaflet-tooltip-top:before { border-top-color: var(--border) !important; }
        /* Keep leaflet contained below the sticky navbar (z-50) */
        .leaflet-pane,
        .leaflet-top,
        .leaflet-bottom { z-index: 1 !important; }
        .leaflet-control { z-index: 2 !important; }
      `}</style>
    </div>
  );
}

export default CoverageMap;
