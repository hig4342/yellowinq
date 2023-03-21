/// <references types="houdini-svelte">

/** @type {import('houdini').ConfigFile} */
const config = {
  watchSchema: {
    "url": "http://localhost:3000/graphql"
  },
  plugins: {
    "houdini-svelte": {}
  },
  defaultCachePolicy: 'CacheAndNetwork',
  scalars: {
    DateTime: {
      type: 'Date',
      unmarshal: (val) => new Date(val),
      marshal: (date) => date.getTime(),
    }
  }
}

export default config
