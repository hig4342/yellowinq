import * as topojson from 'topojson-client'
import worldAtlas from 'world-atlas/countries-110m.json'
import type { Topology } from 'topojson-specification'
import type { FeatureCollection, Geometry } from 'geojson'
import {dynamicImport} from 'tsimportlib';

export class GenerateService {
  d3?: typeof import('d3')

  async importModule() {
    this.d3 = await dynamicImport('d3', module) as typeof import('d3')
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

//   async findAll() {
//     return await messageDB.fetch()
//   }

//   async findID(id: string) {
//     return await messageDB.fetch({"sender": id})
//   }
}