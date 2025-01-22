import { defineConfig } from 'drizzle-kit';

export default defineConfig({
	schema: './src/lib/server/db/schema.ts',
	dbCredentials: {
		user: process.env.DATABASE_USER!,
		password: process.env.DATABASE_PASSWORD!,
		host: process.env.DATABASE_HOST!,
		port: Number(process.env.DATABASE_PORT!),
		database: process.env.DATABASE_DATABASE!,
	},
	entities: {
		roles: {
			provider: "supabase"
		}
	},
	verbose: true,
	strict: true,
	dialect: 'postgresql'
});
