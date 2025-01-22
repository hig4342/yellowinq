import { pgTable, serial, text, integer } from 'drizzle-orm/pg-core';

export const user = pgTable('users', {
	id: serial('id').primaryKey(),
	fullName: text('full_name'),
});
