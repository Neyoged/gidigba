import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { MapPoint } from "@/lib/stats";

// Browser-only: imported lazily from the community page.
export default function MovementMap({ points, focus }: { points: MapPoint[]; focus: MapPoint | null }) {
  const el = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const layer = useRef<L.LayerGroup | null>(null);

  useEffect(() => {
    if (!el.current || map.current) return;
    map.current = L.map(el.current, { center: [20, 10], zoom: 2, minZoom: 2, worldCopyJump: true, scrollWheelZoom: false });
    L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}", {
      attribution: 'Tiles &copy; Esri',
      
      maxZoom: 16,
    }).addTo(map.current);
    layer.current = L.layerGroup().addTo(map.current);
    map.current.on("click", () => map.current?.scrollWheelZoom.enable());
    return () => { map.current?.remove(); map.current = null; };
  }, []);

  useEffect(() => {
    if (!layer.current) return;
    layer.current.clearLayers();
    const max = Math.max(1, ...points.map((p) => p.n));
    points.forEach((p) => {
      const size = 14 + Math.round((p.n / max) * 26);
      const icon = L.divIcon({
        className: "",
        html: `<div class="map-pin" style="width:${size}px;height:${size}px"><span>${p.n}</span></div>`,
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2],
      });
      L.marker([p.lat, p.lng], { icon })
        .bindPopup(`<strong>${p.city}</strong><br/>${p.country}<br/>${p.n} member${p.n === 1 ? "" : "s"}`)
        .addTo(layer.current!);
    });
  }, [points]);

  useEffect(() => {
    if (focus && map.current) map.current.flyTo([focus.lat, focus.lng], 9, { duration: 1.2 });
  }, [focus]);

  return <div ref={el} className="h-full w-full" />;
}
