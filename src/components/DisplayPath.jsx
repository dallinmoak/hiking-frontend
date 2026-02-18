import { useRef, useEffect } from "react";
import Graphic from "@arcgis/core/Graphic";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";

export default function DisplayPath({ pathData }) {
  const mapRef = useRef(null);
  const viewRef = useRef(null);
  const layerRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const graphicsLayer = new GraphicsLayer();
    layerRef.current = graphicsLayer;

    const map = new Map({
      basemap: "hybrid",
      layers: [graphicsLayer],
    });

    const view = new MapView({
      container: mapRef.current,
      map: map,
      ui: { components: [] },
    });

    viewRef.current = view;

    return () => {
      if (viewRef.current) {
        viewRef.current.destroy();
        viewRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const view = viewRef.current;
    const layer = layerRef.current;

    if (!view || !layer || !pathData || pathData.length === 0) return;

    layer.removeAll();

    const pathGraphic = new Graphic({
      geometry: {
        type: "polyline",
        paths: [pathData],
        spatialReference: { wkid: 4326 },
      },
      symbol: {
        type: "simple-line",
        color: [226, 119, 40],
        width: 4,
      },
    });

    layer.add(pathGraphic);

    view.when(() => {
      if (pathGraphic.geometry.extent) {
        view
          .goTo(pathGraphic.geometry.extent.expand(1.1), { animate: false })
          .catch((err) => {
            console.error(err);
          });
      }
    });
  }, [pathData]);

  return (
    <div
      ref={mapRef}
      style={{ width: "500px", height: "400px", position: "relative" }}
    />
  );
}
