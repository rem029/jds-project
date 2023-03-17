import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
	await knex.raw(`
        CREATE SCHEMA IF NOT EXISTS common;

        CREATE TABLE  IF NOT EXISTS common.users (
        id SERIAL NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        PRIMARY KEY (id));

        INSERT INTO common.users (email, password)
        VALUES ('test4@email.com', '123');

        INSERT INTO common.users (email, password)
        VALUES ('test5@email', '123');

        INSERT INTO common.users (email, password)
        VALUES ('test6@email', '123');

        CREATE TABLE  IF NOT EXISTS common.jobs (
        id SERIAL NOT NULL,
        title VARCHAR(255) NOT NULL,
        description VARCHAR(255) NOT NULL,
        assigned_user_id INT DEFAULT NULL,
        PRIMARY KEY (id),
        CONSTRAINT assigned_user_id_fkey
        FOREIGN KEY (assigned_user_id)  
        REFERENCES common.users(id)  
        ON DELETE CASCADE
        );

        INSERT INTO common.jobs (title, description)
        VALUES ('job5', 'test job1 description');

        INSERT INTO common.jobs (title, description)
        VALUES ('job6', 'test job1 description');

        INSERT INTO common.jobs (title, description,assigned_user_id)
        VALUES ('job7', 'test job2 description',1);

        INSERT INTO common.jobs (title, description,assigned_user_id)
        VALUES ('job8', 'test job2 description',2);

        SELECT * FROM common.users;
        SELECT * FROM common.jobs;
`);
}

export async function down(knex: Knex): Promise<void> {
	await knex.raw(`
        DROP TABLE  IF EXISTS common.users CASCADE;
        DROP TABLE  IF EXISTS common.jobs CASCADE;
        DROP SCHEMA IF EXISTS common CASCADE;
    `);
}
