<script lang="ts">
	import mapboxgl from "mapbox-gl";
	import { onDestroy, getContext } from "svelte";
	import { key } from "./mapbox";

  const { getMap } = getContext<{getMap: () => mapboxgl.Map}>(key)
  const map = getMap()
  export let latitude: number
  export let longitude: number
  let marker = new mapboxgl.Marker({ scale: 0.2, color: '#ff69b4' })
    .setLngLat({
      lat: latitude,
      lon: longitude
    }).addTo(map)

  onDestroy(() => {
    if (marker) marker.remove()
  })
</script>