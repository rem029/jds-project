import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
	await knex.raw(`
                ALTER TABLE common.jobs
                ADD status VARCHAR(255) NOT NULL DEFAULT 'todo';
        `);

	await knex.raw(`
                ALTER TABLE common.jobs RENAME TO issues;
        `);
}

export async function down(knex: Knex): Promise<void> {
	await knex.raw(`
                ALTER TABLE common.issues
                DROP COLUMN status;
        `);

	await knex.raw(`
         ALTER TABLE common.issues RENAME TO jobs;
        `);
}
