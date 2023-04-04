<script lang="ts">
  import 'mapbox-gl/dist/mapbox-gl.css'
  import mapboxgl from 'mapbox-gl'
	import { createEventDispatcher, onMount } from 'svelte';
	import { onDestroy, setContext } from 'svelte';
  import { key } from './mapbox';

  type MapEventType = mapboxgl.MapLayerEventType & mapboxgl.MapEventType
  const dispatch = createEventDispatcher<MapEventType>()
  let container: HTMLDivElement
  export let accessToken: string
  export let map: mapboxgl.Map

  const returnEventTypeString = (eventType: keyof MapEventType) => eventType

  setContext(key, {
    getMap: () => map
  })
  
  onMount(() => {
    map = new mapboxgl.Map({
      accessToken: accessToken,
      container,
      style: 'mapbox://styles/yellowinq/clf0uz4db000g01o52w7mgob8', // style URL
      center: [127.412625, 36.411937], // starting position [lng, lat]
      zoom: 17, // starting zoom
    })
  })

  onDestroy(() => {
    if (map) map.remove()
  })
</script>

<div style="width: 100%; height: 100%" bind:this={container}>
  {#if map}
    <slot />
  {/if}
</div>