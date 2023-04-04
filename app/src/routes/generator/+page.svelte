<script lang="ts">
  import { env } from '$env/dynamic/public';
	import { graphql } from '$houdini';
	import type { PageData } from './$houdini';
  import Map from './Map.svelte'

  export let data: PageData
  let selectedCountry: string = "South Korea"

  const mapboxAccessToken = env.PUBLIC_MAPBOX_ACCESS_TOKEN!
  
  let map: mapboxgl.Map

  const getRandomCoordinate = graphql(/* GraphQL */ `
    query GetRandomCoordinate($country: String!) {
      getRandomCoordinate(country: $country) {
        latitude
        longitude
      }
    }
  `)
    
  const handleClick = async () => {
    const { data } = await getRandomCoordinate.fetch({ variables: { country: selectedCountry }})
    const coord = data?.getRandomCoordinate!
    map.flyTo({
      center: [ coord.longitude, coord.latitude ]
    })
  }

  $: ({ countries } = data)
</script>

<div>
  <Map bind:map={map} accessToken={mapboxAccessToken} />
  <select bind:value={selectedCountry}>
    {#each countries as country}
      <option value={country}>
        {country}
      </option>
    {/each}
  </select>
  <button on:click={handleClick}>Test</button>
</div>