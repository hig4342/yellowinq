import * as topojson from 'topojson-client'
import worldAtlas from 'world-atlas/countries-110m.json'
import type { Topology } from 'topojson-specification'
import type { FeatureCollection, Geometry } from 'geojson'
import {dynamicImport} from 'tsimportlib';

interface Coordinate {
  longitude: number
  latitude: number
}

export class GenerateService {
  d3?: typeof import('d3')

  async importModule() {
    this.d3 = await dynamicImport('d3', module) as typeof import('d3')
  }

  getPointsOnLine = async (coord1: Coordinate, coord2: Coordinate, stepSize: number) => {
    const points: Array<Coordinate> = []
    const coord1Rad = this.coordToRadian(coord1)
    const coord2Rad = this.coordToRadian(coord2)
    const dLat = coord2Rad.latitude - coord1Rad.latitude
    const dLon = coord2Rad.longitude - coord1Rad.longitude

    const a = Math.sin(dLat / 2) ** 2 + Math.cos(coord1Rad.latitude) * Math.cos(coord2Rad.latitude) * Math.sin(dLon / 2) ** 2
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const distance = 6371 * c * 1000 // 6371 km is the earth's radius, and we want the distance in meters

    const directionLat = dLat / distance
    const directionLon = dLon / distance
    const numSteps = Math.floor(distance / stepSize)

    for (let i = 0; i < numSteps; i++) {
      const latitude = (coord1Rad.latitude + i * stepSize * directionLat) * 180 / Math.PI;
      const longitude = (coord1Rad.longitude + i * stepSize * directionLon) * 180 / Math.PI;
      points.push({
        latitude,
        longitude
      });
    }

    if (numSteps * stepSize < distance) points.push(coord2)

    return points
  }

  private coordToRadian = (coord: Coordinate) => {
    return {
      latitude: coord.latitude * Math.PI / 180,
      longitude: coord.longitude * Math.PI / 180,
    }
  }

  static getCountries = () => {
    const world = JSON.parse(JSON.stringify(worldAtlas)) as Topology
    const countries = topojson.feature(world, world.objects.countries) as FeatureCollection<Geometry, { name: string }>
    const featureCountry = countries.features.map((f) => f.properties.name).sort()

    return featureCountry
  }

  generateCoordinate = async (country: string) => {
    await this.importModule()
    if(!this.d3) throw Error('Not import d3 module')

    const world = JSON.parse(JSON.stringify(worldAtlas)) as Topology
    const countries = topojson.feature(world, world.objects.countries) as FeatureCollection<Geometry, { name: string }>
    const featureCountry = countries.features.filter(f => f.properties.name === country)[0]
    const featureBoundingBox = this.d3.geoBounds(featureCountry)
    const randomCountryCoordinates = {
      longitude: this.d3.randomUniform(
          featureBoundingBox[0][0],
          featureBoundingBox[1][0] + 360 * Number(featureBoundingBox[1][0] < featureBoundingBox[0][0])
        )(),
      latitude: this.d3.randomUniform(
          featureBoundingBox[0][1],
          featureBoundingBox[1][1]
        )()
    }

    return randomCountryCoordinates
  }
}