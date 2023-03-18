import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
	await knex.raw(`
        ALTER TABLE common.issues
        ADD COLUMN created_at timestamptz not null default current_timestamp,
        ADD COLUMN updated_at timestamp not null default current_timestamp;
    `);

	await knex.raw(`
        ALTER TABLE common.users
        ADD COLUMN created_at timestamptz not null default current_timestamp,
        ADD COLUMN updated_at timestamptz not null default current_timestamp;
`);
}

export async function down(knex: Knex): Promise<void> {
	await knex.raw(`
        ALTER TABLE common.issues
        DROP COLUMN created_at,
        DROP COLUMN updated_at;

    `);

	await knex.raw(`
        ALTER TABLE common.users
        DROP COLUMN created_at,
        DROP COLUMN updated_at;
    `);
}
