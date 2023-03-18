import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
	await knex.raw(`
        DELETE FROM common.users WHERE email LIKE '%test%';

        INSERT INTO common.users (email, password, created_at, updated_at)
        VALUES ('test@gmail.com', '123', current_timestamp, current_timestamp);

        INSERT INTO common.users (email, password, created_at, updated_at)
        VALUES ('gamemlvirgin029@gmail.com', '123', current_timestamp, current_timestamp);

        INSERT INTO common.users (email, password, created_at, updated_at)
        VALUES ('jds.project.info@gmail.com', '123', current_timestamp, current_timestamp);     

    `);
}

export async function down(knex: Knex): Promise<void> {
	await knex.raw(`
        DELETE FROM common.users WHERE email LIKE '%gamemlvirgin029%';
        DELETE FROM common.users WHERE email LIKE '%jds.project.info%';
`);
}
