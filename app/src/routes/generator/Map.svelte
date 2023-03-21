<script lang="ts">
  //import 'mapbox-gl/dist/mapbox-gl.css'
  import mapboxgl from 'mapbox-gl'
	import { onMount } from 'svelte';
  
  let mapboxElement: HTMLDivElement
  export let map: mapboxgl.Map
  export let accessToken: string

  onMount(() => {
    map = new mapboxgl.Map({
      accessToken: accessToken,
      container: mapboxElement,
      style: 'mapbox://styles/yellowinq/clf0uz4db000g01o52w7mgob8', // style URL
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 9, // starting zoom
    })
  })
</script>

<div bind:this={mapboxElement}/>