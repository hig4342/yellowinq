import type { CodegenConfig } from '@graphql-codegen/cli';
 
const config: CodegenConfig = {
  schema: 'schema.graphql',
  generates: {
    'src/graphql/resolvers-types.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
      config: {
        scalars: {
          DateTime: 'Date'
        }
      }
    },
  }
};
export default config;