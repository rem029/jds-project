import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
	await knex.raw(`
        INSERT INTO common.issues(
            title, description, status, created_at, updated_at)
        VALUES ('Random Job 1', 'Lorem ipsum Lorem ipsum Lorem ipsum ', 'todo', current_timestamp, current_timestamp);

        INSERT INTO common.issues(
            title, description, status, created_at, updated_at)
        VALUES ('Random Job 2', 'Lorem ipsum Lorem ipsum Lorem ipsum ', 'todo', current_timestamp, current_timestamp);

        INSERT INTO common.issues(
            title, description, status, created_at, updated_at)
        VALUES ('Random Job 3', 'Lorem ipsum Lorem ipsum Lorem ipsum ', 'todo', current_timestamp, current_timestamp);

        INSERT INTO common.issues(
            title, description, status, created_at, updated_at)
        VALUES ('Random Job 4', 'Lorem ipsum Lorem ipsum Lorem ipsum ', 'todo', current_timestamp, current_timestamp);

        INSERT INTO common.issues(
            title, description, status, created_at, updated_at)
        VALUES ('Random Job 5', 'Lorem ipsum Lorem ipsum Lorem ipsum ', 'todo', current_timestamp, current_timestamp);
    `);
}

export async function down(knex: Knex): Promise<void> {
	await knex.raw(`
        DELETE FROM common.issues
        WHERE title LIKE '%Random Job%'
    `);
}
