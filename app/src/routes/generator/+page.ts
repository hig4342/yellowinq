import { GetCountriesStore, load_GetCountries } from "$houdini";

export const load = async (event) => {
  const store = new GetCountriesStore()

  const { data } = await store.fetch({event})
  return {
    countries: data?.getCountries ?? []
  }
}