import { useEffect, useRef } from "react"
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import "./ProjectsMap.css"

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN

export default function ProjectsMap() {
  const mapRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    if (mapRef.current) return

    const isMobile = window.innerWidth <= 768

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: [151.215, -33.868],
      zoom: 12.1,
      pitch: 60,
      bearing: -17,
      antialias: true,
    })

    mapRef.current = map

    map.on("load", () => {
      map.resize()

      // Hide default symbol labels
      map.getStyle().layers.forEach(layer => {
        if (layer.type === "symbol") {
          map.setLayoutProperty(layer.id, "visibility", "none")
        }
      })

      // === Sydney label ===
      map.addSource("sydney-label", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [151.2093, -33.8688],
              },
              properties: { title: "Sydney" },
            },
          ],
        },
      })

      map.addLayer({
        id: "sydney-label-layer",
        type: "symbol",
        source: "sydney-label",
        layout: {
          "text-field": ["get", "title"],
          "text-font": ["Open Sans Regular", "Arial Unicode MS Regular"],
          "text-size": 14,
          "text-offset": [0, 0.6],
        },
        paint: {
          "text-color": "#222",
          "text-halo-color": "#fff",
          "text-halo-width": 2,
        },
      })

      // === Suburbs base ===
      map.addSource("suburbs-base", {
        type: "geojson",
        data: "/geo/suburbs.json",
        generateId: true,
      })

      map.addLayer({
        id: "suburbs-base-fill",
        type: "fill-extrusion",
        source: "suburbs-base",
        paint: {
          "fill-extrusion-color": [
            "case",
            ["boolean", ["feature-state", "hover"], false],
            "#FFA559", // Hover color
            "#D66F00"  // Base color
          ],
          "fill-extrusion-height": [
            "case",
            ["boolean", ["feature-state", "hover"], false],
            220,
            isMobile ? 220 : 0
          ],
          "fill-extrusion-opacity": 0.95,
          "fill-extrusion-transition": {
            duration: 300,
            delay: 0
          },
        },
      })

      // === Contorno ===
      map.addLayer({
        id: "suburbs-outline",
        type: "line",
        source: "suburbs-base",
        paint: {
          "line-color": "#ffffff",
          "line-width": 1.5,
        },
      })

      const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
        offset: 15,
        className: "map-tooltip",
      })

      let hoveredId = null

      // === DESKTOP: hover ===
      map.on("mousemove", "suburbs-base-fill", e => {
        if (isMobile) return
        if (!e.features?.length) return

        const feature = e.features[0]
        const id = feature.id
        const props = feature.properties

        if (hoveredId !== null) {
          map.setFeatureState(
            { source: "suburbs-base", id: hoveredId },
            { hover: false }
          )
        }

        hoveredId = id

        map.setFeatureState(
          { source: "suburbs-base", id },
          { hover: true }
        )

        map.getCanvas().style.cursor = "pointer"
        popup
          .setLngLat(e.lngLat)
          .setHTML(
            `<strong>${props.name}</strong><br/>Projects completed: ${props.projects ?? 0}`
          )
          .addTo(map)
      })

      map.on("mouseleave", "suburbs-base-fill", () => {
        if (isMobile) return

        if (hoveredId !== null) {
          map.setFeatureState(
            { source: "suburbs-base", id: hoveredId },
            { hover: false }
          )
        }

        hoveredId = null
        map.getCanvas().style.cursor = ""
        popup.remove()
      })

      // === MOBILE: tap ===
      map.on("click", "suburbs-base-fill", e => {
        if (!isMobile) return
        if (!e.features?.length) return

        const props = e.features[0].properties

        popup
          .setLngLat(e.lngLat)
          .setHTML(
            `<strong>${props.name}</strong><br/>Projects completed: ${props.projects ?? 0}`
          )
          .addTo(map)
      })
    })

    return () => {
      map.remove()
      mapRef.current = null
    }
  }, [])

  return (
    <section className="projects-map-section">
      <h2 className="projects-map-title">See where Inhaus Living is present</h2>
      <div ref={containerRef} className="projects-map-container" />
    </section>
  )
}






