<script lang="ts">
  import { env } from '$env/dynamic/public';
	import { graphql } from '$houdini';
  import type mapboxgl from 'mapbox-gl'
  import Map from '../Map.svelte'
  import Marker from '../Marker.svelte';
  import { test } from '$lib/test';

  const mapboxAccessToken = env.PUBLIC_MAPBOX_ACCESS_TOKEN!
  let map: mapboxgl.Map
  let points: Array<{
    readonly latitude: number;
    readonly longitude: number;
  }> = []

  const generatePointsOnLine = graphql(/* GraphQL */ `
    query GeneratePointsOnLine($line: LineInput!) {
      generatePointsOnLine(line: $line) {
        latitude
        longitude
      }
    }
  `)

  const line = async () => {
    const { data } = await generatePointsOnLine.fetch({
      variables: {
        line: {
          start: {
            latitude: 36.45427940009067,
            longitude: 127.43918510647114,
          },
          end: {
            latitude: 36.452273006506445,
            longitude: 127.44115384788756,
          }
        }
      }
    })

    points = data?.generatePointsOnLine ?? []
  }

  const handleClick = (event: CustomEvent<mapboxgl.MapMouseEvent & mapboxgl.EventData>) => {
    console.log(event.detail)
  }
</script>

<section style="width: 100%; height: 100%">
  <div style="width: 100%; height: 80%">
    <Map bind:map={map} accessToken={mapboxAccessToken}>
      {#each test as coord}
        <Marker latitude={coord[0]} longitude={coord[1]}/>
      {/each}
      <!-- <Marker latitude={36.45427940009067} longitude={127.43918510647114} />
      <Marker latitude={36.452273006506445} longitude={127.44115384788756} />
      {#each points as point}
        <Marker latitude={point.latitude} longitude={point.longitude} />
      {/each} -->
    </Map>
  </div>
  <button class="btn" on:click={line}>test</button>
</section>